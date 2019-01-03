var express = require('express');
var usercontroller=require('../controller/usercontroller');
var userrouter = express.Router();
userrouter.post('/userrouter/login',usercontroller.login);
userrouter.post('/userrouter/register',usercontroller.adduser);
userrouter.post('/userrouter/autologin',usercontroller.autologin);
userrouter.post('/userrouter/logout',usercontroller.logout);
module.exports=userrouter;