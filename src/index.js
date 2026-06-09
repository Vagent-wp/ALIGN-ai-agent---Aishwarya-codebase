import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from '../config/index.js';
import { logger } from './utils/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { verifyWebhook, receiveWebhook } from './webhook/webhookHandler.js';

// ============================================================
// CATCH ALL UNHANDLED ERRORS — prevents silent crashes
// ============================================================

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
  // Don't exit — keep server alive and log the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION at:', promise);
  console.error('Reason:', reason);
  // Don't exit — keep server alive
});

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(helmet());
app.use(cors());

// Capture raw body for Meta signature verification BEFORE json parser
app.use((req, res, next) => {
  let data = Buffer.alloc(0);
  req.on('data', chunk => { data = Buffer.concat([data, chunk]); });
  req.on('end', () => {
    req.rawBody = data.toString('utf8');
    next();
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.server.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: msg => logger.info(msg.trim()) },
  }));
}

app.use('/api', apiLimiter);

// ============================================================
// ROUTES
// ============================================================

// Health check — Railway uses this
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    agent: config.agent.name,
    app: config.agent.appName,
    timestamp: new Date().toISOString(),
  });
});

// WhatsApp webhook
app.get('/webhook/whatsapp', verifyWebhook);
app.post('/webhook/whatsapp', receiveWebhook);

// Debug route — shows which env vars are loaded (values masked)
app.get('/debug/env', (req, res) => {
  res.json({
    SUPABASE_URL: process.env.SUPABASE_URL ? '✓ set' : '✗ MISSING',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? '✓ set' : '✗ MISSING',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? '✓ set' : '✗ MISSING',
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN ? '✓ set' : '✗ MISSING',
    WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID ? '✓ set' : '✗ MISSING',
    WHATSAPP_BUSINESS_ACCOUNT_ID: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID ? '✓ set' : '✗ MISSING',
    WHATSAPP_VERIFY_TOKEN: process.env.WHATSAPP_VERIFY_TOKEN ? '✓ set' : '✗ MISSING',
    WHATSAPP_APP_SECRET: process.env.WHATSAPP_APP_SECRET ? '✓ set' : '✗ MISSING',
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ? `✓ set (${process.env.ENCRYPTION_KEY.length} chars)` : '✗ MISSING',
    NODE_ENV: process.env.NODE_ENV || 'not set',
    PORT: process.env.PORT || 'not set',
  });
});

// Internal API status
app.get('/api/status', (req, res) => {
  res.json({ status: 'running', agent: config.agent.name });
});

// ============================================================
// 404 & ERROR HANDLERS
// ============================================================

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================
// START
// ============================================================

const server = app.listen(config.server.port, () => {
  logger.info(`${config.agent.name} is live`, {
    port: config.server.port,
    env: config.server.nodeEnv,
    app: config.agent.appName,
  });
});

// Keep alive — prevent Railway from timing out idle connections
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

export default app;
