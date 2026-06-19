// components/AddExpenseForm.js
// Form to add a new expense

import React, { useState } from 'react';
import './AddExpenseForm.css';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Other'];

// Get today's date formatted as YYYY-MM-DD for the date input default
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

function AddExpenseForm({ onExpenseAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    description: '',
    expense_date: getTodayDate()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Frontend validation
    if (!formData.amount || Number(formData.amount) <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    setLoading(true);

    try {
      // Call the parent callback which handles the API call
      await onExpenseAdded(formData);

      // Reset form on success
      setFormData({
        amount: '',
        category: 'Food',
        description: '',
        expense_date: getTodayDate()
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-card__title">Add New Expense</h2>

      {error && (
        <div className="alert alert--error">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="alert alert--success">
          ✅ Expense added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="expense-form">
        {/* Amount */}
        <div className="form-group">
          <label className="form-label" htmlFor="amount">
            Amount (₹) <span className="required">*</span>
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            className="form-input"
            placeholder="e.g. 500"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="form-input form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="form-input"
            placeholder="e.g. Lunch at Dominos"
            value={formData.description}
            onChange={handleChange}
            maxLength={255}
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label" htmlFor="expense_date">
            Date <span className="required">*</span>
          </label>
          <input
            id="expense_date"
            type="date"
            name="expense_date"
            className="form-input"
            value={formData.expense_date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : '+ Add Expense'}
        </button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
