const Place = require('../models/Place');
const Tour = require('../models/Tour');
const User = require('../models/User');
const tourService = require('../services/TourService');
const EmailService = require('../services/EmailService');

class IndexController {
    async getIndex(req, res, next) {
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }

        const limitNumber = 6;
        const latestTours = await Tour.find().sort({ createdAt: -1 }).limit(limitNumber).populate('placeData');
        const regions = ['miền bắc', 'miền trung', 'miền nam']; // Danh sách các khu vực
        const toursByRegion = {}; // Object lưu trữ các tour theo khu vực
        for (const region of regions) {
            const filteredTours = await tourService.getToursByRegion(region);
            toursByRegion[region] = filteredTours.slice(0, limitNumber); // Lưu các tour theo từng khu vực vào object
        }

        res.render('home', {
            cssLink: '/css/home.css',
            user,
            toursByRegion,
            latestTours,
        });
    }

    async getContact(req, res, next) {
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }
        res.render('contact', {
            cssLink: '/css/contact.css',
            user,
        });
    }
    async sendContact(req, res, next) {
        try {
            const data = req.body;
            await EmailService.sendContactEmail(data);
            // res.status(200).json({ message: 'Email sent successfully' });
            res.redirect('/contact');
        } catch (error) {
            console.error('Failed to send email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    }
}

module.exports = new IndexController();
