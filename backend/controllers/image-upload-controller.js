const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "items", // Save images in 'items' folder
    });
    return result.secure_url; // Return the image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

module.exports = { uploadToCloudinary };
