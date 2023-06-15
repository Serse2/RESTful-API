const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const {
  validationRegistration,
  validationLogIn,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const errors = {
  password: "error-password",
  emailDuplicate: "error-mail-exist",
  emailInvalid: '"email" must be a valid email',
  logInFailed: "Email or Password are wrong",
};

// Registration form
router.post("/registration", async (req, res) => {
  // check if the data in input are correct
  const { error } = validationRegistration(req.body);
  if (error)
    return res.send({
      message: error.details[0].message,
      code: errors.password,
    });

  // check if the mail is already in the DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.send({
      message: "Email already exist",
      code: errors.emailDuplicate,
    });

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
    res.json({
      message: `Congratulation, your registration is complete with your id:${userRes.id}`,
      code: "success",
    });
  } catch (error) {
    res.json({ message: error });
  }
});

//LogIn
router.post("/login", async (req, res) => {
  // check if the data in input are correct
  const { error } = validationLogIn(req.body);
  if (error)
    return res.send({
      message: error.details[0].message,
      code: errors.emailInvalid,
    });

  // check if the mail of the user is in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send({
      message: "Email or Password are wrong",
      code: errors.logInFailed,
    });

  // compare the password
  const isMatchPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!isMatchPassword)
    return res.send({
      message: "Email or Password are wrong",
      code: errors.logInFailed,
    });

  // create and assing token with 1 hour of expiration
  const token = jwt.sign({ user: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  try {
    res.cookie("auth-token", token, {
      maxAge: 9000000000,
      httpOnly: true,
    });
    res.header("auth-token", token);
    // res.header("Set-Cookie", `token=${token}; HttpOnly`);
    res.json({
      auth_token: token,
      message: "login successfully",
      code: "success",
      id: user._id,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
