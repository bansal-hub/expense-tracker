// db/connection.js
// This file sets up the MySQL database connection

const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool (better than single connection for apps)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool with promise support so we can use async/await
const promisePool = pool.promise();

module.exports = promisePool;
