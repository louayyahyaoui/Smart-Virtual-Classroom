const mongoose = require("mongoose");
var dateFormat = require("dateformat");
var Schema = mongoose.Schema;
var now = new Date();

var CommentCourse = new Schema({
  Course: { type: Schema.Types.ObjectId, ref: "courses", default: null },
  Task: { type: Schema.Types.ObjectId, ref: "tasks", default: null },
  Body: { type: String, required: [true, "Answer Body required"] },
  Writer: { type: Schema.Types.ObjectId, ref: "User" },
  Date: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("CommentCourses", CommentCourse);
