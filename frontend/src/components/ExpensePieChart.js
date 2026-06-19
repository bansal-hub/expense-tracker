// components/ExpensePieChart.js
// Pie chart showing expense distribution by category

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Charts.css';

// Colors for each category slice
const CATEGORY_COLORS = {
  Food: '#4caf50',
  Travel: '#2196f3',
  Shopping: '#e91e63',
  Entertainment: '#ff9800',
  Bills: '#9c27b0',
  Other: '#607d8b'
};

const FALLBACK_COLORS = ['#4caf50', '#2196f3', '#e91e63', '#ff9800', '#9c27b0', '#607d8b'];

// Custom label shown on slices
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null; // Skip tiny slices
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{item.name}</p>
        <p className="chart-tooltip__value">
          ₹{new Intl.NumberFormat('en-IN').format(item.value)}
        </p>
        <p className="chart-tooltip__pct">{(item.payload.percent * 100).toFixed(1)}% of total</p>
      </div>
    );
  }
  return null;
};

function ExpensePieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Expense Distribution</h3>
        <div className="chart-empty">No data available yet.</div>
      </div>
    );
  }

  // Calculate total for percent
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: item.value / total
  }));

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Expense Distribution</h3>
      <p className="chart-card__sub">Spending breakdown by category</p>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={110}
            dataKey="value"
          >
            {dataWithPercent.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CATEGORY_COLORS[entry.name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: '0.8rem', color: '#424242' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
