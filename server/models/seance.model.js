const mongoose = require("mongoose");

var seanceSchema = new mongoose.Schema({
  idCour: {
    type: Number,
  },
  titre: {
    type: String,
  },
  description: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
});

mongoose.model("Seance", seanceSchema);
