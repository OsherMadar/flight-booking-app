const express = require('express');
require('dotenv').config();

const app = express();

const sequelize = require('./db'); // חיבור Sequelize למסד
const flightsRouter = require('./routes/flights');

// סינכרון עם מסד הנתונים - יוודא שהטבלאות מעודכנות לפי המודלים
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced');

    // רק אחרי הסינכרון מריצים את השרת
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });

app.use(express.json());
app.use('/api/flights', flightsRouter);
