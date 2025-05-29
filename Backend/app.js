const express = require('express');
const app = express();

const flightRoutes = require('./routes/flightRoutes');

app.use(express.json());

app.use('/api', flightRoutes);

module.exports = app;
