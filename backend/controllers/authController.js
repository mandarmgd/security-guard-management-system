const Manager = require("../models/managerModel");
const Guard = require("../models/guardModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Manager Signup
exports.signupManager = async (req, res) => {
  const { username, email, password, company, uniqueSentence } = req.body;
  // Hash password, save manager, send JWT, etc.
};

// Manager Login
exports.loginManager = async (req, res) => {
  const { username, password } = req.body;
  // Check manager credentials, send JWT, etc.
};

// Guard Login
exports.loginGuard = async (req, res) => {
  const { email, pin } = req.body;
  // Check guard credentials, send JWT, etc.
};
