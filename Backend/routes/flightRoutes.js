const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

router.get('/flights', flightController.getFlights);
router.post('/flights', flightController.addFlight);
router.delete('/flights/:id', flightController.deleteFlight);

module.exports = router;
