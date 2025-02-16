const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const uploadImage = await cloudinary.uploader.upload(filePath);

    return {
      url: uploadImage.secure_url,
      publicId: uploadImage.public_id,
    };
  } catch (err) {
    console.error(err);
  }
};
module.exports = uploadToCloudinary;
