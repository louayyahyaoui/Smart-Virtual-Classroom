const express = require("express");
const router = express.Router();
const {getAnswerByQuestion,getAnswerByWriter, addAnswer,deletAnswer,updateAnswer} =require('../controllers/AnswerController');


//GET ALL ANSWER By Question
router.get('/q/:id',getAnswerByQuestion);
// GET ONE ANSWER By WRITER 
router.get('/u/:id',getAnswerByWriter);
//ADD NEW ANSWER
router.post('/add/',addAnswer);
//Delte  ANSWER
router.delete('/delete/:id',deletAnswer);
//UPDATE ANSWER
router.put('/update/:id',updateAnswer);

module.exports = router;