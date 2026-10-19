import express from 'express';
import { query } from '../config/database.js';
import { validateContact } from '../middleware/validation.js';
import { authenticateToken, requireSecurityLevel, auditLog } from '../middleware/auth.js';
import crypto from 'crypto';
import { Resend } from 'resend';

const router = express.Router();

const generateReferenceNumber = () => {
  const prefix = 'REF';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/submit', validateContact, async (req, res) => {
  try {
    const referenceNumber = generateReferenceNumber();
    
    const result = await query(
      `INSERT INTO contact_submissions (reference_number, full_name, email, phone, subject, message, is_urgent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING reference_number, created_at`,
      [referenceNumber, req.body.full_name, req.body.email, req.body.phone, req.body.subject, req.body.message, req.body.is_urgent || false]
    );

    await resend.emails.send({
      from: `Secofrate Investigations <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: `Secofrate - We received your inquiry (Ref: ${referenceNumber})`,
      html: `
        <div style="font-family: 'Courier New', monospace; border-left: 4px solid #8B0000; padding: 20px; background: #f5f5f5;">
          <h2 style="color: #2C2C2C;">Secofrate Investigations Bureau</h2>
          <p style="font-style: italic;">Sheria Kwa Wote - Justice for All</p>
          <hr>
          <p>Dear ${req.body.full_name},</p>
          <p>Your inquiry has been received and registered under reference number: <strong>${referenceNumber}</strong></p>
          <p>Our team will review your matter and respond within 24-48 business hours.</p>
          <p>For urgent matters, please call our emergency line: +254 XXX XXX XXX</p>
          <hr>
          <p style="font-size: 12px; color: #666;">This is an automated confirmation. Please do not reply directly to this email.</p>
        </div>
      `
    });

    router.get('/submissions', authenticateToken, requireSecurityLevel(1), auditLog, async (req, res) => {
      try {
        const result = await query(
          `SELECT id, reference_number, full_name, email, phone, subject, message,
                  is_urgent, status, created_at, responded_at
           FROM contact_submissions
           ORDER BY is_urgent DESC, created_at DESC
           LIMIT 200`
        );

        res.json({ total: result.rows.length, submissions: result.rows });
      } catch (error) {
        console.error('Contact submissions fetch error:', error);
        res.status(500).json({ error: 'Failed to retrieve contact submissions', code: 'CNT_004' });
      }
    });

    router.patch('/submissions/:id/status', authenticateToken, requireSecurityLevel(2), auditLog, async (req, res) => {
      const validStatuses = ['Pending', 'In Progress', 'Resolved', 'Closed'];
      const { status } = req.body;

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid submission status', code: 'CNT_005' });
      }

      try {
        const result = await query(
          `UPDATE contact_submissions
           SET status = $1, responded_at = CASE WHEN $1 IN ('Resolved', 'Closed') THEN CURRENT_TIMESTAMP ELSE responded_at END
           WHERE id = $2
           RETURNING id, status, responded_at`,
          [status, req.params.id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Contact submission not found', code: 'CNT_006' });
        }

        res.json({ message: 'Contact submission status updated', submission: result.rows[0] });
      } catch (error) {
        console.error('Contact submission status error:', error);
        res.status(500).json({ error: 'Failed to update contact submission', code: 'CNT_007' });
      }
    });

    res.status(201).json({
      message: 'Your inquiry has been submitted successfully',
      reference_number: referenceNumber,
      submitted_at: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry', code: 'CNT_001' });
  }
});

router.get('/status/:referenceNumber', async (req, res) => {
  try {
    const result = await query(
      'SELECT reference_number, full_name, subject, status, created_at, responded_at FROM contact_submissions WHERE reference_number = $1',
      [req.params.referenceNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reference number not found', code: 'CNT_002' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check status', code: 'CNT_003' });
  }
});

export default router;