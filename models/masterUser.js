var mongoose = require("mongoose");
var passportLocalMongoose= require("passport-local-mongoose");

var MasterUserSchema = new mongoose.Schema({
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
MasterUserSchema.plugin(passportLocalMongoose);
module.exports = MasterUser =  mongoose.model("MasterUser",MasterUserSchema);