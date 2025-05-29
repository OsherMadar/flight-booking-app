const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// GET - מחזיר את כל הטיסות
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.findAll();
    res.json(flights);
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - מוסיף טיסה חדשה
router.post('/', async (req, res) => {
  try {
    const { origin, destination, departure_time, arrival_time, price } = req.body;

    if (!origin || !destination || !departure_time || !arrival_time || price == null) {
      return res.status(400).json({ error: 'Missing required flight data' });
    }

    const flight = await Flight.create({
      origin,
      destination,
      departure_time,
      arrival_time,
      price,
    });

    res.status(201).json(flight);
  } catch (err) {
    console.error('Error creating flight:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
