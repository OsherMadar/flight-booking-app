const flightModel = require('../models/flightModel');

const getFlights = async (req, res) => {
  try {
    const flights = await flightModel.getAllFlights();
    res.json(flights);
  } catch (error) {
    console.error('❌ Error in getFlights:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addFlight = async (req, res) => {
  try {
    const newFlight = await flightModel.createFlight(req.body);
    res.status(201).json(newFlight);
  } catch (error) {
    console.error('❌ Error in addFlight:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getFlights,
  addFlight,
};
