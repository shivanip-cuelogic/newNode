var express= require('express');
var jwt= require('jsonwebtoken');
var mongoose= require('mongoose');
var app= express();
var router=express.Router();
var User= require('./../model/user.js');
var schema= require('./../model/myschema.js');
var bodyparser= require('body-parser');
var path=require('path');
var mongo = require('mongodb');
var useragent = require('useragent');
var myLogSchema= require('./../model/logSchema');
var ObjectId = require('mongodb').ObjectID;


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/employeeSchema');
mongoose.connection.on('connected',function(error,res){
    if(error)
    console.log("Error...");
    else
    console.log("Connected");
});

mongoose.connect("http://localhost:/UsersActivity");
mongoose.connection.on('connected',function(err ,result){
                if(err)
                console.log("Error in connecting to database");
                else
                console.log("User got connected to database user");
});

app.use(bodyparser.urlencoded({extended:true}));


//controller of the code
router.post('/',function(req,res){
    //console.log("hello");
    var data= new User({uername:req.body.username,
                        password:req.body.password});
    
  console.log("name:"+req.body.username+" password: "+req.body.password);
        //console.log(data);
  schema.find({username:req.body.username,password:req.body.password},
             function (err, existingUser){
            if(err)
            {
                res.send("some error occured");
            }
            else if(existingUser.length<1)
            {
            res.send("user not found....");     
            }
        else{
                            // res.send("hello user");
                            var message;
                            if(req.body.username=="admin@cue.com" && req.body.password=="admin123")
                            {
                                
                                //render info of all user in database
                        
                                res.render('./../views/admin/adminLoginPage.ejs',
                                            {
                                                link:"/dataOfAllUsers"
                                            });
                            }
                            else
                            {
                                // console.log(ObjectId(existingUser[0]._id) );
                                // console.log(existingUser[0]);
                                var id= ObjectId(existingUser[0]._id );
                                       res.render('./../views/user/profile.ejs',
                                        { header:"My Profile",
                                        username:existingUser[0].username,
                                        password:existingUser[0].password,
                                        firstname:existingUser[0].firstname,
                                        lastname:existingUser[0].lastname,
                                        ObjectId:id
                                    });

                                  
                                    //to get full url of user signing in
                                    var fullUrl =req.protocol + '://' +req.get('host') +req.originalUrl;
                                    //response.send(fullUrl);
                                
                                //      user agent
                                    var agent = useragent.parse(req.headers['user-agent']);
                                    agent.toString();
                                    //response.send('your useragent is ' + agent);  
                                
                                    var datetime = new Date();
                                    //response.send(datetime); 
                                
                                    var logData= new myLogSchema({
                                        urldetails:fullUrl,
                                        userAgent:agent,
                                        dateDetails:datetime,
                                        objectId: id
                                    });
                                    logData.save(function(err,result){
                                        if(err)
                                        console.log("Could not maintain log..Some Error occured");
                                        else{
                                            console.log("Log added as:"+result);
                                        }
                                    });
                            }
                            //log maintain during login of each user
             
            }
    } );
    
    
});


module.exports= router;


