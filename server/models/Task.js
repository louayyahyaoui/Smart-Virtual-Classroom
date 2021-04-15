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
   
       
    theme : { // cours id here
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seance",
    },
    status : { 
        type: String,
        required : true

    },
   

         
    DateAt : { type : Date,
        default : new Date()
    
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

