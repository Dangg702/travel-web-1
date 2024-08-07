//middlewares/uploadMiddleware.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: 'ddwjz3qrf', 
    api_key: '362594638692329', 
    api_secret: 'Se-8okEI5-tCH85FZPqTqp3IvX8' 
});

// Cấu hình Multer để xử lý tải lên tệp ảnh
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    // Kiểm tra nếu tệp là một tệp ảnh
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Chấp nhận tệp
    } else {
        cb(new Error('Only images are allowed!'), false); // Từ chối tệp
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    dest: './public/uploads/' // Lưu trữ tệp ảnh tạm thời tại đây
});

module.exports = upload;
