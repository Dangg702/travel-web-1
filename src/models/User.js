const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        avatar: {
            type: String,
            default:
                'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png',
        },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', userSchema);
