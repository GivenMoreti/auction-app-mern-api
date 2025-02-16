const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    if (user?.length > 0) {
      res.status(200).json({
        success: true,
        message: "All the users",
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getAllUsers;
