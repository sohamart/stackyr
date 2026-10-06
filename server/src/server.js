import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import brandRoutes from './routes/brandRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


import { ensureDefaultAdmin } from './controllers/authController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (or local persistent fallback) and sync admin credentials
connectDB().then(() => {
  ensureDefaultAdmin();
});

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(morgan('dev'));

// Static uploads folder
const uploadDir = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadDir));

// Also serve client public assets if needed
const clientPublicDir = path.resolve(__dirname, '../../client/public');
app.use(express.static(clientPublicDir));

// API Routes
app.use('/api/brands', brandRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Stackyr Stacking Intelligence Core',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Stackyr Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ⚡ STACKYR CORE BACKEND RUNNING ON http://localhost:${PORT}`);
  console.log(`  ⚡ STACKING INTELLIGENCE VENTURE ECOSYSTEM API READY`);
  console.log(`======================================================\n`);
});

export default app;
