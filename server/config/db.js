const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://omar:24551966@smart-virtual-classroom.i0bdn.mongodb.net/closer?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);

require("../models/seance.model");
