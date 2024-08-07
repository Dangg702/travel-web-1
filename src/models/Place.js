const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        tourData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true }],
        name: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String },
        isFamous: { type: Boolean, required: true, default: false },
        region: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Place', placeSchema);
