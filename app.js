// express service
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const routerList = require("./routes/listItem");
const routerAuth = require("./routes/auth");
require("dotenv/config");

// connect to mongo db Atlas
const mongoose = require("mongoose");
const db = mongoose
  .connect(process.env.URL_DB, {
    dbName: process.env.NAME_DB,
    user: process.env.USER_DB,
    pass: process.env.PASSWORD_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"));

//middelware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// far consumare le rotte al server
app.use("/api", routerList);
app.use("/api", routerAuth);

app.get("/", (req, res) => {
  res.send("welcome to my app");
});

app.listen(port, () => {
  console.log(`server listen on port ${port}, go on http://localhost:${port}`);
});
