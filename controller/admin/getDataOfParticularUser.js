
var express=require('express');
var router=express.Router();
var app=express();
var schema=require('./../../model/myschema');
var path=require('path');
var bodyparser=require('body-parser');
var mongoose= require('mongoose');
var ObjectId = require('mongodb').ObjectID;

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname+'/views')));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/employeeSchema');
mongoose.connection.on('connected',function(error,res){
    if(error)
    console.log("Error...");
    else
    console.log("Connected");
});

router.post('/:name',function(req,res){
schema.find({name:req.body.username},function(err,userResult){

    if(err)
    console.log("error occured in searching ");
    else if(userResult.length<1)
    res.send("User Not Present..");
    else
    {   
        
        // res.send("user found "+req.body.username);
        // console.log("name is-->:"+userResult[0].name);
        var id=ObjectId(userResult[0]._id);
        res.render(path.resolve(__dirname+'./../../views/user/displayData.ejs'),{
            //header:"this is profile of "+userResult[0].name,
            user:userResult,
            // userId:ObjectId(userResult._id)
            // name:userResult[0].name,
            // password:userResult[0].password,
            // age:userResult[0].age,
            // city:userResult[0].city,
            // project:userResult[0].project,
            // salary:userResult[0].salary,
            // ObjectId:id
        });
       
    }
     
});


});

module.exports=router;