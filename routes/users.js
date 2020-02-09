var express = require("express");
const expressLayouts = require("express-ejs-layouts");
var bcrypt = require("bcryptjs");
var router = express.Router();
var passport = require("passport");

router.use(expressLayouts);


//User model
const User = require("../models/StudentUser");

router.post("/studentRegister",(req,res) =>
{
    
    const username= req.body.inputUserName;
    const password= req.body.inputPassword3;
    const student_id= req.body.inputStudentID;
    const phone_no= req.body.InputPhoneNo;
     const dob= req.body.inputDob;
     const school= req.body.inputSchoolName;
     const batch = req.body.inputBatchName;

    let errors = [];
    if(!username){// || !req.body.inputPassword3|| !req.body.phone_no|| !req.body.student_id || !req.body.dob || !req.body.school || !req.body.batch){
    errors.push({msg:"Please fill in all fields."});
    }
    if(!password)
    {
        errors.push({msg:"password"});
    }
    if(!phone_no)
    {
        errors.push({msg:"phoneno"});
    }
    if(!student_id)
    {
        errors.push({msg:"id"});
    }
    if(!dob)
    {
        errors.push({msg:"dob"});
    }
    if(!school)
    {
        errors.push({msg:"school"});
    }
    if(!batch)
    {
        errors.push({msg:"batch"});
    }
    if(errors.length>0)
    {

            res.render("../views/signUpStudent.ejs",{
            errors,
            username: username,
            password: password,
            phone_no: phone_no,
            student_id: student_id,
            dob: dob,
            school: school,
            batch: batch
        }); 
    }
    else{
        const newUser = new User({
            username,
            password,
            student_id,
            phone_no,
            dob,
            school,
            batch
        });
        
       newUser.save().then((user)=>{
           console.log(user);
            res.redirect("/dashboard");
           console.log("success");
       })
       .catch((err)=>{
        console.log(err);
       });

        
    }


});

module.exports = router;