require('dotenv').config();
const { Pool } = require('pg');

// מאפשר שימוש גם עם DB_URL וגם עם פרטים נפרדים (ל-Docker Compose)
const connectionConfig = process.env.DB_URL
  ? { connectionString: process.env.DB_URL }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'flights',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
    };

console.log('📦 DB config in use:', connectionConfig);

const pool = new Pool(connectionConfig);

module.exports = pool;
