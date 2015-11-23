var express = require('express');
var router = express.Router();
var info=require('../control/info.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  //分页
    //var currentPage=1;
    var currentPage = req.query.page?req.query.page:1;
    var pagesize =16;
   
    var totalcount=0;
    var pageCount=0;

    var currentpageoffset=pagesize*(currentPage-1);


    info.getcurrentpage(currentpageoffset,function(err,result){

     if (err) {
     	//console.error(err);
     	res.send('search page err:'+err);
     };
       

    info.getcount(function(err,count){
         if (err) {
     	  //console.error(err);
     	  res.send('search count err:'+err);
         };
        
         totalcount=count;
         pagecount=Math.ceil(totalcount/pagesize);
         
         res.render('index', 
        { title: 'OrangeplayTV','tv':result.rows,pageSize:pagesize,pageCount:pagecount,currentPage:currentPage});
       });

    });
    


});


module.exports = router;
