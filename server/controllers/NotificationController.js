var Notification = require("../models/notification");

const mongoose = require("mongoose");
module.exports = {
  getnotification: async (req, res, next) => {
    try {
      const id = req.params.id;
      const notifications = await Notification.find({
        Owner: {
          $in: [mongoose.Types.ObjectId(req.params.id)],
        },
      }).sort({ Date: -1 });

      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

  addnotification: async (req, res) => {
    const notif = req.body;
    const newNotification = new Notification(notif);

    try {
      const result = await newNotification.save();
      res.status(201).json(result);
    } catch (error) {
      return "res.status(400).json({ status: 400, message: error.message });";
    }
  },
  deletenotification: async (req, res) => {
    try {
      const { id } = req.params;
      Notification.findOneAndDelete({ _id: id }, function (err) {
        if (err) console.log(err);
        return res
          .status(205)
          .json({ status: 205, message: "Successful deletion" });
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
  updatenotification: async (req, res) => {
    try {
      const { id } = req.params;

      Notification.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        { status: true },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(201).json(result);
          }
        }
      );
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
};
