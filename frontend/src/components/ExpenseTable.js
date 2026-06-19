// components/ExpenseTable.js
// Table showing all expenses with delete button

import React, { useState } from 'react';
import './ExpenseTable.css';

const CATEGORY_COLORS = {
  Food: { bg: '#e8f5e9', text: '#2e7d32' },
  Travel: { bg: '#e3f2fd', text: '#1565c0' },
  Shopping: { bg: '#fce4ec', text: '#c62828' },
  Entertainment: { bg: '#fff3e0', text: '#e65100' },
  Bills: { bg: '#ede7f6', text: '#4527a0' },
  Other: { bg: '#f5f5f5', text: '#424242' }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

function ExpenseTable({ expenses, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter expenses based on search and category
  const filtered = expenses.filter(exp => {
    const matchesSearch =
      exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (expenses.length === 0) {
    return (
      <div className="table-card">
        <div className="table-card__header">
          <h2 className="table-card__title">Expense History</h2>
        </div>
        <div className="empty-state">
          <p className="empty-state__icon">📭</p>
          <p className="empty-state__text">No expenses yet.</p>
          <p className="empty-state__sub">Add your first expense using the form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-card__header">
        <h2 className="table-card__title">
          Expense History
          <span className="table-count">{expenses.length}</span>
        </h2>

        {/* Filters */}
        <div className="table-filters">
          <input
            type="text"
            className="filter-input"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {['Food', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__text">No matching expenses found.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(expense => {
                const colors = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;
                return (
                  <tr key={expense.id} className={deletingId === expense.id ? 'row--deleting' : ''}>
                    <td className="date-cell">{formatDate(expense.expense_date)}</td>
                    <td>
                      <span
                        className="category-badge"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="description-cell">
                      {expense.description || <span className="no-desc">—</span>}
                    </td>
                    <td className="amount-cell">{formatCurrency(expense.amount)}</td>
                    <td className="action-cell">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(expense.id)}
                        disabled={deletingId === expense.id}
                        title="Delete expense"
                      >
                        {deletingId === expense.id ? '...' : '🗑'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="table-footer">
          Showing {filtered.length} of {expenses.length} expenses
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
