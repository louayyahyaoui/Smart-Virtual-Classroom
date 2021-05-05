const SchedulerModel = require("../models/Scheduler.js");

module.exports = {
  getScheduler: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await SchedulerModel.find({}).populate("postOwner")
        );
    } catch (error) {
      res.status(404).json({ statue: false, message: error.message });
    }
  },
  addScheduler: async (req, res) => {
    const newScheduler = new SchedulerModel(req.body);
    try {
      const data = await newScheduler.save();
      res.status(201).json({
        statue: true,
        message: "Scheduler Added Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  updateScheduler: async (req, res) => {
    try {
      const updateScheduler = new SchedulerModel(req.body);
      const data = await SchedulerModel.findByIdAndUpdate(
        req.params.id,
        updateScheduler
      );
      res.status(201).json({
        statue: true,
        message: " Scheduler Updated Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },

  deleteScheduler: async (req, res) => {
    try {
      const data = await SchedulerModel.findByIdAndRemove(req.params.id);
      res.status(201).json({
        statue: true,
        message: "Scheduler Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
  deleteAllScheduler: async (req, res) => {
    try {
      const data = await SchedulerModel.remove({});
      res.status(201).json({
        statue: true,
        message: "Scheduler Deleted Succefully",
        result: data,
      });
    } catch (error) {
      res.status(400).json({ statue: false, message: error.message });
    }
  },
};
