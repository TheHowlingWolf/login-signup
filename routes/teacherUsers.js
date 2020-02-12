var express = require("express");
const expressLayouts = require("express-ejs-layouts");
var bcrypt = require("bcryptjs");
var router = express.Router();
var passport = require("passport");

router.use(expressLayouts);


//User model
const TeacherUser = require("../models/TeacherUser");
const masterUser = require("../models/masterUser");
router.post("/teacherRegister",(req,res) =>
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
    errors.push({msg:"Please fill in the username."});
    }
    if(!password)
    {
        errors.push({msg:"Please fill in the password."});
    }
    if(!phone_no)
    {
        errors.push({msg:"Please fill in the phone number."});
    }
    if(!student_id)
    {
        errors.push({msg:"Please fill in ward's ID."});
    }
    if(!dob)
    {
        errors.push({msg:"Please fill in date of birth."});
    }
    if(!school)
    {
        errors.push({msg:"Please fill in ward's school name."});
    }
    if(!batch)
    {
        errors.push({msg:"Please fill in ward's batch."});
    }
    if(password.length<=6)
        {
            errors.push({msg:"Password should be at least 6 characters."});

        }
    if(phone_no.length!=10)
    {
        errors.push({msg:"Invlaid phone number."});
    }
    if(errors.length>0)
    {

            res.render("../views/signupTeacher.ejs",{
            layout:"../views/layoutSignUp.ejs",
            errors,
            username: username,
            password: password,
            phone_no: phone_no,
            student_id: student_id,
            dob: dob,
            school: school,
            batch: batch
        }); 
    }else{
        //Validation passed
        ParentUser.findOne({ username: username })
        .then(user => {
            if(user){
            //User exists
            errors.push({msg: "User is already registered."});
            res.render("../views/signupTeacher.ejs",{
            layout:"../views/layoutSignUp.ejs",
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
        const newUser = new TeacherUser({
            username,
            password,
            student_id,
            phone_no,
            dob,
            school,
            batch
        });
            const newMasterUser = new masterUser({
                username,
                password,
                student_id,
                phone_no,
                dob,
                school,
                batch
            });
            //hash password
        //     bcrypt.genSalt(10,(err,salt) =>
        //     bcrypt.hash(newUser.password,salt,(err,hash) =>{
        //        if(err) throw err;
        //        //Set password to hashed
        //        newUser.password = hash;
        //    newUser.save().then((user)=>{
        //        console.log(user);
        //         res.redirect("/dashboard");
        //        console.log("success");
        //    })
        //    .catch((err)=>
        //     console.log(err));
    
            
        // }));
        bcrypt.genSalt(10,(err,salt) =>
            bcrypt.hash(newMasterUser.password,salt,(err,hash) =>{
               if(err) throw err;
               //Set password to hashed
               newMasterUser.password = hash;
           newMasterUser.save().then((user)=>{
               console.log(user);
               res.redirect("/dashboard");
             console.log("success");
           })
           .catch((err)=>
            console.log(err));
            newUser.save();
            
            
    
            
        }));
    }
    
    });
        }
    });

    
    //Login handle
    router.post("/login",(req,res,next) =>
    {
        passport.authenticate("local",{
            successRedirect: "/dashboard",//according to user profile
            failureRedirect: "/usersT/login",
            failureFlash: true
        })(req,res,next);
    });

//Logout Handle
// router.get("/logout",(req,res) =>{
//     req.logout();
//     req.flash(success_msg,"You are logged out.");
//     res.redirect("/users/login");
// });
module.exports = router;