const express = require("express");
const router = express.Router();
//const auth = require('../middleware/auth');
const { loginUser, registerUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);
//router.post('/reservations', auth, createReservation);

const protect = require("../middleware/auth");

router.get("/profile", protect, (req, res) => {
  res.send("You are authenticated 🎉");
});




module.exports = router;
