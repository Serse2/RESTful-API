const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { validationRegistration } = require("../validation/validation");

// Registration form
router.post("/registration", async (req, res) => {
  // check if the data in input are correct
  const { error } = validationRegistration(req.body);
  if (error) return res.send(error.details[0].message);

  // check if the mail is already in the DB
  const emailExist = User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email already exist");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const insertUser = await user.save();
    res.json(insertUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
