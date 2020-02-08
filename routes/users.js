var express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
var passport = require("passport");

//User model
var User = require("../models/StudentUser.js");
router.post("/studentRegister",(req,res) =>
{
    // const {username,password,phone_no,student_id,dob,school,batch }= req.body;
    console.log(req.body);
    let errors = [];
    if(!req.body.inputUserName){// || !req.body.inputPassword3|| !req.body.inputPhoneNo|| !req.body.inputStudentID || !req.body.inputDob || !req.body.inputSchoolName || !req.body.inputBatchName){
    errors.push({msg:"Please fill in all fields."});
    }
    if(!req.body.inputPassword3)
    {
        errors.push({msg:"password"});
    }
    if(!req.body.inputPhoneNo)
    {
        errors.push({msg:"phoneno"});
    }
    if(!req.body.inputStudentID)
    {
        errors.push({msg:"id"});
    }
    if(!req.body.inputDob)
    {
        errors.push({msg:"dob"});
    }
    if(!req.body.inputSchoolName)
    {
        errors.push({msg:"school"});
    }
    if(!req.body.inputBatchName)
    {
        errors.push({msg:"batch"});
    }
    if(errors.length>0)
    {
        res.render("../views/signupStudent.ejs",{
            errors,
            inputUserName: req.body.inputUserName,
            inputPassword3: req.body.inputPassword3,
            inputPhoneNo: req.body.inputPhoneNo,
            inputStudentID: req.body.inputStudentID,
            inputDob: req.body.inputDob,
            inputSchoolName: req.body.inputSchoolName,
            inputBatchName: req.body.inputBatchName
        });
    }
    else{
        var newUser = {
            inputUserName: req.body.inputUserName,
            inputPassword3: req.body.inputPassword3,
            inputPhoneNo: req.body.inputPhoneNo,
            inputStudentID: req.body.inputStudentID,
            inputDob: req.body.inputDob,
            inputSchoolName: req.body.inputSchoolName,
            inputBatchName: req.body.inputBatchName
            
        };
       newUser.save(function(err)
       {
           if(err){
               console.log(err);
           }
           else
           {
            res.redirect("../views/dashboard.ejs");
           console.log("success");
           }
       });

        
    }


});

module.exports = router;