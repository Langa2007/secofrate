import { query } from '../config/database.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  console.log('[SECOFRATE] Seeding initial data...');

  try {
    const adminPlain = process.env.ADMIN_PASSWORD;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminPlain || !adminUsername || !adminEmail) {
      console.error('[SECOFRATE] Missing ADMIN_USERNAME, ADMIN_EMAIL or ADMIN_PASSWORD in environment');
      process.exit(1);
    }

    const adminPassword = await bcrypt.hash(adminPlain, 12);

    await query(`
      INSERT INTO users (username, email, password_hash, full_name, badge_number, rank, security_level, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (username) DO NOTHING
    `, [adminUsername, adminEmail, adminPassword, 'Director of Operations', 'SIC-001', 'Director', 5, true]);

    console.log('[SECOFRATE] Admin user created successfully');
    console.log('[SECOFRATE] Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('[SECOFRATE] Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();