const pool = require('../db');

const createBooking = async (bookingData) => {
  const { flight_id, passenger_name, email } = bookingData;
  const result = await pool.query(
    `INSERT INTO bookings (flight_id, passenger_name, email)
     VALUES ($1, $2, $3) RETURNING *`,
    [flight_id, passenger_name, email]
  );
  return result.rows[0];
};

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result.rows;
};

module.exports = {
  createBooking,
  getAllBookings,
};
