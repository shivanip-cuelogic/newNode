var mongoose = require('mongoose');
// var express=require('express');
// var app=express();
// var joi=require('joi');
// var bodyparser= require('body-parser');
// var express = require("express");
var Schema= mongoose.Schema;
mongoose.set('debug',true);

// console.log("type of->:"+typeof(mongoose));




    var Schema= new Schema({
    
        username:String,
        password:String,
        firstname:String,
        lastname:String
   });


module.exports=mongoose.model('Schema',Schema);