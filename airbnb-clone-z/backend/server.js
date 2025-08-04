const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔐 CORS fix
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/accommodations", require("./routes/accommodationRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log("✅ Server running on port 5000"));
}).catch(err => console.log(err));
