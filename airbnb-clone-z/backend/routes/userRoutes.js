const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);

const protect = require("../middleware/auth");

router.get("/profile", protect, (req, res) => {
  res.send("You are authenticated 🎉");
});


module.exports = router;
