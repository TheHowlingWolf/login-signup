var express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
var passport = require("passport");

//User model
var User = require("../models/StudentUser.js");
router.post("/studentRegister",(req,res) =>
{
    // const {username,password,phone_no,student_id,dob,school,batch }= req.body;
    let errors = [];
    if(!req.body.student_id || !req.body.username || !req.body.password || !req.body.phone_no || !req.body.dob || !req.body.school || !req.body.batch ){
    errors.push({msg:"Please fill in all fields."});
    }
    if(errors.length>0)
    {
        res.render("../views/signupStudent.ejs",{
            errors,
            username: req.body.username,
            password: req.body.password,
            phone_no: req.body.phone_no,
            student_id: req.body.student_id,
            dob: req.body.dob,
            school: req.body.school,
            batch: req.body.batch
        });
    }
    else{
        var newUser = {
            username: req.body.username,
            password: req.body.password,
            phone_no: req.body.phone_no,
            student_id: req.body.student_id,
            dob:req.body.dob,
            school:req.body.school,
            batch:req.body.batch
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