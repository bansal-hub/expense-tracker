// components/ExpenseBarChart.js
// Bar chart showing total spending per category

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './Charts.css';

const CATEGORY_COLORS = {
  Food: '#4caf50',
  Travel: '#2196f3',
  Shopping: '#e91e63',
  Entertainment: '#ff9800',
  Bills: '#9c27b0',
  Other: '#607d8b'
};

const FALLBACK_COLORS = ['#4caf50', '#2196f3', '#e91e63', '#ff9800', '#9c27b0', '#607d8b'];

// Format Y-axis ticks as ₹1K, ₹2K, etc.
const formatYAxis = (value) => {
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
};

// Custom tooltip for bars
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{label}</p>
        <p className="chart-tooltip__value">
          ₹{new Intl.NumberFormat('en-IN').format(payload[0].value)}
        </p>
        <p className="chart-tooltip__pct">{payload[0].payload.count} transaction{payload[0].payload.count !== 1 ? 's' : ''}</p>
      </div>
    );
  }
  return null;
};

function ExpenseBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Spending by Category</h3>
        <div className="chart-empty">No data available yet.</div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Spending by Category</h3>
      <p className="chart-card__sub">Total amount spent per category</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#9e9e9e' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: '#9e9e9e' }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(92,107,192,0.05)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CATEGORY_COLORS[entry.name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseBarChart;
