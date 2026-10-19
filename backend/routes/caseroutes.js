import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, requireSecurityLevel, auditLog } from '../middleware/auth.js';
import { validateCase } from '../middleware/validation.js';
import { CaseModel } from '../models/casemodel.js';
import crypto from 'crypto';

const router = express.Router();

router.use(authenticateToken);
router.use(auditLog);

const generateCaseNumber = () => {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `SIC-${year}-${random}`;
};

router.get('/', async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      assigned_agent: req.query.agent_id
    };
    const cases = await CaseModel.findAll(filters);
    res.json({ 
      total: cases.length,
      cases,
      access_level: req.user.security_level
    });
  } catch (error) {
    console.error('Case fetch error:', error);
    res.status(500).json({ error: 'Failed to retrieve cases', code: 'CSE_001' });
  }
});

router.get('/:caseNumber', async (req, res) => {
  try {
    const caseData = await CaseModel.findByNumber(req.params.caseNumber);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found', code: 'CSE_002' });
    }

    if (caseData.is_confidential && req.user.security_level < 3) {
      const sanitized = { ...caseData };
      delete sanitized.evidence_location;
      delete sanitized.budget_amount;
      return res.json({ ...sanitized, restricted: true });
    }

    const evidence = await CaseModel.getCaseEvidence(caseData.id);
    res.json({ ...caseData, evidence });
  } catch (error) {
    console.error('Case detail error:', error);
    res.status(500).json({ error: 'Failed to retrieve case details', code: 'CSE_003' });
  }
});

router.post('/', requireSecurityLevel(2), validateCase, async (req, res) => {
  try {
    const caseNumber = generateCaseNumber();
    
    const newCase = await CaseModel.create({
      case_number: caseNumber,
      title: req.body.title,
      description: req.body.description,
      case_type: req.body.case_type,
      priority: req.body.priority,
      client_id: req.body.client_id,
      assigned_agent: req.body.assigned_agent || req.user.id,
      supervisor_id: req.user.id,
      budget_amount: req.body.budget_amount,
      is_confidential: req.body.is_confidential
    });

    await query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, new_data, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [req.user.id, 'CASE_CREATED', 'cases', newCase.id, JSON.stringify(newCase), req.ip]
    );

    res.status(201).json({ 
      message: 'Case successfully registered',
      case_number: caseNumber,
      case: newCase
    });
  } catch (error) {
    console.error('Case creation error:', error);
    res.status(500).json({ error: 'Failed to create case', code: 'CSE_004' });
  }
});

router.patch('/:id/status', requireSecurityLevel(2), async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Open', 'In Progress', 'Pending Review', 'Closed', 'Archived'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value', code: 'CSE_005' });
  }

  try {
    const updatedCase = await CaseModel.updateStatus(req.params.id, status, req.user.id);
    
    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found', code: 'CSE_006' });
    }

    res.json({ message: 'Case status updated', case: updatedCase });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Failed to update status', code: 'CSE_007' });
  }
});

export default router;
