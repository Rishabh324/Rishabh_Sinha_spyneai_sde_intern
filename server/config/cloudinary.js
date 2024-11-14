// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Your API secret
});

module.exports = cloudinary;