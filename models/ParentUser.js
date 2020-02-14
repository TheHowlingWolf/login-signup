var mongoose = require("mongoose");
//var passportLocalMongoose= require("passport-local-mongoose");

var ParentUserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true

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
//ParentUserSchema.plugin(passportLocalMongoose);
module.exports = ParentUser =  mongoose.model("ParentUser",ParentUserSchema);