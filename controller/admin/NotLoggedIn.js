
var express=require('express');
var app=express();
var router=express.Router();
var dateSchema= require("./../../model/logSchema");
var bodyparser = require("body-parser");
var path= require("path");
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
router.get('/',function(req,res){
    
        var complete_data=[];
        var objectsIDS=[];
        // var complete_days=0;
        dateSchema.find(function(err,result){
            var dateToday = result.dateDetails;
          
                    for(var i=0;i<result.length;i++){
                        var actualDate=result[i].dateDetails;
                        var actualTime=actualDate.getTime();
                        complete_data.push(actualTime); 
                    }
                        // console.log("complte_data===>",complete_data[0],"is array==>",complete_data instanceof Array);
                // res.send(complete_data);   
       

                for(var i=0;i<result.length;i++){
                    var ids=result[i].objectId;
                    objectsIDS.push(ids); }
// console.log(objectsIDS);

                   var count=[];
                   for(var i=0;i<complete_data.length;i++)
                   {

                    console.log("log:"+complete_data[i]);
                    var today = new Date();
                    var mydate = today.getTime();
                    // var thatDay = new Date("Tue Mar 20 2018 14:34:59 GMT+0530 (IST)");
                    var thatDayTime = complete_data[i];
                    var timeDiff = Math.abs(mydate - thatDayTime);
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                    
                    console.log("diff is:"+diffDays);
                    if(diffDays>1)
                    {
                        console.log("count instamce==>",count instanceof Array);
                        count.push(i);
                        console.log("count array",count);
                    
                    }
                    
                   }
                   console.log("array index  0",count[0],`values${count}`);
                   console.log("count istanceof array ",count instanceof Array);
                   var names=[];
                   for(var j=0;j<count.length;j++) {
                       var m = count[j];
                    //    console.log(`count[${j}] = ${count[j]} m=${m}`);
                       names.push(objectsIDS[m]);
                   }
                   res.render(path.resolve(__dirname+'./../../views/admin/listFive.ejs'),{
                    heading:"List of users who have not Logged_In Since last five days",
                    names:names});
                //    res.send(`users who have not logged-In in last 5 days--->${names}`);
                // console.log("count at 0th:"+count instanceof Array);
                  
                   //for(var j=0;j<count.length;j++)
                   //{
                      // var m=count[j];
                // //    names.push(objectsIDS[m]);  
                //console.log("value of m is:"+m);
                  //  }
                //    console.log("names"+names);       
                //    res.send("total no of unlogged users:"+names); 

                })
              
                });


module.exports=router;