var express=require('express');
var app =express();
var router=express.Router();
var schema=require('./../../model/myschema');
var path= require('path');
router.get('/',function(req,res){
// res.send("all users");

schema.find(function(err,result){
    if(err)
    console.log("err in finding all users");
    else
    res.render(path.resolve(__dirname+'./../../views/admin/viewDataOfallUser.ejs')
                           ,{result:result});
});

});

module.exports=router;