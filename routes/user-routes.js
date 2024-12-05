const express = require("express");
const getAllUsers = require("../controllers/user-controller-data");

const router = express.Router();

router.get("/get", getAllUsers);

module.exports = router;
