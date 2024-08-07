const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');
const { authUserMiddleware, authenticateToken, authMiddleware } = require('../middleware/authMiddleware');

router.get('/booking-form/:id', authUserMiddleware, authenticateToken, bookingController.showBookTour);
router.post('/book-tour/:id', authUserMiddleware, authenticateToken, bookingController.bookTour);
router.patch('/update/:id', authUserMiddleware, authenticateToken, bookingController.updateBooking);
router.delete('/delete/:id', authMiddleware, bookingController.deleteBooking);
router.get('/all-bookings', authMiddleware, authenticateToken, bookingController.getAllBookings);
module.exports = router;
