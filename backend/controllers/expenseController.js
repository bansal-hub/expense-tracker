// controllers/expenseController.js
// All business logic for expenses lives here

const db = require('../db/connection');

// ─── GET ALL EXPENSES ────────────────────────────────────────────────────────
// Returns all expenses, newest first
const getAllExpenses = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch expenses' });
  }
};

// ─── ADD NEW EXPENSE ─────────────────────────────────────────────────────────
const addExpense = async (req, res) => {
  const { amount, category, description, expense_date } = req.body;

  // Basic validation
  if (!amount || !category || !expense_date) {
    return res.status(400).json({
      success: false,
      message: 'Amount, category, and date are required'
    });
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be a positive number'
    });
  }

  const validCategories = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Other'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid category'
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO expenses (amount, category, description, expense_date) VALUES (?, ?, ?, ?)',
      [amount, category, description || '', expense_date]
    );

    // Fetch the newly created expense to send back
    const [newExpense] = await db.query('SELECT * FROM expenses WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: newExpense[0] });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ success: false, message: 'Failed to add expense' });
  }
};

// ─── DELETE EXPENSE ──────────────────────────────────────────────────────────
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM expenses WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ success: false, message: 'Failed to delete expense' });
  }
};

// ─── GET SUMMARY ─────────────────────────────────────────────────────────────
// Returns stats for the dashboard cards
const getSummary = async (req, res) => {
  try {
    // Total amount and count
    const [[totals]] = await db.query(
      'SELECT COUNT(*) as total_count, SUM(amount) as total_amount FROM expenses'
    );

    // Highest spending category
    const [[highestCategory]] = await db.query(`
      SELECT category, SUM(amount) as total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
      LIMIT 1
    `);

    // Monthly total (current month)
    const [[monthlyTotal]] = await db.query(`
      SELECT SUM(amount) as monthly_total
      FROM expenses
      WHERE MONTH(expense_date) = MONTH(CURDATE())
        AND YEAR(expense_date) = YEAR(CURDATE())
    `);

    // Most recent expense
    const [[recentExpense]] = await db.query(
      'SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC LIMIT 1'
    );

    // Category with most transactions
    const [[mostTransactions]] = await db.query(`
      SELECT category, COUNT(*) as count
      FROM expenses
      GROUP BY category
      ORDER BY count DESC
      LIMIT 1
    `);

    // Spending breakdown by category (percentage)
    const [categoryBreakdown] = await db.query(`
      SELECT category, SUM(amount) as total, COUNT(*) as count
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);

    const grandTotal = totals.total_amount || 0;
    const breakdown = categoryBreakdown.map(row => ({
      category: row.category,
      total: Number(row.total),
      count: row.count,
      percentage: grandTotal > 0 ? ((row.total / grandTotal) * 100).toFixed(1) : 0
    }));

    res.json({
      success: true,
      data: {
        total_count: totals.total_count,
        total_amount: Number(totals.total_amount) || 0,
        highest_category: highestCategory ? highestCategory.category : 'N/A',
        highest_category_amount: highestCategory ? Number(highestCategory.total) : 0,
        monthly_total: Number(monthlyTotal?.monthly_total) || 0,
        most_transactions_category: mostTransactions ? mostTransactions.category : 'N/A',
        most_transactions_count: mostTransactions ? mostTransactions.count : 0,
        recent_expense: recentExpense || null,
        category_breakdown: breakdown
      }
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch summary' });
  }
};

// ─── GET CHART DATA ───────────────────────────────────────────────────────────
// Returns data formatted for Recharts
const getChartData = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT category, SUM(amount) as total, COUNT(*) as count
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);

    // Format for both Pie and Bar charts
    const chartData = rows.map(row => ({
      name: row.category,
      value: Number(row.total),
      count: row.count
    }));

    res.json({ success: true, data: chartData });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch chart data' });
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  deleteExpense,
  getSummary,
  getChartData
};
