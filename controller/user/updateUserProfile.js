var express= require("express");
var app = express();
var bodyparser= require("body-parser");
var Schema= require('./../../model/myschema');
var mongoose= require('mongoose');
var router=express.Router();

//set up connection with employeeschema database

//mongoose connection
mongoose.connect("mongodb://localhost/employeeSchema");
mongoose.connection.on('connected',function(err,result){
    if(err)
    throw err;
    else
    console.log("DataBase connected fro updation");
});

app.use(bodyparser.urlencoded({extended:true}));
//route for updating user profile 
router.post('/',function(req,res){
    console.log("user data module");
    
    console.log(req.body.username);
    Schema.findByIdAndUpdate(req.body.id,{$set:{username:req.body.username,
                                 password:req.body.password,
                                 firstname:req.body.firstname,
                                 lastname:req.body.lastname,
                                 ObjectId:req.body.id}},{new:true},
        function(error,result){
        if(error)
        throw error;
        else
        {
            console.log("current user data updated successfully:",result);
            var hold=" Updated Profile";
            res.render('./../views/user/profile.ejs',
                                {
                                header:hold,
                                username:req.body.username,
                                password:req.body.password,
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                               ObjectId:req.body.id
                                });
        }
       // res.send("Current user:"+result);
    });

    });

   

    module.exports=router;