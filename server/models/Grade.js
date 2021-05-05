const mongoose = require('mongoose');


const GradeSchema = mongoose.Schema({

    grade : {
        type : Number,
        default : null
    },
    taskStatus : {
        type : String,
        default : 'Attribué'
    },
    student :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
   
    task :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    },
    listReponse :{
        type: [],
    
    }

})
module.exports = mongoose.model('Grade', GradeSchema);
