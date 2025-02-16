const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //if user does not exist
    //create a new user

    const newUser = new User({
      email,
      username,
      password: hashPassword,
      role: role || "user",
    });

    await newUser.save();

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "user registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register a user",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    //log in user
    const { email, password } = req.body;

    //check if email already exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "email does not exist, register first",
      });
    }

    //user has account

    //check the passwords match
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    //CREATE A SIGN IN TOKEN
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
      // (err) => console.log(err)
    );

    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      data: accessToken,
    });

    //access token holds username,email,password and role.
    //navigate user to homepage
  } catch (err) {
    console.log("There was an error logging in,please try again ", err);
  }
};

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

module.exports = { registerUser, loginUser, getAllUsers };
