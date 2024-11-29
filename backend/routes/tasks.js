const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");
const { authenticateManager } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticateManager, createTask);
router.get("/", authenticateManager, getTasks);

module.exports = router;
