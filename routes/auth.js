const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const {
  validationRegistration,
  validationLogIn,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Registration form
router.post("/registration", async (req, res) => {
  // check if the data in input are correct
  const { error } = validationRegistration(req.body);
  if (error) return res.send(error.details[0].message);

  // check if the mail is already in the DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email already exist");

  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const insertUser = await user.save();
    const userRes = {
      id: user._id,
    };
    res.json(
      `Congratulation, your registration is complete with your id:${userRes.id}`
    );
  } catch (error) {
    res.json({ message: error });
  }
});

//LogIn
router.post("/login", async (req, res) => {
  // check if the data in input are correct
  const { error } = validationLogIn(req.body);
  if (error) return res.send(error.details[0].message);

  // check if the mail of the user is in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Email or Password are wrong");

  // compare the password
  const isMatchPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!isMatchPassword) return res.send("Email or Password are wrong");

  // create and assing token with 1 hour of expiration
  const token = jwt.sign({ user: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });
  res.header("auth-token", token).json({ auth_token: token });

  try {
    res.send("login successfully");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
