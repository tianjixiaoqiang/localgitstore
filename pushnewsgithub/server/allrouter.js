const upnewsrouter=require('./router/upnewsrouter');//这里引入后台的所有路由
const userrouter=require('./router/userrouter');
const commentrouter=require('./router/commentsrouter');
var allrouters=[
   upnewsrouter,
   userrouter,
   commentrouter,
];
module.exports=allrouters;
