const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InvitationClassSchema = new Schema({
    status : {
        type : String
    },
    classOb :{
        type: Schema.Types.ObjectId,
        ref : 'Class'
    },
    userOb :{
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
})
module.exports = mongoose.model('InvitationClass', InvitationClassSchema);