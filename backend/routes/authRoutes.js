const express = require("express");
const {
  signupManager,
  loginManager,
  loginGuard,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signupManager);
router.post("/login", loginManager);
router.post("/loginGuard", loginGuard);

module.exports = router;
