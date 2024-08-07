
// cloudinaryModel.js
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: 'ddwjz3qrf', 
  api_key: '362594638692329', 
  api_secret: 'Se-8okEI5-tCH85FZPqTqp3IvX8' 
});

// Hàm upload ảnh lên Cloudinary
const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadImage
};
