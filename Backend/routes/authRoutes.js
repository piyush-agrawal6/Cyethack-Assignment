const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { register, login, logout } = require("../controllers/authControllers");

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);

module.exports = authRoutes;
