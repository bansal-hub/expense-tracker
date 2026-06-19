# 💰 Smart Expense Tracker

A beginner-friendly full-stack expense tracking app built with **React**, **Node.js**, **Express.js**, and **MySQL**.
## 🌐 Live Demo
You can access the live version of this project here: **[https://expense-tracker-tawny.beta.vercel.app](https://expense-tracker-tawny.beta.vercel.app)**

*Note: This project is hosted on free-tier cloud services. The backend may take 30–50 seconds to "wake up" after a period of inactivity.*

---
---

## 📁 Project Structure

```
expense-tracker/
├── database/
│   └── schema.sql              ← Run this first to set up MySQL
├── backend/
│   ├── server.js               ← Entry point, starts Express server
│   ├── .env                    ← Your DB credentials (create this)
│   ├── db/
│   │   └── connection.js       ← MySQL connection pool
│   ├── routes/
│   │   └── expenseRoutes.js    ← API route definitions
│   └── controllers/
│       └── expenseController.js ← Business logic for each route
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js            ← React entry point
        ├── App.js              ← Root component + layout
        ├── App.css             ← Global styles
        ├── components/
        │   ├── Dashboard.js         ← Top stat cards
        │   ├── Dashboard.css
        │   ├── AddExpenseForm.js    ← Form to add expenses
        │   ├── AddExpenseForm.css
        │   ├── ExpenseTable.js      ← Table with delete
        │   ├── ExpenseTable.css
        │   ├── SummaryCards.js      ← Smart Insights
        │   ├── SummaryCards.css
        │   ├── ExpensePieChart.js   ← Pie chart (Recharts)
        │   ├── ExpenseBarChart.js   ← Bar chart (Recharts)
        │   └── Charts.css
        ├── pages/
        │   ├── Home.js         ← Main page, composes all components
        │   └── Home.css
        └── services/
            └── api.js          ← All fetch() calls to the backend
```

---
### 💻 Local Development
If you wish to contribute to the project or run it locally, follow these steps:

## 🛠️ Prerequisites

Make sure you have these installed:

- **Node.js** (v16 or higher) — https://nodejs.org
- **MySQL** (v8 or higher) — https://dev.mysql.com/downloads/
- **Git** — https://git-scm.com
- **VS Code** — https://code.visualstudio.com
- **Postman** (optional, for testing APIs) — https://postman.com

---

## 🚀 Setup Instructions

### Step 1 — Set up MySQL Database

Open MySQL Workbench or your terminal and run:

```sql
-- Option A: MySQL terminal
mysql -u root -p
source /path/to/expense-tracker/database/schema.sql

-- Option B: MySQL Workbench
-- File → Open SQL Script → select database/schema.sql → Run (⚡)
```

This creates the `expense_tracker` database and `expenses` table, and adds sample data.

---

### Step 2 — Set up the Backend

```bash
# Navigate to backend folder
cd expense-tracker/backend

# Install dependencies
npm install

# Create your .env file (copy the example and fill in your MySQL password)
cp .env .env.backup
```

Edit `backend/.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=expense_tracker
PORT=5000
```

Start the backend:
```bash
# Development mode (auto-restarts on file changes)
npm run dev

# OR production mode
npm start
```

You should see:
```
✅ Expense Tracker server is running
🌐 URL: http://localhost:5000
📊 API Base: http://localhost:5000/api
```

---

### Step 3 — Set up the Frontend

Open a **new terminal tab/window**:

```bash
# Navigate to frontend folder
cd expense-tracker/frontend

# Install dependencies (this takes a minute)
npm install

# Start the React development server
npm start
```

Your browser will open at **http://localhost:3000** automatically.

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add a new expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/summary` | Dashboard summary data |
| GET | `/api/chart-data` | Data formatted for charts |

### POST /api/expenses — Request Body
```json
{
  "amount": 500,
  "category": "Food",
  "description": "Lunch at restaurant",
  "expense_date": "2025-06-19"
}
```

### Testing with Postman
1. Open Postman
2. Create a new collection called "Expense Tracker"
3. Test each endpoint:
   - GET `http://localhost:5000/api/expenses`
   - POST `http://localhost:5000/api/expenses` (set Body → raw → JSON)
   - GET `http://localhost:5000/api/summary`
   - GET `http://localhost:5000/api/chart-data`
   - DELETE `http://localhost:5000/api/expenses/1`

---

## 🗄️ Database Schema

```sql
CREATE TABLE expenses (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  amount       DECIMAL(10, 2)  NOT NULL,
  category     VARCHAR(50)     NOT NULL,
  description  VARCHAR(255),
  expense_date DATE            NOT NULL,
  created_at   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);
```

Valid categories: `Food`, `Travel`, `Shopping`, `Entertainment`, `Bills`, `Other`

---

## ✨ Features

- **Dashboard** — Total spending, top category, monthly total, last expense
- **Add Expense** — Form with validation for amount, category, description, date
- **Expense Table** — Sortable list with search, category filter, and delete
- **Smart Insights** — Monthly spend, most frequent category, breakdown with progress bars
- **Charts** — Pie chart (distribution) and Bar chart (totals) powered by Recharts

---

## 🧠 How It Works (for beginners)

```
Browser (React)  →  fetch('/api/expenses')  →  Express Router
                                                     ↓
                                              Controller Function
                                                     ↓
                                              MySQL Query (mysql2)
                                                     ↓
                                              JSON Response  →  React updates UI
```

1. React renders the UI and calls `fetch()` to get data
2. Express receives the request and routes it to the right controller
3. The controller runs a SQL query using `mysql2`
4. MySQL returns the data
5. Express sends it back as JSON
6. React stores it in state and re-renders

---

## 🔧 npm Packages Used

### Backend
```bash
npm install express mysql2 cors dotenv
npm install --save-dev nodemon
```

### Frontend
```bash
npm install recharts
# (react, react-dom, react-scripts are included with Create React App)
```

---

## 🐛 Common Issues

**"Cannot connect to MySQL"**
→ Check your `.env` password matches your MySQL root password
→ Make sure MySQL service is running

**"CORS error" in browser**
→ Make sure the backend is running on port 5000
→ The frontend proxy in `package.json` handles this automatically

**"Module not found"**
→ Run `npm install` inside both `backend/` and `frontend/` folders

**Port already in use**
→ Change `PORT=5001` in `.env` and update the proxy in `frontend/package.json`
