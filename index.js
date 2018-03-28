
//depencies
var express= require('express');
var app=express();
var port = 3000;
var path=require('path');
var val= require('./model/myschema');
var mongoose= require('mongoose');
var bodyparser= require('body-parser');
var passport= require('passport');
var fs = require('fs');
var joi=require('joi');


//static path to public directory
app.use(express.static(path.resolve(__dirname+'/views')));
app.use(bodyparser.urlencoded({extended:true}));

//authentication using tokennization
var Login=require('./controller/Login');
var routeRegister=require('./controller/user/register');
var loadindexfile= require('./controller/login and register/pageloader');
var logsave=require('./controller/user/logdetails');
var userUpdate=require('./controller/user/updateUserProfile'); 
var deleteUser=require('./controller/user/deleteUSer');
var dataOfAllUsers=require('./controller/admin/viewDataOfallUser');
var dataOfParticularUser=require('./controller/admin/dataOfParticularuser');
var getDataOfParticularUser=require('./controller/admin/getDataOfParticularUser');
var deleteOne=require('./controller/admin/deleteOneUser');
var lastFiveDays=require('./controller/admin/NotLoggedIn');
var validate = require('./controller/login and register/validation');
var data=require("./controller/admin/dataFive.js");

//first load a html page
app.use('/LoginAndRegister',loadindexfile);

//generate a token for valid user 
app.use('/user/Register',validate,routeRegister);
//then save that info of user along with token in schema
app.use('/user/Login',Login);
//save user log
app.use('/user/saveData',logsave);
//update
app.use('/user/updateUserProfile',userUpdate);  

//delete user
app.use('/user/deleteUser',deleteUser);

////data of all users 
// app.use('/dataOfAllUsers',dataOfAllUsers);///////////////////error due to this call

app.use('/admin/dataOfallUsers',dataOfAllUsers);

///search for particular user  
app.use('/admin/dataofuser',dataOfParticularUser);

//get data of particular user
app.use('/admin/getUser',getDataOfParticularUser);

app.use('/deleteOneUser',deleteOne);

//users who have not loggedin since last 5 days
app.use('/admin/UsersNotLoggedInLastFiveDays',lastFiveDays);

app.use('/getDetails',data);
//listen to the port
app.listen(port,function(){
    console.log("server started at port no:"+port);
});

