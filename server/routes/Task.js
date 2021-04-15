const express  = require ('express');
const router = express.Router();
multer = require("multer");
const DIR = "./uploads/file";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "video/ogg" ||
        file.mimetype == "video/mp4" ||
        file.mimetype == "video/mp4" ||
        file.mimetype == "video/x-matroska" ||
        file.mimetype == "audio/wav" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "audio/mpeg" ||
        file.mimetype == "application/pdf" ||
        file.mimetype == "application/doc" ||
        file.mimetype == "application/msword" ||
        file.mimetype == "application/javascript" ||
        file.mimetype == "application/json" ||
        file.mimetype == "application/vnd.ms-powerpoint" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.mimetype == "application/x-rar-compressed" ||
        file.mimetype == "application/xlsx" ||
        file.mimetype == "application/xls"
      ) {
      }
      cb(null, true);
    },
  });
const {getOneTask,
    uploadFile,
    
    getDetailTaskByStudent,
    getTask,addTask,updateTask,deleteTask ,updateTaskStatus, getTaskByTeacher,assignTask,getDetailTaskStudens ,getStatOfTaskRemis,assignTaskAfterSave, getStatOfTaskMissing} = require ('../controllers/Task.js')

//router.get('/:id',getOneTask);
router.post('/uploadFile',  upload.array("listQuestion", 6),uploadFile);
router.get('/StatTaskMissing/:id',getStatOfTaskMissing);
router.get('/StatTaskRemis/:id',getStatOfTaskRemis);
router.get('/DetailTask/:id',getDetailTaskStudens);
router.get('/DetailTaskByStudent/:id',getDetailTaskByStudent);
router.get('/:id',getTaskByTeacher);
router.get('/',getTask);
router.post('/',addTask);
router.post('/assignAfterSave',assignTaskAfterSave);
router.post('/assign',assignTask);
router.put('/:id',updateTask);
router.put('/taskStatus/:id',updateTaskStatus);
router.delete('/:id',deleteTask);
 module.exports = router;
