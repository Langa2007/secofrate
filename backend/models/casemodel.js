import { query } from '../config/database.js';

export const CaseModel = {
  create: async (caseData) => {
    const { case_number, title, description, case_type, priority, client_id, assigned_agent, supervisor_id, budget_amount, is_confidential } = caseData;
    const result = await query(
      `INSERT INTO cases (case_number, title, description, case_type, priority, client_id, assigned_agent, supervisor_id, budget_amount, is_confidential)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [case_number, title, description, case_type, priority, client_id, assigned_agent, supervisor_id, budget_amount, is_confidential]
    );
    return result.rows[0];
  },

  findAll: async (filters = {}) => {
    let queryText = `
      SELECT c.*, 
             cl.full_name as client_name, 
             u.full_name as agent_name
      FROM cases c
      LEFT JOIN clients cl ON c.client_id = cl.id
      LEFT JOIN users u ON c.assigned_agent = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filters.status) {
      queryText += ` AND c.status = $${paramIndex++}`;
      params.push(filters.status);
    }
    if (filters.priority) {
      queryText += ` AND c.priority = $${paramIndex++}`;
      params.push(filters.priority);
    }
    if (filters.assigned_agent) {
      queryText += ` AND c.assigned_agent = $${paramIndex++}`;
      params.push(filters.assigned_agent);
    }

    queryText += ` ORDER BY c.created_at DESC`;
    
    const result = await query(queryText, params);
    return result.rows;
  },

  findByNumber: async (caseNumber) => {
    const result = await query(
      `SELECT c.*, cl.full_name as client_name, cl.phone_number, u.full_name as agent_name
       FROM cases c
       LEFT JOIN clients cl ON c.client_id = cl.id
       LEFT JOIN users u ON c.assigned_agent = u.id
       WHERE c.case_number = $1`,
      [caseNumber]
    );
    return result.rows[0];
  },

  updateStatus: async (id, status, userId) => {
    const result = await query(
      `UPDATE cases SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  },

  getCaseEvidence: async (caseId) => {
    const result = await query(
      `SELECT * FROM evidence WHERE case_id = $1 ORDER BY collected_date DESC`,
      [caseId]
    );
    return result.rows;
  }
};