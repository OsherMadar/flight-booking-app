const request = require('supertest');
const app = require('../app');

describe('🛫 Flights API', () => {
  let createdFlightId;

  it('GET /api/flights should return array of flights', async () => {
    const res = await request(app).get('/api/flights');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/flights should add a new flight', async () => {
    const timestamp = Date.now();
    const newFlight = {
      origin: `TestOrigin-${timestamp}`,
      destination: `TestDest-${timestamp}`,
      departure_time: new Date(Date.now() + 3600000).toISOString(),
      arrival_time: new Date(Date.now() + 7200000).toISOString(),
      price: 999.99,
    };

    const res = await request(app).post('/api/flights').send(newFlight);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdFlightId = res.body.id;
  });

  it('POST /api/flights should return 400 if required fields are missing', async () => {
    const invalidFlight = {
      destination: 'Nowhere',
      departure_time: '2025-01-01T10:00:00',
      arrival_time: '2025-01-01T12:00:00',
      price: 100,
    };

    const res = await request(app).post('/api/flights').send(invalidFlight);
    expect(res.statusCode).toBe(400); // מצפה לכשל בגלל שדה חסר
    expect(res.body).toHaveProperty('error');
  });

  afterAll(async () => {
    if (createdFlightId) {
      await request(app).delete(`/api/flights/${createdFlightId}`);
    }
  });
});
