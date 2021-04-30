const Grade = require("../models/Grade.js");
const Task = require("../models/Task.js");


module.exports = {
 
  getStatOfTaskRemis: (req, res, next) => {
  
    try {
      Grade.aggregate([
        {
          $match: {
            taskStatus: {
              $eq: "remis",
            }
        
        },
        },
        {
        $group:
     {
      _id : "$task",
      task : {
        _id : $req.params.id

      }
      }
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
            task: {
              $eq: req.params.id,
            },
            taskStatus: {
              $eq: "missing",
            },
          
          },
        },
        {
          $group:
      {
        _id : "$task"
        }
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
      .populate("task")
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

     // console.log(req.query.idClass);
      Task.find({creator : req.query.idUser,cour :req.query.idClass }).then((task) => res.json(task));
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
    task.status = "assign";
    task.dateAt = Date.now();
    const newTask = new Task(task);

    try {
      task.listStudents.forEach((element) => {
        const newgrade = new Grade({
          task: task._id,
          student: element._id,
        });
        newgrade.save();
      });
  
      Task.findByIdAndUpdate(task._id, newTask, {
        useFindAndModify: false,
      }).then((task) => 
      
      Task.findOne({_id:task._id }).then((task) => res.json(task))
      );
     
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
      }).then((task) => res.json(task));

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
    
      Task.findByIdAndDelete({_id : req.params.id}).then((task)=>   res.json(task));
    
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
