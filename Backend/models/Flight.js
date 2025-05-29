const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // ייבוא החיבור למסד הנתונים

const Flight = sequelize.define('Flight', {
  origin: {
    type: DataTypes.STRING,
    allowNull: false, // שדה חובה
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departure_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrival_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'flights',   // שם הטבלה במסד
  timestamps: false,      // לא ליצור שדות createdAt ו-updatedAt
});

module.exports = Flight;
