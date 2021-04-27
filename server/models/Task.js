const mongoose = require('mongoose');

const TaskSchema =  mongoose.Schema({


    title : {
        type : String,
        required : true
    
    },
    typeTask : {
        type : String,
        required : true
    
    },
    description : {
        type : String,
        required : false
    
    },
   
       
    theme : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seance",
    },
    cour : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    status : { 
        type: String,
        required : true

    },
   

         
    DateAt : { 
        type : Date,
        default : Date.now()
    
    },
    endDate : {
        type : Date,
        required : false
    
    },
    listQuestion : {
        type : [],
       
    },
    
    listStudents : {
        type : [Object],
       

    },
    
    creator :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
       
    }
    
     
   
});

module.exports = mongoose.model('Task', TaskSchema);

