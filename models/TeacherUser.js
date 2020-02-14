var mongoose = require("mongoose");
//var passportLocalMongoose= require("passport-local-mongoose");

var TeacherUserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    

    },
    password:{
        type: String,
        required: true

    },
    student_id:{
        type:String,
        required:true,
    },
    phone_no:{
        type: String,
        required: true,
        unique:true

    },
    dob:{
        type: Date,
        default: Date.now

    },
    school:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    }
});
//TeacherUserSchema.plugin(passportLocalMongoose);
module.exports = TeacherUser =  mongoose.model("TeacherUser",TeacherUserSchema);