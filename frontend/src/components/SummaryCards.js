// components/SummaryCards.js
// Smart Insights section - shows spending patterns

import React from 'react';
import './SummaryCards.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

function SummaryCards({ summary }) {
  if (!summary) return null;

  const { category_breakdown = [], monthly_total, most_transactions_category, most_transactions_count } = summary;

  // Pick a color for each category
  const COLORS = {
    Food: '#4caf50',
    Travel: '#2196f3',
    Shopping: '#e91e63',
    Entertainment: '#ff9800',
    Bills: '#9c27b0',
    Other: '#607d8b'
  };

  return (
    <div className="insights-section">
      <h2 className="section-title">Smart Insights</h2>

      <div className="insights-grid">
        {/* Monthly spending */}
        <div className="insight-card insight-card--monthly">
          <div className="insight-card__header">
            <span className="insight-card__icon">📊</span>
            <span className="insight-card__label">Monthly Spend</span>
          </div>
          <p className="insight-card__value">{formatCurrency(monthly_total)}</p>
          <p className="insight-card__desc">
            Total spending in {new Date().toLocaleString('en-IN', { month: 'long' })}
          </p>
        </div>

        {/* Most transactions category */}
        <div className="insight-card insight-card--frequent">
          <div className="insight-card__header">
            <span className="insight-card__icon">🔁</span>
            <span className="insight-card__label">Most Frequent</span>
          </div>
          <p className="insight-card__value">{most_transactions_category || 'N/A'}</p>
          <p className="insight-card__desc">
            {most_transactions_count} transactions in this category
          </p>
        </div>

        {/* Highest category */}
        <div className="insight-card insight-card--top">
          <div className="insight-card__header">
            <span className="insight-card__icon">💸</span>
            <span className="insight-card__label">Top Spending</span>
          </div>
          <p className="insight-card__value">{summary.highest_category || 'N/A'}</p>
          <p className="insight-card__desc">
            {formatCurrency(summary.highest_category_amount)} total
          </p>
        </div>

        {/* Total number of categories used */}
        <div className="insight-card insight-card--categories">
          <div className="insight-card__header">
            <span className="insight-card__icon">🏷️</span>
            <span className="insight-card__label">Categories Used</span>
          </div>
          <p className="insight-card__value">{category_breakdown.length}</p>
          <p className="insight-card__desc">Out of 6 available categories</p>
        </div>
      </div>

      {/* Category breakdown with progress bars */}
      {category_breakdown.length > 0 && (
        <div className="breakdown-card">
          <h3 className="breakdown-title">Spending by Category</h3>
          <div className="breakdown-list">
            {category_breakdown.map(item => (
              <div key={item.category} className="breakdown-item">
                <div className="breakdown-item__info">
                  <span className="breakdown-item__name">{item.category}</span>
                  <span className="breakdown-item__amount">{formatCurrency(item.total)}</span>
                  <span className="breakdown-item__pct">{item.percentage}%</span>
                </div>
                <div className="breakdown-bar-track">
                  <div
                    className="breakdown-bar-fill"
                    style={{
                      width: `${item.percentage}%`,
                      background: COLORS[item.category] || '#607d8b'
                    }}
                  ></div>
                </div>
                <p className="breakdown-item__count">{item.count} transaction{item.count !== 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;
