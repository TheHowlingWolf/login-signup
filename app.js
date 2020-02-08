var express = require("express");
var app = express();
var mongoose=require("mongoose");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
app.set("view engine","ejs");

//Bodyparser
app.use(express.urlencoded({extended: false}));
mongoose.connect('mongodb+srv://dbUser:dbUser@mern-mga4p.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected.."))
.catch(err => console.log(err));
app.get("/",function(req,res)
{
    res.render("../views/homepage");
});
app.get("/studentRegister",function(req,res)
{
    res.render("../views/signupStudent");
});
app.get("/parentRegister",function(req,res)
{
    res.render("../views/signupParent");
});
app.get("/teacherRegister",function(req,res)
{
    res.render("../views/signupTeacher");
});
app.get("/login",function(req,res)
{
    res.render("../views/login");
});
app.get("/dashboard",function(req,res){
    res.render("../views/dashboard");
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

  //Connect flash
  app.use(flash());

  //Global variables
  app.use(function(req,res,next) {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      res.locals.error= req.flash("error");
      next();
  });
app.use('/',require("./routes/users.js"));
app.listen(5000,function()
{
    console.log("server satrted on port 5000.");
});