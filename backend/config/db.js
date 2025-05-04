const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ MySQL connected on ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    connection.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
  }
})();

module.exports = pool;
