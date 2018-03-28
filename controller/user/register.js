var express= require('express');
var app= express();
var router=express.Router();
var Schema= require('./../../model/myschema');
var myLogSchema= require('./../../model/logSchema');
var bodyparser= require('body-parser');
var mongoose= require('mongoose');
var path = require('path');

//set up connection with employeeschema database



//mongoose connection
mongoose.connect("mongodb://localhost/employeeSchema");
mongoose.connection.on('connected',function(err,result){
    if(err)
    throw err;
    else
    console.log("DataBase connected ");
});


app.use(bodyparser.urlencoded({extended:true}));


//controller of the code
router.post('/',function(req,res){

    var data= new Schema({username:req.body.username,
                            password:req.body.password,
                          firstname:req.body.firstname,
                          lastname:req.body.lastname});
    
    //insert data
   
    data.save({username:req.body.username,
              password:req.body.password,
              firstname:req.body.firstname,
              lastname:req.body.lastname},(err,result)=>{
        if(err)
        throw err;
        else
        {
            console.log("current entry is saved successfully.. :",result);
            res.send("registered successfully");
        }
       
    });
    });
    var logsave=require('./logdetails');
    app.use('/test/saveData',logsave);   

   

    module.exports=router;