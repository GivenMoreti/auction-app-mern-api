const express = require("express");
const {
  createProfile,
  deleteProfile,
  getProfile,
  getProfiles,
  updateProfile,
} = require("../controllers/profile-controller");

const router = express.Router();

router.get("/", getProfiles);
router.get("/:id", getProfile);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
