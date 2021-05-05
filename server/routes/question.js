const express = require("express");
const router = express.Router();
const {getAllQuestion,addQuestion,uploadFile, getOneQuestion,updateQuestion,deletQuestion,getAnswerAndQuestion,findquestionbyTags,uploads} =require('../controllers/QuestionController');
const multer = require("multer");
///UPLOAD FILE 
const { Storage } = require("@google-cloud/storage");
const perf = require("execution-time")();


// Create new storage instance with Firebase project credentials
const storages = new Storage({
  projectId: "smart-closer",
  keyFilename: "./smart-closer-firebase-adminsdk-75ops-25473d0d1e.json",
});

// Create a bucket associated to Firebase storage bucket
const bucket = storages.bucket("gs://smart-closer.appspot.com");

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 300 * 1024 * 1024, // limiting files size to 5 MB
  },
});

var upload = uploader.array("multiple_resources", 6);

//GET ALL
router.get('/all/',getAllQuestion);
//
router.get('/c/:id',getAnswerAndQuestion);

// GET ONE QUESTION 
router.get('/:id',getOneQuestion);
//ADD NEW QUESTION
router.post('/add/',addQuestion);
//UPLOAD FILE
router.post('/upload/',uploader.array("files", 6),uploads);
//UPDATE QUESTION 
router.put('/update/:id',updateQuestion);
// DELETE QUESTION 
router.delete('/delete/:id',deletQuestion);
// findby hashtag  
router.get('/findTag/:id/:tag',findquestionbyTags);

module.exports = router;