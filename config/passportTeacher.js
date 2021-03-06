var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

//Load User model
var TeacherUser = require("../models/TeacherUser");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "username"}, (username,password,done) => {
           //Match user
           TeacherUser.findOne({ username:username})
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
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        TeacherUser.findById(id, function(err, user) {
          done(err, user);
        });
      });
    };

