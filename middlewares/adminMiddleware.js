const adminMiddleware = async (req, res, next) => {
  if (!req.userInfo.role !== "admin") {
    res.json({
      success: false,
      message: "Admin rights required to access this page",
    });
  }
  next();
};

module.exports = adminMiddleware;
