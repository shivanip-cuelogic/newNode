var express= require("express");
var app= express();
var router = express.Router();
var joi = require("joi");

    var tempData ={
        username:joi.string().email(),
        password:joi.string().min(6).max(20),
        firstname:joi.string().min(1).max(50),
        lastname:joi.string().min(1).max(50)
    };

   module.exports=function(req,res,next)
   {

    joi.validate(req.body,tempData,function(error,result){
        if(error)
        {
            console.log("got some error in data insertion");
        }
        else
        {
            console.log("OK");
            next();
        }
    });
   } 
   




