const express = require("express");
const listRoutes = express.Router();
const List = require("../models/listModel");

// Create an list item
listRoutes.post("/", async (req, res) => {
  try {
    const newList = new List(req.body);
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = listRoutes;
