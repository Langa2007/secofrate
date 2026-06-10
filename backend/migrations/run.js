import { query } from '../config/database.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigrations() {
  console.log('[SECOFRATE] Initializing database schema...');
  
  const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
  
  try {
    await query(schema);
    console.log('[SECOFRATE] Database schema migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('[SECOFRATE] Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();