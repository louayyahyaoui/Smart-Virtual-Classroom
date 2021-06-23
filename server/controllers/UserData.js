const mongoose = require("mongoose");

var UserDataSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  formation: {
    type: [Object],
    
  },
  experiences: {
    type: [Object],
  
  },
  skills: {
    type: [String],
  },
  langues: {
    type: [Object],
  },
  projects: {
    type: [Object],
  },
  interets: {
    type: [String],
  },
  benevole: {
    type: [Object],
  },
  autre: {
    type: [Object],
  },
}
{
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", UserDataSchema, "UserData");
module.exports = UserData;
