const mongoose = require("mongoose");
var dateFormat = require("dateformat");
var answer = require("../models/answer");
var Schema = mongoose.Schema;
var now = new Date();

var Question = new Schema({
  Title: { type: String },
  Body: { type: String },
  Hashtags: { type: Array, default: null },
  Question_Answer: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: answer,
    default: null,
  },
  Writerq: { type: Schema.Types.ObjectId, ref: "User" },
  Date: { type: Date, default: Date.now() },
  Filee: { type: Array, default: null },
  Class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },
});
module.exports = mongoose.model("question", Question);
