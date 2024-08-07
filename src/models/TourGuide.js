const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: { type: String },
        phone: { type: String, required: true },
        email: { type: String },
        desc: { type: String },
        rating: { type: Number },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('TourGuide', tourGuideSchema);
