var express=require('express');
var app=express();
var router=express.Router();
var params = require('express-params')
var schema=require('./../../model/myschema');
var getDataOfParticularUser=require('./../admin/getDataOfParticularUser');
router.get('/:id/:name',function(req,res){
    var id=req.params.id;
    var name=req.params.name;
  console.log("id =:"+id);
        schema.remove({_id:id},function(err,result){
            if(err)
            console.log("error to delete");
            else
            {
                // res.render('admin/getUser');
                res.redirect('/admin/getUser/:name');
            }
        });
// res.send("id=>"+id);
});
// app.listen(8080,function(){
//     console.log("server started at port no:"+8080);
// });

 module.exports=router;