const pool = require('../db');

const getAllBookings = async () => {
  const result = await pool.query('SELECT * FROM bookings');
  return result.rows;
};

const createBooking = async (booking) => {
  const { flight_id, passenger_name, email } = booking;
  const result = await pool.query(
    'INSERT INTO bookings (flight_id, passenger_name, email) VALUES ($1, $2, $3) RETURNING *',
    [flight_id, passenger_name, email]
  );
  return result.rows[0];
};

module.exports = {
  getAllBookings,
  createBooking,
};
