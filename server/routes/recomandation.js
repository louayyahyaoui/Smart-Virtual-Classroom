const express = require("express");
const { getAllRecomandationCourse } = require("../controllers/Recomandation");
const router = express.Router();


//GET ALL ANSWER By Question
router.get('/recomandedcourse/:id',getAllRecomandationCourse);
module.exports = router;