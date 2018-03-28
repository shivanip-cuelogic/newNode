var express = require("express");
var app = express();
var router= express.Router();
var mongoose= require("mongoose");
var schema= require("./../../model/myschema");

router.post('/',function(req,res){
    
     var name1 =req.body.row_0;
     var name2 =req.body.row_1;
     var name3 =req.body.row_2;
     var name4 =req.body.row_3;
    // console.log("value is at that row is:",name);
    schema.findById({name1},function(err,result){
        // res.send("result is:"+result);
    });
    schema.findById({name2},function(err,result){
        // res.send("result is:"+result);
    });
    schema.findById({name3},function(err,result){
        // res.send("result is:"+result);
    });
    schema.findById({name4},function(err,result){
        // res.send("result is:"+result);
    });
});

module.exports=router;