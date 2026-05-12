const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

/* ── ENV (set these in Railway dashboard, never hardcode) ── */
const DB_HOST = process.env.DB_HOST;
const DB_PORT = parseInt(process.env.DB_PORT || '3306');
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_SSL = process.env.DB_SSL !== 'false';   // Aiven requires SSL
const JWT_SECRET = process.env.JWT_SECRET;           // long random string
const FRONTEND_URL = process.env.FRONTEND_URL || '*'; // your GitHub Pages URL

if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME || !JWT_SECRET) {
  console.error('Missing required environment variables. Check Railway dashboard.');
  process.exit(1);
}

/* ── CORS ── */
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

/* ── RATE LIMITING — blocks brute force attacks ── */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 attempts per IP per window
  message: { error: 'Too many attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

/* ── DATABASE POOL ── */
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  ssl: DB_SSL ? { rejectUnauthorized: false } : false,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

/* ── INIT DB — create admins table if it doesn't exist ── */
async function initDB() {
  const conn = await pool.getConnection();
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      username   VARCHAR(50)  NOT NULL UNIQUE,
      password   VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  conn.release();
  console.log('Database ready.');
}

/* ── JWT MIDDLEWARE ── */
function requireAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  try {
    req.admin = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

/* ══════════════════════════════
   ROUTES
══════════════════════════════ */

/* Health check */
app.get('/', (req, res) => res.json({ status: 'ok', service: 'FreeDownload API' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

/* ── REGISTER (first admin only — disabled once one admin exists) ── */
app.post('/api/admin/register', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required.' });
    if (username.length < 3 || username.length > 50)
      return res.status(400).json({ error: 'Username must be 3–50 characters.' });
    if (password.length < 8)
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });

    /* Block registration if any admin already exists */
    const [rows] = await pool.execute('SELECT id FROM admins LIMIT 1');
    if (rows.length > 0)
      return res.status(403).json({ error: 'Registration is closed. An admin account already exists.' });

    const hash = await bcrypt.hash(password, 12);
    await pool.execute(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username.trim(), hash]
    );

    res.status(201).json({ message: 'Admin account created. You can now log in.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ error: 'Username already taken.' });
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

/* ── LOGIN ── */
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required.' });

    const [rows] = await pool.execute(
      'SELECT id, username, password FROM admins WHERE username = ? LIMIT 1',
      [username.trim()]
    );

    if (!rows.length)
      return res.status(401).json({ error: 'Invalid username or password.' });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid)
      return res.status(401).json({ error: 'Invalid username or password.' });

    const token = jwt.sign(
      { id: rows[0].id, username: rows[0].username },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, username: rows[0].username });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

/* ── VERIFY TOKEN (used by admin.js on page load) ── */
app.get('/api/admin/verify', requireAuth, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

/* ── START ── */
const PORT = process.env.PORT || 3000;

// Start server immediately so Railway health check passes
app.listen(PORT, '0.0.0.0', () => console.log(`FreeDownload API running on port ${PORT}`));

// Then connect to DB separately — retries up to 5 times
async function connectWithRetry(retries = 5, delay = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await initDB();
      return;
    } catch (err) {
      console.error(`DB connection attempt ${i}/${retries} failed: ${err.message}`);
      if (i < retries) await new Promise(r => setTimeout(r, delay));
    }
  }
  console.error('All DB connection attempts failed. API running without database.');
}

connectWithRetry();
