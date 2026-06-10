import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from '../config/index.js';
import { logger } from './utils/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { verifyWebhook, receiveWebhook } from './webhook/webhookHandler.js';
import onboardingApi from './routes/onboardingApi.js';

// ============================================================
// CATCH ALL UNHANDLED ERRORS
// ============================================================

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message, err.stack);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(helmet());
app.use(cors());

// *** THE FIX ***
// Use express.json's built-in verify callback to capture raw body.
// A separate middleware consumed the stream BEFORE json() could read it,
// causing "stream is not readable". This approach reads it once only.
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString('utf8');
  },
}));

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

// Debug — env check
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

app.get('/api/status', (req, res) => {
  res.json({ status: 'running', agent: config.agent.name });
});

app.use('/api/onboarding', onboardingApi);

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

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

export default app;
