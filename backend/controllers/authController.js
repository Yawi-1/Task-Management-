const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const generateToken = (userId, email) => {
  return jwt.sign({ _id:userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id, user.email);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error at sign up controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid  password" });
    }
    const token = generateToken(user._id, user.email);
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, name: user.name, email: user.email, token: token },
    });
  } catch (error) {
    console.error("Error at login controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
