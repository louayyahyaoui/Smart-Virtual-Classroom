require("./models/db");

const express = require("express");
const bodyparser = require("body-parser");
const SeanceController = require("./routes/SeanceController");

var app = express();

app.listen(5000, () => {
  console.log("Express server started at port  : 5000");
});

app.use("/seance", SeanceController);
