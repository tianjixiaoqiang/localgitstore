const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/newsdb', {useNewUrlParser:true});

var connection = mongoose.connection;
connection.on('error', function (err) {
  console.error(err);
});
connection.on('connected', function () {
  console.log('opened');
});
connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});
module.exports=mongoose;

