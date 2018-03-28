var express= require('express');
var router=express.Router();
var app=express();
var path=require('path');
var bodyparser= require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname+'/views')));
app.use(bodyparser.urlencoded({extended:true}));

router.get('/',function(req,res){
res.render(path.resolve(__dirname+'./../../views/admin/searchParticularUser.ejs'));
});

module.exports=router;