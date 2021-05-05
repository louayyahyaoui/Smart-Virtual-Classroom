const express  = require ('express');
const router = express.Router();

const {getOneTask,
    getStatOfTaskAttribue,
    
    getDetailTaskByStudent,
    getTask,addTask,updateTask,deleteTask ,updateTaskStatus, getTaskByTeacher,assignTask,getDetailTaskStudens ,getStatOfTaskRemis,assignTaskAfterSave, getStatOfTaskMissing, uploads} = require ('../controllers/Task.js')

//router.get('/:id',getOneTask);

router.get('/StatTaskAttribue',getStatOfTaskAttribue);
router.get('/StatTaskMissing/:id',getStatOfTaskMissing);
router.get('/StatTaskRemis/:id',getStatOfTaskRemis);
router.get('/DetailTask/:id',getDetailTaskStudens);
router.get('/DetailTaskByStudent/:id',getDetailTaskByStudent);
router.get('/teacher',getTaskByTeacher);
router.get('/',getTask);
router.post('/',addTask);
router.post('/assignAfterSave',assignTaskAfterSave);
router.post('/assign',assignTask);
router.put('/:id',updateTask);
router.put('/taskStatus/:id',updateTaskStatus);
router.delete('/deleteTask/:id',deleteTask);
 module.exports = router;
