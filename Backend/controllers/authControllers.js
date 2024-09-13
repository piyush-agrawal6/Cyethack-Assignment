const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = createToken(user);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Login successful", token });
};

exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};
