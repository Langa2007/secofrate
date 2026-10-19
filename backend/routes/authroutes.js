import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';
import { UserModel } from '../models/usermodel.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required', code: 'AUTH_010' });
  }

  try {
    const result = await query('SELECT * FROM users WHERE username = $1 OR email = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials', code: 'AUTH_011' });
    }

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(423).json({ 
        error: 'Account locked. Too many failed attempts.',
        unlock_time: user.locked_until,
        code: 'AUTH_012'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      const newAttempts = (user.login_attempts || 0) + 1;
      const lockUntil = newAttempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null;
      await UserModel.updateLoginAttempts(user.id, newAttempts, lockUntil);
      return res.status(401).json({ 
        error: 'Invalid credentials',
        attempts_remaining: 5 - newAttempts,
        code: 'AUTH_013'
      });
    }

    await UserModel.resetLoginAttempts(user.id);
    await UserModel.updateLastLogin(user.id);

    const token = jwt.sign(
      { userId: user.id, username: user.username, security_level: user.security_level },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        badge_number: user.badge_number,
        rank: user.rank,
        security_level: user.security_level
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication service error', code: 'AUTH_099' });
  }
});

router.post('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    
    if (!user || !user.is_active) {
      return res.status(401).json({ valid: false });
    }
    
    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

export default router;
