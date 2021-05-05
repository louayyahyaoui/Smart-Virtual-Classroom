const mongoose = require("mongoose");

var coursesSchema = new mongoose.Schema({
  idOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  idSeance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seance",
  },
  idClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
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
  multiple_resources: {
    type: [],
  },
});

const courses = mongoose.model("courses", coursesSchema, "courses");
module.exports = courses;
