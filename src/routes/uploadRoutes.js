//routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

// Hiển thị trang upload

// Xử lý tải lên ảnh
router.post('/upload', uploadMiddleware.single('image'), uploadController.uploadImage);

module.exports = router;
