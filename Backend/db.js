require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL database with Sequelize');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
