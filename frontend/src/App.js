// App.js
// Root component - sets up the layout (header + main content)

import React from 'react';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* ─── Header ──────────────────────────────────── */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <span className="app-header__logo">💰</span>
            <div>
              <h1 className="app-header__title">Expense Tracker</h1>
              <p className="app-header__tagline">Track every rupee, every day</p>
            </div>
          </div>
          <div className="app-header__date">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </header>

      {/* ─── Main Content ────────────────────────────── */}
      <main className="app-main">
        <div className="app-container">
          <Home />
        </div>
      </main>

      {/* ─── Footer ──────────────────────────────────── */}
      <footer className="app-footer">
        <p>Smart Expense Tracker &nbsp;·&nbsp; Built with React, Node.js &amp; MySQL</p>
      </footer>
    </div>
  );
}

export default App;
