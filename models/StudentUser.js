var mongoose = require("mongoose");
//var passportLocalMongoose= require("passport-local-mongoose");

var StudentUserSchema = new mongoose.Schema({
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
//StudentUserSchema.plugin(passportLocalMongoose);
module.exports = User =  mongoose.model("User",StudentUserSchema);