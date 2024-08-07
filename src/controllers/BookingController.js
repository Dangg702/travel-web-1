const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const User = require('../models/User');
class BookingController {
    // GET booking/booking-form/:id
    async showBookTour(req, res, next) {
        try {
            const userId = req.user ? req.user.id : null;
            let user = null;
            if (userId != null) {
                user = await User.findById(userId);
            }
            const tourId = req.params.id;
            const tour = await Tour.findById(tourId).populate('placeData');
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                res.render('book-tour', {
                    cssLink: '/css/tourDetail.css',
                    message: 'Success',
                    tour,
                    user,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    // POST booking/book-tour/:id
    async bookTour(req, res, next) {
        try {
            const tourId = req.params.id;
            const tour = await Tour.findById(tourId).populate('placeData');
            if (!tour) {
                return res.status(404).json({ message: 'No tour found' });
            } else {
                const price = parseInt(tour.price.replace(/\,/g, ''));
                const bookingData = {
                    tourId: tour._id,
                    userId: req.user.id,
                    contactInfo: req.body.contactInfo,
                    numOfPeople: req.body.numOfPeople,
                    unitPrice: tour.price,
                    totalPrice: (price * req.body.numOfPeople).toLocaleString(),
                    paymentMethod: req.body.paymentMethod,
                };
                const newBooking = new Booking(bookingData);
                const bookingResult = await newBooking.save();
                res.status(200).json({ message: 'Tour booked successfully', status: 'ok', booking: bookingResult });
            }
        } catch (err) {
            next(err);
        }
    }
    // PATCH /booking/update/:id
    async updateBooking(req, res, next) {
        try {
            const bookingId = req.params.id;
            const updateData = req.body;
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData);
            if (!updatedBooking) {
                return res.status(404).json({ message: 'No booking found', status: 'fail' });
            }
            res.status(200).json({ message: 'Booking updated successfully', status: 'ok', tour: updatedBooking });
        } catch (err) {
            next(err);
        }
    }
    // DELETE /booking/delete-booking/:id
    async deleteBooking(req, res, next) {
        try {
            const bookingId = req.params.id;
            const deletedBooking = await Booking.findByIdAndDelete(bookingId);
            if (!deletedBooking) {
                return res.status(404).json({ message: 'No booking found' });
            }
            res.status(200).json({ message: 'Booking deleted successfully', status: 'ok' });
        } catch (err) {
            next(err);
        }
    }
    // GET /user/account/:id/booking-info
    async getUserBookingInfo(req, res, next) {
        try {
            const userID = req.user ? req.user.id : null;
            let user = null;
            if (userID != null) {
                user = await User.findById(userID);
            }
            const userId = req.params.id;
            const bookings = await Booking.find({ userId }).sort({ updatedAt: -1 }).populate('tourId');
            console.log('bookings', bookings);
            res.render('booking-info', {
                cssLink: '/css/booking-info.css',
                bookings,
                user,
            });
        } catch (err) {
            next(err);
        }
    }
    // GET /booking/all-bookings
    async getAllBookings(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);
            const bookings = await Booking.find();
            // res.status(200).json({ message: 'Success', status: 'ok', bookings });
            res.render('admin-booking', {
                layout: 'layouts/dashboard-layout',
                bookings,
                user,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookingController();
