var express= require('express');
var app = express();
var router=express.Router();
var Schema= require('./../../model/myschema');
var bodyparser= require('body-parser');
var path = require('path');


app.use(bodyparser.urlencoded({extended:true}));

router.get('/',function(request,response){
        response.sendFile(path.resolve(__dirname+'./../../views/LoginAndRegister/mycss.html'));


       
    
});

module.exports=router;