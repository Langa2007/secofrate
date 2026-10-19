import pg from 'pg';
import dotenv from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../.env') });

const { Pool } = pg;

function getPoolConfig() {
  const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URL_PROD;

  if (connectionString) {
    let url;
    try {
      url = new URL(connectionString.replace(/^jdbc:/i, ''));
    } catch {
      throw new Error('DATABASE_URL or DATABASE_URL_PROD must be a valid PostgreSQL URL');
    }

    const config = {
      host: url.hostname,
      port: Number(url.port || 5432),
      database: decodeURIComponent(url.pathname.replace(/^\//, '')),
      user: decodeURIComponent(url.username) || process.env.DB_USER,
      password: decodeURIComponent(url.password) || process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };

    if (url.searchParams.get('sslmode') === 'require') {
      config.ssl = { rejectUnauthorized: false };
    }

    if (!config.host || !config.database || !config.user || !config.password) {
      throw new Error('Database URL must include host, database, user and password');
    }

    return config;
  }

  const port = Number(process.env.DB_PORT || 5432);
  const config = {
    host: process.env.DB_HOST,
    port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  };

  if (!config.host || !config.user || !config.password || !config.database) {
    throw new Error('Set DATABASE_URL/DATABASE_URL_PROD or all of DB_HOST, DB_USER, DB_PASSWORD and DB_NAME');
  }

  return config;
}

const pool = new Pool({
  ...getPoolConfig(),
});

pool.on('connect', () => {
  console.log('[SECOFRATE] Database connection pool established');
});

pool.on('error', (err) => {
  console.error('[SECOFRATE] Unexpected database error:', err.message);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
