const Place = require('../models/Place');
const Booking = require('../models/Booking');
const User = require('../models/User');
class DashboardController {
    async getIndex(req, res, next) {
        const bookings = await Booking.find();
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log('dashboard index user: ', user);
        res.render('dashboard', { layout: 'layouts/dashboard-layout', bookings, user });
    }
}

module.exports = new DashboardController();
