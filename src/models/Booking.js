const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        contactInfo: { type: Object, required: true },
        numOfPeople: { type: Number, required: true },
        unitPrice: { type: String, required: true },
        totalPrice: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        isPaid: { type: Boolean, default: false },
        paymentDate: { type: Date },
        status: { type: String, default: 'Pending' }, // trạng thái: Pending, Awaiting Payment, Cancelled, Success, Failed, Completed
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Booking', bookingSchema);
