import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import './config/database.js';

import authRoutes from './routes/authroutes.js';
import caseRoutes from './routes/caseroutes.js';
import clientRoutes from './routes/clientroutes.js';
import contactRoutes from './routes/contactroutes.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Set it in the Render environment variables.');
}

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

const normalizeOrigin = (value) => {
  try {
    return new URL(value.trim()).origin;
  } catch {
    return value.trim().replace(/\/$/, '');
  }
};

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5500',
  ...(process.env.FRONTEND_URL || '').split(','),
  ...(process.env.ADMIN_URL || '').split(','),
].map(normalizeOrigin).filter(Boolean));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true,
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Rate limit exceeded. Please try again later.',
});
app.use(globalLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'operational',
    service: 'Secofrate Investigations Bureau',
    motto: 'Sheria Kwa Wote - Justice for All',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', code: 'SYS_404' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error', code: 'SYS_500' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`

  S E C O F R A T E   I N V E S T I G A T I O N S   B U R E A U

  [SYSTEM] Case Management System Online
  [PORT] ${PORT}
  [MODE] Production
  [MOTTO] Sheria Kwa Wote - Justice for All
  [SECURITY] Maximum Level Engaged
    [LOGGING] All activities are being monitored and recorded
  `);
});
