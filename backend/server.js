// server.js
// Entry point for the backend server

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────

// Allow requests from our React frontend (running on port 3000)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Parse incoming JSON request bodies
app.use(express.json());

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Mount all expense routes under /api
app.use('/api', expenseRoutes);

// Health check route - useful for testing if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running!' });
});

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Expense Tracker server is running`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 API Base: http://localhost:${PORT}/api\n`);
});
