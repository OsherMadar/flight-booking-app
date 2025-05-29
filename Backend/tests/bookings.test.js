const request = require('supertest');
const app = require('../app');

describe('📘 Bookings API', () => {
  it('GET /api/bookings should return array of bookings', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/bookings should create a new booking', async () => {
    const newBooking = {
      flight_id: 1, // ← שימי לב שצריך לוודא ש-ID 1 קיים במסד
      passenger_name: 'Test User',
      email: 'test@example.com',
    };

    const res = await request(app).post('/api/bookings').send(newBooking);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id'); // assuming ID is returned
  });
});
