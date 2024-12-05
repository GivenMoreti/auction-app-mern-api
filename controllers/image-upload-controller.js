const uploadToCloudinary = require("../config/cloudinary");
const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "File is missing",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store image url and public id in a database.

    const newImage = new Image({
      publicId,
      url,
      uploadedBy: req.userInfo.userId,
    });

    //save image to mongodb

    await newImage.save();
    res.status(201).json({
      success: true,
      message: "Image uploaded to mongodb 👍",
    });
      
      
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
    console.log(err);
  }
};

module.exports = uploadImage;
