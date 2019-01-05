const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/newsdb', {useNewUrlParser:true});//连接mongodb数据库

var connection = mongoose.connection;
connection.on('error', function (err) {//监听连接事件
  console.error(err);
});
connection.on('connected', function () {
  console.log('opened');
});
connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});
module.exports=mongoose;

