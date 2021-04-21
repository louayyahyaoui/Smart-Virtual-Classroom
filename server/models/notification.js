const mongoose = require("mongoose");
var dateFormat = require("dateformat");
var Schema = mongoose.Schema;
var now = new Date();

var Notification = new Schema({
  Question: { type: Schema.Types.ObjectId, ref: "question", default: null },
  Course: { type: Schema.Types.ObjectId, ref: "courses", default: null },
  Task: { type: Schema.Types.ObjectId, ref: "tasks", default: null },
  Message: { type: String },
  Date: { type: Date, default: Date.now() },
  Owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  status: { type: Boolean, default: false },
});
module.exports = mongoose.model("notification", Notification);
