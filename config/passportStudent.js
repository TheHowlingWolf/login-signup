var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var passport = require("passport");
var urljoin = require("url-join");
var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var router = express.Router();

router.use(expressLayouts);



//Load User model
var User = require("../models/masterUser");


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField:"username"},(username,password,done) => {
           //Match user
           User.findOne({ username:username})
           .then(user => {
               if(!user){
                   return done(null,false,{message:"That username is not registered."});
               }
               //Match password
               bcrypt.compare(password,user.password,(err,isMatch) => {
                   if(err) throw err;

                   if(isMatch){
                       return done(null,user);
                   }else{
                       return done(null,false,{message: "Password incorrect"});
                   }
                   
               });
           })
           .catch(err => console.log(err)); 
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.username);
      });
    
      passport.deserializeUser((username, done) => {
       done(null,{username:username});
      });
    }