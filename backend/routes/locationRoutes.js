const express = require("express");
const {
  updateLocation,
  getLocations,
} = require("../controllers/locationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/update", authMiddleware, updateLocation);
router.get("/", getLocations);

module.exports = router;
