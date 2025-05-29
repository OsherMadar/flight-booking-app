const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/bookings', bookingController.addBooking);
router.get('/bookings', bookingController.getBookings);

module.exports = router;
