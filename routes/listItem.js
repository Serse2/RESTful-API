// schema dei dati
const express = require("express");
const router = express.Router();
const Item = require("../models/ItemModel");

// get the list of item
router.get("/items", async (req, res) => {
  try {
    const result = await Item.find();
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// intert a new item
router.post("/items", async (req, res) => {
  const item = new Item({
    name: req.body.name,
  });

  try {
    const insertItem = await item.save();
    res.json(insertItem);
  } catch (error) {
    res.json({ message: error });
  }
});

// search for a specific item name
router.get("/items/:name", async (req, res) => {
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
router.delete("/items/:name", async (req, res) => {
  try {
    const deleteItem = await Item.deleteOne({ name: req.params.name });
    res.json(deleteItem);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
