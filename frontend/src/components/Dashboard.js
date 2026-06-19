// components/Dashboard.js
// Top summary cards showing key stats at a glance

import React from 'react';
import './Dashboard.css';

// Format numbers as Indian Rupees
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format a date string nicely
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

function Dashboard({ summary }) {
  if (!summary) {
    return (
      <div className="dashboard-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="stat-card skeleton"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      {/* Total Spending */}
      <div className="stat-card stat-card--total">
        <div className="stat-card__icon">₹</div>
        <div className="stat-card__content">
          <p className="stat-card__label">Total Spending</p>
          <p className="stat-card__value">{formatCurrency(summary.total_amount)}</p>
          <p className="stat-card__sub">{summary.total_count} expenses recorded</p>
        </div>
      </div>

      {/* Highest Category */}
      <div className="stat-card stat-card--category">
        <div className="stat-card__icon">🏆</div>
        <div className="stat-card__content">
          <p className="stat-card__label">Top Category</p>
          <p className="stat-card__value">{summary.highest_category}</p>
          <p className="stat-card__sub">{formatCurrency(summary.highest_category_amount)} spent</p>
        </div>
      </div>

      {/* This Month */}
      <div className="stat-card stat-card--month">
        <div className="stat-card__icon">📅</div>
        <div className="stat-card__content">
          <p className="stat-card__label">This Month</p>
          <p className="stat-card__value">{formatCurrency(summary.monthly_total)}</p>
          <p className="stat-card__sub">
            {new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Most Recent Expense */}
      <div className="stat-card stat-card--recent">
        <div className="stat-card__icon">🕐</div>
        <div className="stat-card__content">
          <p className="stat-card__label">Last Expense</p>
          <p className="stat-card__value">
            {summary.recent_expense
              ? formatCurrency(summary.recent_expense.amount)
              : 'No expenses yet'}
          </p>
          <p className="stat-card__sub">
            {summary.recent_expense
              ? `${summary.recent_expense.category} · ${formatDate(summary.recent_expense.expense_date)}`
              : 'Add your first expense'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
