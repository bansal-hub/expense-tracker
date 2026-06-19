// services/api.js
// Centralized API service - all fetch calls to the backend go through here

const API_BASE = '/api';

// ─── EXPENSES ─────────────────────────────────────────────────────────────────

// Fetch all expenses from the database
export const fetchExpenses = async () => {
  const response = await fetch(`${API_BASE}/expenses`);
  if (!response.ok) throw new Error('Failed to fetch expenses');
  const data = await response.json();
  return data.data;
};

// Add a new expense
export const addExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData)
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to add expense');
  }
  const data = await response.json();
  return data.data;
};

// Delete an expense by ID
export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete expense');
  return true;
};

// ─── SUMMARY & CHARTS ─────────────────────────────────────────────────────────

// Fetch summary stats for dashboard cards
export const fetchSummary = async () => {
  const response = await fetch(`${API_BASE}/summary`);
  if (!response.ok) throw new Error('Failed to fetch summary');
  const data = await response.json();
  return data.data;
};

// Fetch chart data formatted for Recharts
export const fetchChartData = async () => {
  const response = await fetch(`${API_BASE}/chart-data`);
  if (!response.ok) throw new Error('Failed to fetch chart data');
  const data = await response.json();
  return data.data;
};
