var db=require('../db/pgaction.js');

function Bilibili(page, pagecount) {

    //this.page=page;
    //this.pagecount=pagecount;
};

module.exports =new Bilibili;

Bilibili.prototype.get=function get(callback){

 var queryarg='select * from bilibili limit 12';
 db.createQuery(queryarg,function(err,result){

     if (err) {
       return  err;//console.error(err);
     };
     callback(err,result);    //console.log(result.rows);
 });
}

