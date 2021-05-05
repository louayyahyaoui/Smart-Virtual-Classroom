const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    question : {
        type : String,
        
    },
    optionA :{
        type: String,
       
    },
    optionB :{
        type: String,
       
    },
    optionC :{
        type: String,
       
    },
    optionD :{
        type: String,
       
    },
    correct_answer :{
        type: [String],
     
    }

})
module.exports = mongoose.model('Quiz', QuizSchema);