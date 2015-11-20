var express = require('express');
var router = express.Router();
var info=require('../control/info.js');

/* GET home page. */
router.get('/', function(req, res, next) {

   info.get(function(err,result){

     if (err) {
     	//console.error(err);
     	res.send(err);
     };
 
   	 res.render('index', { title: 'OnzhangplayTV','tv':result.rows});
   })

});


module.exports = router;
