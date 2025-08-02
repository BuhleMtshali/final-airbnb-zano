const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ username, email, password, role });

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
