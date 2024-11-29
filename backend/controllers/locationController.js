const Location = require("../models/locationModel");

// Update Location
exports.updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;
  const guardId = req.user.id; // Assuming JWT middleware assigns user ID

  const location = new Location({ guardId, latitude, longitude });
  await location.save();
  res.status(201).json({ message: "Location updated" });
};

// Get All Locations
exports.getLocations = async (req, res) => {
  const locations = await Location.find().populate("guardId", "name");
  res.json(locations);
};
