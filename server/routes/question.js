const express = require("express");
const router = express.Router();
const {getAllQuestion,addQuestion,uploadFile, getOneQuestion,updateQuestion,deletQuestion,getAnswerAndQuestion,findquestionbyTags} =require('../controllers/QuestionController');

//GET ALL
router.get('/all/',getAllQuestion);
//
router.get('/c/:id',getAnswerAndQuestion);

// GET ONE QUESTION 
router.get('/:id',getOneQuestion);
//ADD NEW QUESTION
router.post('/add/',addQuestion);
//UPLOAD FILE
router.post('/upload/',uploadFile);
//UPDATE QUESTION 
router.put('/update/:id',updateQuestion);
// DELETE QUESTION 
router.delete('/delete/:id',deletQuestion);
// findby hashtag  
router.get('/tags/:tag',findquestionbyTags);

module.exports = router;