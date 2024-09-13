const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS for all routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/auth", authRoutes);

// MongoDB connection and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error));
