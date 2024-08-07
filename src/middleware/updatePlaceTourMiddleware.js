const mongoose = require('mongoose');
const Tour = require('../models/Tour');
const Place = require('../models/Place');

// Middleware để tự động cập nhật tourData của Place khi tạo một Tour mới
const updatePlaceTourData = async function (doc) {
    try {
        // Tìm địa điểm tương ứng với tour
        const place = await Place.findById(doc.placeData);
        if (place) {
            // Thêm id của tour mới vào mảng tourData của địa điểm
            place.tourData.push(doc._id);
            await place.save(); // Lưu lại thông tin của địa điểm
        }
    } catch (error) {
        console.error('Error updating place data:', error);
    }
};

module.exports = { updatePlaceTourData };
