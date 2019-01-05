var express = require('express');
var commentcontroller=require('../controller/commentcontroller');
var commentrouter=express.Router();
commentrouter.post('/commentrouter/pushcomment',commentcontroller.pushcomment);
commentrouter.get('/commentrouter/getallcomments',commentcontroller.getallcomment);
commentrouter.post('/commentrouter/praise',commentcontroller.praise);
commentrouter.post('/commentrouter/pushdiscuss',commentcontroller.pushdiscuss);
module.exports=commentrouter;