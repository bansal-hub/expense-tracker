// routes/expenseRoutes.js
// Defines all API routes and maps them to controller functions

const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  addExpense,
  deleteExpense,
  getSummary,
  getChartData
} = require('../controllers/expenseController');

// GET    /expenses       → Get all expenses
// POST   /expenses       → Add a new expense
// DELETE /expenses/:id   → Delete an expense by ID
// GET    /summary        → Get dashboard summary data
// GET    /chart-data     → Get formatted data for charts

router.get('/expenses', getAllExpenses);
router.post('/expenses', addExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/summary', getSummary);
router.get('/chart-data', getChartData);

module.exports = router;
