//const userrouter=require('./router/userrouter');
//const makefriendsrouter=require('./router/makefriendsrouter');
//const selfcenterrouter=require('./router/selfcenterrouter');
const upnewsrouter=require('./router/upnewsrouter');
const userrouter=require('./router/userrouter');
const commentrouter=require('./router/commentsrouter');
var allrouters=[
   upnewsrouter,
   userrouter,
   commentrouter,
];
module.exports=allrouters;
