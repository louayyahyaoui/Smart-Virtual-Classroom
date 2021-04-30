const express  = require ('express');
const router = express.Router();

const {getTaskByStudent,rendreTask,addGrade,assignGradeToStudent,getListQuestionByTask,getDetailByTaskByStudent} = require ('../controllers/Grade.js')


router.get('/DetailByTaskByStudent/:id',getDetailByTaskByStudent);
router.get('/listQuestion/:id',getListQuestionByTask);
router.get('/',getTaskByStudent);
router.put('/',assignGradeToStudent);
router.put('/rendreTask/',rendreTask);
router.post('/',addGrade);

 module.exports = router;