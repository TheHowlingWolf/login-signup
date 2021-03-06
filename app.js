var express = require("express");
const expressLayouts = require("express-ejs-layouts");
var mongoose=require("mongoose");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
const {ensureAuthenticated} = require('./config/auth');
var app = express();


//Bodyparser
app.use(express.urlencoded({extended: false}));
mongoose.connect('mongodb+srv://dbUser:dbUser@mern-mga4p.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected.."))
.catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine","ejs");
app.use(express.static(__dirname+"/dashboard"));
app.get("/",function(req,res)
{
    res.render("../views/homepage",{layout:"layoutHomepage"});
});
app.get("/users/studentRegister",function(req,res)
{
    res.render("../views/signUpStudent",{layout:"layoutSignUp"});
});
app.get("/usersP/parentRegister",function(req,res)
{
    res.render("../views/signupParent",{layout:"layoutSignUp"});
});
app.get("/usersT/teacherRegister",function(req,res)
{
    res.render("../views/signupTeacher",{layout:"layoutSignUp"});
});
app.get("/users/login",function(req,res)
{
    res.render("../views/login",{layout:"layoutLogin"});
});
app.get("/usersP/login",function(req,res)
{
    res.render("../views/loginParent",{layout:"layoutLogin"});
});
app.get("/usersT/login",function(req,res)
{
    res.render("../views/loginTeacher",{layout:"layoutLogin"});
});

//Bodyparser
app.use(express.urlencoded({extended: false}));

//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    
}));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passportStudent.js")(passport);
// require("./config/passportParent.js")(passport);
// require("./config/passportTeacher.js")(passport);

//Connect flash
app.use(flash());

app.get('/dashboard', ensureAuthenticated ,(req,res)=>{
    console.log(req.user.username);
    res.render('dashboard',{
        layout:"layoutStudent",
        Fname:req.user.username
    });
});
  //Global variables
  app.use(function(req,res,next) {
    //res.locals.success_msg = req.flash("success_msg");
    //res.locals.error_msg = req.flash("error_msg");
     res.locals.error= req.flash("error");
     next();
  });
app.use('/users',require("./routes/users.js"));
app.use('/usersP',require("./routes/parentUsers.js"));
app.use('/usersT',require("./routes/teacherUsers.js"));
app.listen(5000,function()
{
    console.log("server started on port 5000.");
});