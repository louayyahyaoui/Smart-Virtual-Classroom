const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/closer",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);
