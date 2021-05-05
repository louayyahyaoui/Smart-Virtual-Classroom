const express = require("express");
const router = express.Router();
const { getCourseByCourse ,addCommentCourse,deleteCommentCourse,updateCommentCourse,getCourseBytask} =require('../controllers/CommentCourseController');


//GET ALL ANSWER By Question
router.get('/course/:id',getCourseByCourse);
//GET ALL ANSWER By Question
router.get('/task/:id',getCourseBytask);
//ADD NEW ANSWER
router.post('/add/',addCommentCourse);

//Delte  ANSWER
router.delete('/delete/:id',deleteCommentCourse);
//UPDATE ANSWER
router.put('/update/:id',updateCommentCourse);

module.exports = router;