const express=require('express');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const allrouters=require('./allrouter');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('./db');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:'tianjixiaoqiang',//设置加密字符串
    cookie: {maxAge: 1000*60*60*24*14 },
    resave: false,
    saveUninitialized: true,
    store:new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
for( let router of allrouters){
    app.use('/api',router);
}
app.listen(3000);

console.log('success listen at port:3000......');