const pool = require('../db');

const getAllFlights = async () => {
  const result = await pool.query('SELECT * FROM flights');
  return result.rows;
};

const createFlight = async (flight) => {
  const { origin, destination, departure_time, price } = flight;
  const result = await pool.query(
    'INSERT INTO flights (origin, destination, departure_time, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [origin, destination, departure_time, price]
  );
  return result.rows[0];
};

module.exports = {
  getAllFlights,
  createFlight,
};
