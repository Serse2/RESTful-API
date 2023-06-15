// schema dei dati
const express = require("express");
const router = express.Router();
const List = require("../models/listModel");
const verify = require("../Utils/verifyToken");

// get the list of item
// insert verify to protect the router
router.get("/lists", async (req, res) => {
  try {
    const result = await List.find();
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// intert a new list
router.post("/crate-lists", async (req, res) => {
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

// search all list from a user id
router.get("/lists/:_id", verify, async (req, res) => {
  try {
    const singleList = await List.find({ userId: req.params._id });
    console.log(typeof singleList);
    if (singleList.length === 0) {
      return res.json({ message: "list not found" });
    }
    res.json(singleList);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete
router.delete("/lists/:_id", async (req, res) => {
  try {
    const deleteItem = await List.deleteOne({ _id: req.params._id });
    res.json(deleteItem);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
