var express = require('express');
var commentcontroller=require('../controller/commentcontroller');
var commentrouter=express.Router();
commentrouter.post('/commentrouter/pushcomment',commentcontroller.pushcomment);
commentrouter.get('/commentrouter/getallcomments',commentcontroller.getallcomment);
module.exports=commentrouter;