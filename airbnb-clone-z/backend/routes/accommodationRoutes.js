const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("✅Accommodation routes are working!");
});

module.exports = router;
