
var request = require('request');
var db=require('../db/pgaction.js');
var headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36'
   };

// url: 'http://www.bilibili.com/index/tag/15/default/1/%E6%97%A5%E5%89%A7.json',
var arrTV={
  '日剧': encodeURI('日剧'),
  '韩剧': encodeURI('韩剧'),
  '美剧': encodeURI('美剧'),
  '国产': encodeURI('国产'),
  '泰剧': encodeURI('泰剧')
}

 
//var pages=[0,1,2,3,4,5,6,7,8,9,10];
function  crawler(whatTV,whatURL,whatPages,isjson) {
	this.options = { method: 'GET',gzip: true,headers:headers}; 
	this.page=1;
	this.pages=whatPages;
	this.tv=whatTV;
    this.url=whatURL;
    this.pages=whatPages;
    this.json=isjson;

    this.assembleURL=function(){

     var temp=this.url;
     temp+=this.page;
     temp+='/';
     temp+=this.tv;
      if(this.json)     
      temp+='.json';
      this.options['url']=temp;
    }
    
    this.display=function(){

     console.log(this.options['url']);
     //console.log(this.options);

    }

}


crawler.prototype.sendRequest=function(callback){


     this.assembleURL();
	 if(this.page>this.pages)
	   return  callback(null,null,true);
	 else this.page++;
   
	 request(this.options, function(err,response, body){

		 if(err){
	          console.log("send bad request:",err)
	          callback(err);
		 }

		 if(response.statusCode == 200){
		    
		     callback(err,body);
		  }
	});
		  
}

//爬去页面
var url='http://www.bilibili.com/index/tag/15/default/'; 
//插入表
var inserttable='INSERT INTO bilibili(video_img_url,video_url,video_topic,video_describle ,video_gk,video_dm,video_sc,video_up_time) \
                VALUES($1,$2,$3,$4,$5,$6,$7,$8)';

//循环页数
var pagecount=2;
var mycrawler=new crawler(arrTV['美剧'],url,pagecount,true);
 //mycrawler.assembleURL();
 //mycrawler.display();

mycrawler.sendRequest(function(err,body,limit){
   if(err){
   	 return console.err(err);
   }
   if(limit){
   	 return console.log('操过请求次数');
   }
    //return console.log(body);
    var jsonArray=JSON.parse(body);
    var length=jsonArray.list.length;
        console.log('leng:',length);
   
    //console.log(jsonArray);
    for (var i = 0; i < length; i++) {       
        var data=[];   
        data.push(jsonArray.list[i].pic);
        data.push(jsonArray.list[i].aid);
        data.push(jsonArray.list[i].title);
        data.push(jsonArray.list[i].description);

        data.push(isNaN(parseInt(jsonArray.list[i].play))?0:jsonArray.list[i].play);
        data.push(jsonArray.list[i].video_review);
        data.push(jsonArray.list[i].favorites);
        data.push(jsonArray.list[i].create);
        
	        db.createInsert(inserttable,data,function(err,result){
				if(err) {			 
				  return console.error(err);
				};
				return;  //console.log(result);
			});
    }

});





for (var i = 0; i <=pagecount; i++) {

   //setTimeout(mycrawler.sendRequest, 5000);
};






 


 