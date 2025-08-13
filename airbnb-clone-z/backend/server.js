const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS config
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Function to safely load routes
const safeRoute = (path, routeFile) => {
  try {
    console.log(`🔄 Loading route: ${routeFile} at path: ${path}`);
    app.use(path, require(routeFile));
    console.log(`✅ Loaded route: ${routeFile}`);
  } catch (err) {
    console.error(`❌ Failed to load route: ${routeFile}`);
    console.error(err);
  }
};

// Load routes one by one so we can see which one fails
safeRoute("/api/users", "./routes/userRoutes");
safeRoute("/api/accommodations", "./routes/accommodationRoutes");
safeRoute("/api/reservations", "./routes/reservationRoutes");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.log("❌ MongoDB connection error:", err));
