# StartupHub AI — Aishwarya Agent

> WhatsApp-first AI matchmaking agent for the startup ecosystem.
> Built on Node.js, Supabase, Gemini 2.5 Flash, and Meta WhatsApp Business API.

---

## Project Structure

```
startuphub-ai/
├── config/
│   └── index.js              # All env config, centralised
├── src/
│   ├── index.js              # Express app entry point
│   ├── ai/
│   │   ├── aishwarya.js      # Personality, system prompt, Gemini clients
│   │   ├── intentExtractor.js # Intent + slot extraction, clarification logic
│   │   └── responseGenerator.js # All of Aishwarya's messages
│   ├── search/
│   │   └── semanticSearch.js # pgvector search + composite scoring
│   ├── leads/
│   │   └── leadManager.js    # Lead creation, provider notification, responses
│   ├── profiles/
│   │   └── profileManager.js # User + profile CRUD
│   ├── notifications/
│   │   └── whatsapp.js       # Meta WhatsApp API sender
│   ├── webhook/
│   │   ├── webhookHandler.js # Meta webhook receiver + verifier
│   │   └── conversationEngine.js # Core conversation state machine
│   ├── middleware/
│   │   └── rateLimiter.js    # Per-IP and per-phone rate limiting
│   └── utils/
│       ├── logger.js         # Winston logger
│       ├── crypto.js         # Phone encryption, hashing, signature verify
│       └── supabase.js       # Supabase service client
├── scripts/
│   ├── processEmbeddingQueue.js  # Run as cron: embed pending profiles
│   └── expireLeads.js            # Run as cron: expire old leads
├── .env.example
├── railway.json
└── package.json
```

---

## Setup Guide

### Step 1 — Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/startuphub-ai.git
cd startuphub-ai
npm install
```

### Step 2 — Environment Variables

```bash
cp .env.example .env
```

Fill in all values in `.env`. See comments in `.env.example` for where to get each value.

Generate your encryption key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3 — Supabase

1. Create a project at https://supabase.com
2. Go to SQL Editor → New Query
3. Paste and run `startuphub_schema.sql` (in the `/database` folder)
4. Copy your Project URL and service role key into `.env`

### Step 4 — Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Create an API key
3. Add to `.env` as `GEMINI_API_KEY`

### Step 5 — Meta WhatsApp Business API

1. Go to https://developers.facebook.com
2. Create a new App → Business type
3. Add WhatsApp product
4. Register a phone number (or use the test number)
5. Copy Access Token and Phone Number ID into `.env`
6. Set your custom `WHATSAPP_VERIFY_TOKEN` in `.env` (any random string)

### Step 6 — Deploy to Railway

1. Push code to GitHub
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Select your repo
4. Add all environment variables from `.env` in Railway's Variables tab
5. Railway will auto-detect Node.js and deploy

### Step 7 — Register Webhook with Meta

Once deployed, copy your Railway URL (e.g. `https://startuphub-ai.up.railway.app`).

In Meta Developer Console:
1. Go to WhatsApp → Configuration → Webhook
2. Callback URL: `https://your-railway-url.up.railway.app/webhook/whatsapp`
3. Verify Token: same as your `WHATSAPP_VERIFY_TOKEN`
4. Subscribe to: `messages`

### Step 8 — Set Up Cron Jobs on Railway

In Railway, create two additional cron services:

**Embedding processor** (every 5 minutes):
- Command: `node scripts/processEmbeddingQueue.js`
- Schedule: `*/5 * * * *`

**Lead expiry** (daily at 2am IST):
- Command: `node scripts/expireLeads.js`
- Schedule: `30 20 * * *` (2am IST = 8:30pm UTC)

---

## Local Development

```bash
npm run dev
```

Test webhook locally using [ngrok](https://ngrok.com):
```bash
ngrok http 3000
# Use the ngrok URL as your webhook in Meta Developer Console
```

---

## How Aishwarya Works

1. User sends a WhatsApp message
2. Meta forwards it to `/webhook/whatsapp`
3. `conversationEngine.js` extracts intent and slots via Gemini
4. If slots are missing, Aishwarya asks a clarifying question
5. Once enough info is gathered, `semanticSearch.js` queries pgvector
6. Top 3 matches are shown. User picks one.
7. A lead is created. The chosen provider is notified via WhatsApp.
8. Provider accepts → contacts shared. Conversion tracked.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Database | Supabase PostgreSQL |
| Vector Search | pgvector (HNSW) |
| AI Model | Gemini 2.5 Flash |
| Embeddings | Gemini text-embedding-004 (768d) |
| WhatsApp | Meta WhatsApp Business API |
| Storage | Cloudinary |
| Hosting | Railway |
| Logging | Winston |

---

## Agent: Aishwarya

- Female, professional, warm, startup-savvy
- Responds in English by default
- Switches to Hinglish naturally when user does
- Never behaves like a chatbot or search engine
- Asks maximum 2 clarifying questions before searching
- Shows top 3 matches, asks which one to detail before sharing info
- Creates a lead on every search
- Notifies providers via WhatsApp

---

Built with ❤️ for the Indian startup ecosystem.
