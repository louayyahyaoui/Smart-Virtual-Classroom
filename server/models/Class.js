const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
    className : {
        type : String,
    },
    classDescription : {
        type : String
    },
    classSection : {
        type : String
    },
    classDatePost : {
        type : Date , default : Date.now()
    },
    classLevel : {
        type : Number
    },
    classStatus : {
        type : String , default : "Active"
    },
    classColor : {
        type : String 
    },
    classOwner :{
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    classUsers :[{
        type: Schema.Types.ObjectId,
        ref : 'User'
    }],
})
module.exports = mongoose.model('Class', ClassSchema);