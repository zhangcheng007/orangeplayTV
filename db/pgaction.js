var pg = require('pg');
var conString = "postgres://postgres:111111@localhost:5432/postgres";


function DB(pg,conString) {

this.pg = pg;
this.conString = conString;
};

DB.prototype.createQuery=function(queryarg,callback){

     this.pg.connect(this.conString, function(err, client, done) {

        if(err){

           console.error('error create client from pool', err);
           return callback(err);
        };

        client.query(queryarg,function(err,result){
        	done();
            if (err) {
              console.error('error fetching client from pool', err);
              return callback(err);
            };         

           
            callback(err,result);
        });
     });
}


DB.prototype.createInsert=function(table,args,callback){

     this.pg.connect(this.conString, function(err, client, done) {

        if(err){

           console.error('error create client from pool', err);
           return callback(err);
        };

        client.query(table,args,function(err,result){
        	done();
            if (err) {
              console.error('error insert client from pool', err);
              return callback(err);
            };               
            callback(err,result);
        });
     });
}


//var db=new DB(pg,conString);
module.exports=new DB(pg,conString);

// console.log('----------------query------------------');

// var queryarg='select * from bilibili';
//  db.createQuery(queryarg,function(err,result){

//     if (err) {
//       return console.error(err);
//     };

//     return  console.log(result.rows.length);
//   });

// //插入数据

// console.log('----------------insert------------------');


//  var inserttable='INSERT INTO bilibili(video_img_url,video_url,video_topic,video_describle ,video_gk,video_dm,video_sc,video_up_time) \
//                  VALUES($1, $2, $3,$4,$5,$6,$7,$8)';

//  var insertargs= ["http://i2.hdslb.com/320_200/video/d8/d8a1e8df6833304905aa8f46aff9d666.jpg","/video/av3223087/","【10月】青春侦探晴也～不容许大人的作恶 06【日菁字幕组】","紧张到手心出汗的全新青春痛快推理剧。 涉世未深的大学生们被卷入成人世界的罪恶， 为了解决疑难事件而四处奔走。 主人公晴也以智慧和勇敢为武器，逼近事件核心。","41278","3275","445","2015-11-15 07:08"]



// for (var i =0; i <=20; i++) {

// 	db.createInsert(inserttable,insertargs,function(err,result){

//    if (err) {
//       return console.error(err);
//     };
//     return  console.log(result);
// });
// };






//修改数据