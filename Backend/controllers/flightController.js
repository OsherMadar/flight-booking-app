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
    const { origin, destination, departure_time, arrival_time, price } = req.body;

    // 🛑 ולידציה - כל שדה חובה
    if (!origin || !destination || !departure_time || !arrival_time || price === undefined) {
      return res.status(400).json({ error: 'Missing required flight fields' });
    }

    const newFlight = await flightModel.createFlight({
      origin,
      destination,
      departure_time,
      arrival_time,
      price
    });

    res.status(201).json(newFlight);
  } catch (error) {
    console.error('❌ Error in addFlight:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteFlight = async (req, res) => {
  try {
    await flightModel.deleteFlightById(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error('❌ Error in deleteFlight:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getFlights,
  addFlight,
  deleteFlight,
};
