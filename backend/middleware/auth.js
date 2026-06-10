import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied. No token provided.',
      code: 'AUTH_001'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await query(
      'SELECT id, username, rank, security_level, is_active FROM users WHERE id = $1 AND is_active = true',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        error: 'User not found or inactive',
        code: 'AUTH_002'
      });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired. Please login again.',
        code: 'AUTH_003'
      });
    }
    return res.status(403).json({ 
      error: 'Invalid token',
      code: 'AUTH_004'
    });
  }
};

export const requireSecurityLevel = (minLevel) => {
  return (req, res, next) => {
    if (!req.user || req.user.security_level < minLevel) {
      return res.status(403).json({
        error: 'Insufficient security clearance for this operation',
        code: 'AUTH_005',
        required_level: minLevel,
        current_level: req.user?.security_level || 0
      });
    }
    next();
  };
};

export const auditLog = async (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    if (req.user && req.method !== 'GET') {
      const logData = {
        user_id: req.user.id,
        action: `${req.method} ${req.route?.path || req.path}`,
        entity_type: req.baseUrl.split('/').pop(),
        ip_address: req.ip,
        user_agent: req.headers['user-agent']
      };
      
      query(
        'INSERT INTO audit_logs (user_id, action, entity_type, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
        [logData.user_id, logData.action, logData.entity_type, logData.ip_address, logData.user_agent]
      ).catch(err => console.error('Audit log failed:', err.message));
    }
    originalSend.call(this, data);
  };
  
  next();
};