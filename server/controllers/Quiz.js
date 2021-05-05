const Quiz = require('../models/Quiz.js');

module.exports = {  
    
    
    getQuiz : (req,res,next) =>{
    try {
        Quiz.find().then((Quiz)=>res.json(Quiz));
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
},

  addQuiz : (req,res) =>{

    const quiz = req.body;
    const newQuiz = new Quiz(quiz);
   try {
      newQuiz.save();
     res.status(201).json(newQuiz);

   } catch (error) {
       res.status(400).json({message : error.message});
   }


},
 updateQuiz : (req,res) =>{
    res.send('update work!!!');
},

 deleteQuiz : (req,res) =>{
    res.send('delete work!!!');
}

}