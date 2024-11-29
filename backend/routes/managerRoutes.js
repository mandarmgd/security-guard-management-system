// routes/managerRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Manager = require("../models/managerModel");

// Manager Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    let manager = await Manager.findOne({ email });
    if (manager) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new manager
    manager = new Manager({
      name,
      email,
      password: hashedPassword,
    });

    await manager.save();
    res.status(201).json({ message: "Manager created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// routes/managerRoutes.js
const jwt = require("jsonwebtoken");

// Manager Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find manager by email
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
