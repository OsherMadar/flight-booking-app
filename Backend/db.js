const { Pool } = require('pg');
require('dotenv').config();

console.log('Connecting to DB at:', process.env.DB_HOST); // בדיקה חשובה

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // תיקון
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
