var db=require('../db/pgaction.js');

function Bilibili(page, pagecount) {

    //this.page=page;
    //this.pagecount=pagecount;
};

module.exports =new Bilibili;

Bilibili.prototype.getcurrentpage=function(currentpageoffset,callback){

 var queryarg='select * from bilibili limit 16 offset '+currentpageoffset;
 db.createQuery(queryarg,function(err,result){

     if (err) {
       return  err;//console.error(err);
     };

     
     callback(err,result);    //console.log(result.rows);
 });
}


Bilibili.prototype.getcount=function(callback){

 var queryarg='select * from bilibili';
 db.createQuery(queryarg,function(err,result){

     if (err) {
       return  err;//console.error(err);
     };
     callback(err,result.rows.length);    //console.log(result.rows);
 });
}

