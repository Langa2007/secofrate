// routes/client.routes.js
import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, requireSecurityLevel, auditLog } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

router.use(authenticateToken);
router.use(auditLog);

const generateClientCode = () => {
  const prefix = 'CLT';
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${random}`;
};

router.get('/', requireSecurityLevel(1), async (req, res) => {
  try {
    let queryText = `
      SELECT id, client_code, full_name, national_id, phone_number, email, occupation, is_corporate, corporate_name, created_at
      FROM clients
    `;
    const params = [];

    if (req.query.search) {
      queryText += ` WHERE full_name ILIKE $1 OR client_code ILIKE $1 OR national_id ILIKE $1`;
      params.push(`%${req.query.search}%`);
    }

    queryText += ` ORDER BY created_at DESC LIMIT 100`;
    
    const result = await query(queryText, params);
    res.json({ 
      total: result.rows.length,
      clients: result.rows 
    });
  } catch (error) {
    console.error('Client fetch error:', error);
    res.status(500).json({ error: 'Failed to retrieve clients', code: 'CLT_001' });
  }
});

router.post('/', requireSecurityLevel(2), async (req, res) => {
  try {
    const clientCode = generateClientCode();
    
    const result = await query(
      `INSERT INTO clients (client_code, full_name, national_id, phone_number, email, address, occupation, is_corporate, corporate_name, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, client_code, full_name, created_at`,
      [
        clientCode, 
        req.body.full_name, 
        req.body.national_id, 
        req.body.phone_number, 
        req.body.email, 
        req.body.address, 
        req.body.occupation,
        req.body.is_corporate || false,
        req.body.corporate_name,
        req.user.id
      ]
    );

    res.status(201).json({
      message: 'Client registered successfully',
      client: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Client with this National ID already exists', code: 'CLT_002' });
    }
    console.error('Client creation error:', error);
    res.status(500).json({ error: 'Failed to register client', code: 'CLT_003' });
  }
});

router.get('/:clientId/cases', async (req, res) => {
  try {
    const result = await query(
      `SELECT case_number, title, case_type, status, priority, opened_date, assigned_agent
       FROM cases 
       WHERE client_id = $1 
       ORDER BY opened_date DESC`,
      [req.params.clientId]
    );
    res.json({ cases: result.rows });
  } catch (error) {
    console.error('Client cases error:', error);
    res.status(500).json({ error: 'Failed to retrieve client cases', code: 'CLT_004' });
  }
});

export default router;