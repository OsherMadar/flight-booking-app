const bookingModel = require('../models/bookingModel');

const addBooking = async (req, res) => {
  try {
    const newBooking = await bookingModel.createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addBooking,
  getBookings,
};
