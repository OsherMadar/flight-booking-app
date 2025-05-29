const express = require('express');
const app = express();

const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookings.routes');

app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use('/api', flightRoutes);
app.use('/api', bookingRoutes); // ← הוספת נתיבי ההזמנות

module.exports = app;
