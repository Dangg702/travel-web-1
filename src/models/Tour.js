const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { updatePlaceTourData } = require('../middleware/updatePlaceTourMiddleware');

const tourSchema = new Schema(
    {
        name: { type: String, required: true },
        placeData: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
        duration: { type: String }, // vd: 3 ngày 2 đêm
        dateGo: { type: String, required: true },
        dateBack: { type: String, required: true },
        desc: { type: String },
        price: { type: String, required: true },
        rating: { type: Number },
        scheduleHtml: { type: String },
        departure: { type: String },
        destination: { type: String },
        vehicle: { type: String },
        type: { type: String },
    },
    {
        timestamps: true,
    },
);
// Sử dụng middleware để cập nhật tourData của Place
tourSchema.post('save', updatePlaceTourData);

module.exports = mongoose.model('Tour', tourSchema);
