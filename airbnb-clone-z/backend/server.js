const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Super explicit CORS config
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // frontend URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accommodations", require("./routes/accommodationRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

app.get("/", (req, res) => res.send("🚀 Backend running fine!"));

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server on http://localhost:5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
