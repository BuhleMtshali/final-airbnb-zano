const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Reservation routes are working!");
});

module.exports = router;
