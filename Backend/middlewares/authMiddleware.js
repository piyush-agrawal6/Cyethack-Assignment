const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token, "token");

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const userObject = user.toObject();

    req.user = {
      id: userObject._id,
      email: userObject.email,
      name: userObject.name,
    };
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
