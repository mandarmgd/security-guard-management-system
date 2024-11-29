const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const guardRoutes = require("./routes/guardRoutes");
const locationRoutes = require("./routes/locationRoutes");
const managerRoutes = require("./routes/guardRoutes");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/guards", guardRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/managers", managerRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
