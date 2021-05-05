const InvitationClassModel = require("../models/InvitationClass.js");
const mongoose = require("mongoose");
module.exports = {
  getInvitationByUserClass: async (req, res) => {
    try {
      res.status(200).json(
        await InvitationClassModel.find({
          userOb: mongoose.Types.ObjectId(req.params.id),
        })
          .populate({
            path: "classOb",
            populate: { path: "classOwner", model: "User" },
          })
          .populate("userOb")
          .populate({
            path: "classOb",
            populate: { path: "classUsers", model: "User" },
          })
      );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  getInvitationByClassid: async (req, res) => {
    try {
      res.status(200).json(
        await InvitationClassModel.find({
         classOb: mongoose.Types.ObjectId(req.params.id),
        })
          .populate({
            path: "classOb",
            populate: { path: "classOwner", model: "User" },
          })
          .populate("userOb")
          .populate({
            path: "classOb",
            populate: { path: "classUsers", model: "User" },
          })
      );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  addInvitationClass: async (req, res) => {
    const newInvitationClass = new InvitationClassModel(req.body);
    try {
      const data = await newInvitationClass.save();
      res.status(201).json({
        statue: true,
        message: "InvitationClass Added Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  updateInvitationClass: async (req, res) => {
    try {
      const updateInvitationClass = new InvitationClassModel(req.body);
      const data = await InvitationClassModel.findByIdAndUpdate(
        req.params.id,
        updateInvitationClass
      );
      res.status(201).json({
        statue: true,
        message: " InvitationClass Updated Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },

  deleteInvitationClass: async (req, res) => {
    try {
      const data = await InvitationClassModel.findByIdAndRemove(req.params.id);
      res.status(201).json({
        statue: true,
        message: "InvitationClass Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  deleteAllInvitationClass: async (req, res) => {
    try {
      const data = await InvitationClassModel.remove({});
      res.status(201).json({
        statue: true,
        message: "InvitationClass Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  CountRequestClass: async (req, res) => {
    try {
      const dataFind = await InvitationClassModel.aggregate([
        {
          $match: {
            userOb: {
              $in: [mongoose.Types.ObjectId(req.params.id)],
            },
          },
        },
        {
          $count: "request_class",
        },
      ]);
      res.status(201).json(dataFind);
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
};
