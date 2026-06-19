-- ============================================
-- Smart Expense Tracker - MySQL Schema
-- ============================================

-- Create the database
CREATE DATABASE IF NOT EXISTS expense_tracker;

USE expense_tracker;

-- Create the expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  expense_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert some sample data to get started
INSERT INTO expenses (amount, category, description, expense_date) VALUES
(450.00, 'Food', 'Grocery shopping at Big Bazaar', '2025-06-01'),
(1200.00, 'Bills', 'Electricity bill for May', '2025-06-02'),
(350.00, 'Travel', 'Auto rickshaw rides', '2025-06-03'),
(800.00, 'Shopping', 'New shirt from Amazon', '2025-06-05'),
(200.00, 'Entertainment', 'Movie ticket', '2025-06-07'),
(600.00, 'Food', 'Restaurant dinner', '2025-06-10'),
(500.00, 'Travel', 'Bus tickets to hometown', '2025-06-12'),
(150.00, 'Food', 'Evening snacks', '2025-06-14'),
(2500.00, 'Bills', 'Internet & mobile recharge', '2025-06-15'),
(300.00, 'Entertainment', 'Spotify + OTT subscriptions', '2025-06-17');
