const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Proper CORS config
app.use(cors({
  origin: "http://localhost:3000", // your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accommodations", require("./routes/accommodationRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
