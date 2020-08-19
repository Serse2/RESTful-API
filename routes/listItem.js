// schema dei dati
const express = require("express");
const router = express.Router();
const List = require("../models/listModel");
const verify = require("../Utils/verifyToken");

// get the list of item
router.get("/lists", verify, async (req, res) => {
  try {
    const result = await List.find();
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// intert a new list
router.post("/lists", async (req, res) => {
  const list = new List({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    items: req.body.items,
  });

  try {
    const insertList = await list.save();
    res.json(insertList);
  } catch (error) {
    res.json({ message: error });
  }
});

// search for a specific item name
router.get("/lists/:title", async (req, res) => {
  try {
    const singleItem = await Item.find({ name: req.params.name });
    if (singleItem === []) {
      res.json({ message: "item not found" });
    }
    res.json(singleItem);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete
router.delete("/lists/:title", async (req, res) => {
  try {
    const deleteItem = await Item.deleteOne({ name: req.params.name });
    res.json(deleteItem);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
