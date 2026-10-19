import dotenv from 'dotenv'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const backendDirectory = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(backendDirectory, '.env') })

const { Pool } = pg

function getLocalDatabaseConfig() {
  const rawUrl = process.env.DATABASE_URL_LOCAL
  if (!rawUrl) throw new Error('DATABASE_URL_LOCAL is missing from backend/.env')

  let url
  try {
    url = new URL(rawUrl.replace(/^jdbc:/i, ''))
  } catch {
    throw new Error('DATABASE_URL_LOCAL is not a valid PostgreSQL URL')
  }

  const username = process.env.DATABASE_USER || decodeURIComponent(url.username)
  const password = process.env.DATABASE_LOCAL_PASSWORD || decodeURIComponent(url.password)
  if (!username || !password) {
    throw new Error('Local database credentials are missing from backend/.env')
  }

  return {
    host: url.hostname,
    port: Number(url.port || 5432),
    database: decodeURIComponent(url.pathname.replace(/^\//, '')),
    user: username,
    password,
    ...(url.searchParams.get('sslmode') === 'require'
      ? { ssl: { rejectUnauthorized: false } }
      : {}),
  }
}

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env')
  }

  const username = (process.env.ADMIN_USERNAME?.trim() || email.split('@')[0])
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, '_')
    .slice(0, 50)

  if (!username || !email.includes('@')) {
    throw new Error('ADMIN_EMAIL must be a valid email address and produce a username')
  }

  const pool = new Pool(getLocalDatabaseConfig())

  try {
    const passwordHash = await bcrypt.hash(password, 12)
    await pool.query(
      `INSERT INTO users
         (username, email, password_hash, full_name, rank, security_level, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, true)
       ON CONFLICT (email) DO UPDATE SET
         username = EXCLUDED.username,
         password_hash = EXCLUDED.password_hash,
         full_name = EXCLUDED.full_name,
         rank = EXCLUDED.rank,
         security_level = EXCLUDED.security_level,
         is_active = true,
         login_attempts = 0,
         locked_until = NULL,
         updated_at = CURRENT_TIMESTAMP`,
      [username, email, passwordHash, 'Director of Operations', 'Director', 5],
    )

    console.log('[SECOFRATE] Admin account created or updated in the local database.')
  } finally {
    await pool.end()
  }
}

createAdmin().catch((error) => {
  console.error(`[SECOFRATE] Admin seed failed: ${error.message}`)
  process.exitCode = 1
})
