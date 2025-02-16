const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      message: "access denied, no token provided",
      success: false,
    });
  }

  //decode token i.e. extract user information from it.

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.userInfo = decodedToken;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMiddleware;
