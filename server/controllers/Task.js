const Grade = require("../models/Grade.js");
const Task = require("../models/Task.js");

module.exports = {
  uploadFile: (req, res, next) => {
    console.log(req.files);
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    if (req.files) {
      for (var i = 0; i < req.files.length; i++) {
        reqFiles.push("http://localhost:5000/uploads/file/" + req.files[i].filename);
      }
    }

    res.status(201).json(reqFiles);
  },
  getStatOfTaskRemis: (req, res, next) => {
    try {
      Grade.aggregate([
        {
          $match: {
            taskStatus: {
              $eq: "remis",
            },
          },
        },
        {
          $count: "count",
        },
      ]).then((grade) => res.json(grade));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getStatOfTaskMissing: (req, res, next) => {
    try {
      Grade.aggregate([
        {
          $match: {
            taskStatus: {
              $eq: "missing",
            },
          },
        },
        {
          $count: "count",
        },
      ]).then((grade) => res.json(grade));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getDetailTaskStudens: (req, res, next) => {
    try {
      Grade.find({ task: req.params.id })

        .populate("student")

        .then((grade) => res.json(grade));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getDetailTaskByStudent: (req, res, next) => {
    try {

      Grade.find({ _id: req.params.id })
      .populate("task")
        .then((grade) => res.json(grade));

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getTaskByTeacher: (req, res, next) => {
    try {
      Task.find({ creator: req.params.id }).then((task) => res.json(task));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getOneTask: (req, res, next) => {
    try {
      Task.findById(req.params.id).then((task) => res.json(task));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getTask: (req, res, next) => {
    try {
      Task.find().then((task) => res.json(task));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  assignTaskAfterSave: (req, res) => {
    const task = req.body;
    //task.status = 'assign';

    try {
      task.listStudents.forEach((element) => {
        const newgrade = new Grade({
          task: task._id,
          student: element.id,
        });
        newgrade.save();
      });

      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateTaskStatus: (req, res) => {
    const task = req.body;
    task.status = "assign";
    const newTask = new Task(task);

    try {
      Task.findByIdAndUpdate(req.params.id, newTask, {
        useFindAndModify: false,
      }).then((task) => res.json(task));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  assignTask: (req, res) => {
    const task = req.body;
    task.status = "assign";
    const newTask = new Task(task);

    try {
      newTask.save();
      task.listStudents.forEach((element) => {
        const newgrade = new Grade({
          task: newTask._id,
          student: element._id,
        });
        newgrade.save();
      });

      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  addTask: (req, res) => {
    const task = req.body;
    task.status = "not assign";
    const newTask = new Task(task);

    try {
      newTask.save();

      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateTask: (req, res) => {
    const newTask = new Task(req.body);

    try {
      Task.findByIdAndUpdate(req.params.id, newTask, {
        useFindAndModify: false,
      }).then((task) => res.json(task));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteTask: (req, res) => {
    try {
      Task.findByIdAndDelete(req.params.id);
      res.status(202);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
