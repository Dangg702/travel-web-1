//controllers/uploadController.js

const cloudinary = require('cloudinary').v2;
// Middleware để xử lý tải lên ảnh lên Cloudinary
exports.uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path); // Tải ảnh lên Cloudinary
        res.json({ url: result.secure_url }); // Trả về URL của ảnh đã tải lên
    } catch (error) {
        res.status(500).json({ error: 'Image upload failed!' }); // Trả về thông báo lỗi nếu có lỗi xảy ra
    }
};
