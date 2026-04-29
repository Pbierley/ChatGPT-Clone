const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'chatgpt-clone-dev-secret';
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
app.use(cors());
app.use(express.json({ limit: '4mb' })); // allow large file-context payloads

let db;
let openai;

async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.MONGODB_DB_NAME);
  console.log('[MongoDB] Connected to:', process.env.MONGODB_DB_NAME);
}

function initOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('[OpenAI] OPENAI_API_KEY not set — /api/chat will fail');
    return;
  }
  openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
  console.log('[OpenAI] Client initialized');
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    const existing = await db.collection('users').findOne({ email });
    if (existing) return res.status(400).json({ error: 'An account with that email already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuid();
    await db.collection('users').insertOne({ _id: userId, email, passwordHash, createdAt: new Date() });
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: userId, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chat — proxies to OpenAI server-side; key never touches the client
app.post('/api/chat', authMiddleware, async (req, res) => {
  if (!openai) return res.status(503).json({ error: 'OpenAI not configured on server' });
  try {
    const { messages, model } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }
    const response = await openai.createChatCompletion({
      model: model || 'gpt-4o-mini',
      messages,
    });
    res.json({ content: response.data.choices[0].message.content });
  } catch (err) {
    console.error('[OpenAI] Error:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data?.error?.message || 'Failed to get AI response';
    res.status(status).json({ error: message });
  }
});

// Load conversations
app.get('/api/conversations', authMiddleware, async (req, res) => {
  try {
    const { search } = req.query;
    const query = { userId: req.user.id };
    if (search) {
      query['messages.content'] = { $regex: search, $options: 'i' };
    }
    const docs = await db.collection('conversations').find(query).toArray();
    res.json(docs.map(({ _id, messages, model, persona }) => ({ id: _id, messages, model, persona })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save / upsert one conversation
app.post('/api/conversations/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { messages, model, persona } = req.body;
    await db.collection('conversations').replaceOne(
      { _id: id, userId: req.user.id },
      { _id: id, userId: req.user.id, messages, model: model || 'gpt-4o-mini', persona: persona || '' },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all conversations for this user
app.delete('/api/conversations', authMiddleware, async (req, res) => {
  try {
    await db.collection('conversations').deleteMany({ userId: req.user.id });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const ready = connectToMongoDB().then(() => {
  initOpenAI();
  return new Promise((resolve) => app.listen(PORT, HOST, () => {
    console.log(`[API] Server running on http://${HOST}:${PORT}`);
    resolve();
  }));
}).catch((err) => {
  console.error('[MongoDB] Connection failed:', err.message);
  process.exit(1);
});

module.exports = { ready };
