const express = require("express");
const { createGuard, getAllGuards } = require("../controllers/guardController");
const router = express.Router();

router.post("/create", createGuard);
router.get("/", getAllGuards);

module.exports = router;
