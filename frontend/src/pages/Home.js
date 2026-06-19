// pages/Home.js
// Main page that composes all components together

import React, { useState, useEffect, useCallback } from 'react';
import Dashboard from '../components/Dashboard';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import SummaryCards from '../components/SummaryCards';
import ExpensePieChart from '../components/ExpensePieChart';
import ExpenseBarChart from '../components/ExpenseBarChart';
import { fetchExpenses, addExpense, deleteExpense, fetchSummary, fetchChartData } from '../services/api';
import './Home.css';

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | expenses | charts

  // Load all data from the backend
  const loadData = useCallback(async () => {
    try {
      setError('');
      const [expensesData, summaryData, chartDataResult] = await Promise.all([
        fetchExpenses(),
        fetchSummary(),
        fetchChartData()
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
      setChartData(chartDataResult);
    } catch (err) {
      setError('Could not connect to the server. Make sure the backend is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle adding a new expense
  const handleAddExpense = async (formData) => {
    const newExpense = await addExpense(formData);
    // Refresh all data after adding
    await loadData();
    return newExpense;
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    await loadData();
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your expenses...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* ─── Error Banner ─────────────────────────────── */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={loadData} className="retry-btn">Retry</button>
        </div>
      )}

      {/* ─── Dashboard Stats (always visible) ─────────── */}
      <Dashboard summary={summary} />

      {/* ─── Tab Navigation ───────────────────────────── */}
      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'tab-btn--active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📋 Insights
        </button>
        <button
          className={`tab-btn ${activeTab === 'expenses' ? 'tab-btn--active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          📝 Expenses
          {expenses.length > 0 && <span className="tab-badge">{expenses.length}</span>}
        </button>
        <button
          className={`tab-btn ${activeTab === 'charts' ? 'tab-btn--active' : ''}`}
          onClick={() => setActiveTab('charts')}
        >
          📊 Charts
        </button>
      </div>

      {/* ─── Tab Content ──────────────────────────────── */}

      {activeTab === 'dashboard' && (
        <div className="tab-content">
          {/* Smart Insights */}
          <SummaryCards summary={summary} />

          {/* Add Expense Form inline on this tab */}
          <div className="add-form-section">
            <AddExpenseForm onExpenseAdded={handleAddExpense} />
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="tab-content">
          <div className="expenses-layout">
            {/* Add form on the left */}
            <div className="expenses-layout__form">
              <AddExpenseForm onExpenseAdded={handleAddExpense} />
            </div>
            {/* Table on the right */}
            <div className="expenses-layout__table">
              <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'charts' && (
        <div className="tab-content">
          <div className="charts-grid">
            <ExpensePieChart data={chartData} />
            <ExpenseBarChart data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
