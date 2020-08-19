// create a middleware to verify the token from the user
var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // take the token from the header
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("access denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Something was wrong");
  }
};

module.exports = verifyToken;
