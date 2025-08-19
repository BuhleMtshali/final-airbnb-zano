const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS fix
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accommodations", require("./routes/accommodationRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running fine!");
});

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop process if DB fails
  });
