// listRoutes.js
const express = require("express");
const router = express.Router();
const List = require("../models/listModel");

// Create a new list item
router.post("/add", async (req, res) => {
  try {
    const list = new List(req.body);
    await list.save();
    res.status(201).send(list);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Fetch all list items
router.get("/get", async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).send(lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch a single list item by ID
router.get("/get/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).send("List item not found");
    }
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a list item by ID
router.patch("/edit/:id", async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!list) {
      return res.status(404).send("List item not found");
    }
    res.status(200).send(list);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a list item by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) {
      return res.status(404).send("List item not found");
    }
    res.status(200).send("List item deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
