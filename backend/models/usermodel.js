import { query } from '../config/database.js';

export const UserModel = {
  create: async (userData) => {
    const { username, email, password_hash, full_name, badge_number, rank, security_level } = userData;
    const result = await query(
      `INSERT INTO users (username, email, password_hash, full_name, badge_number, rank, security_level)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, username, email, full_name, badge_number, rank, security_level, created_at`,
      [username, email, password_hash, full_name, badge_number, rank, security_level || 1]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await query(
      'SELECT id, username, email, full_name, badge_number, rank, security_level, is_active, last_login FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  updateLoginAttempts: async (id, attempts, lockUntil) => {
    await query(
      'UPDATE users SET login_attempts = $1, locked_until = $2 WHERE id = $3',
      [attempts, lockUntil, id]
    );
  },

  resetLoginAttempts: async (id) => {
    await query('UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = $1', [id]);
  },

  updateLastLogin: async (id) => {
    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }
};