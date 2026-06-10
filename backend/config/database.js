import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('[SECOFRATE] Database connection pool established');
});

pool.on('error', (err) => {
  console.error('[SECOFRATE] Unexpected database error:', err.message);
});

export const query = (text, params) => pool.query(text, params);
export default pool;