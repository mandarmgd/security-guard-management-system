const Guard = require("../models/guardModel");

// Create Guard
exports.createGuard = async (req, res) => {
  const { name, email, pin } = req.body;
  // Create guard logic
};

// Get all Guards
exports.getAllGuards = async (req, res) => {
  const guards = await Guard.find();
  res.json(guards);
};
