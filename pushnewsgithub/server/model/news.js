var mongoose=require('../db');
var Schema = mongoose.Schema;
var NewsSchema=new Schema({
    resourse_url:{type:Array},
    resourse_desc:{type:Array,default:{imgname:'',msg:''}},
    news_label:{type:String,default:''},
    news_type:{type:String,default:''},
    news_writer:{type:String,default:''}
},{versionKey: false});
module.exports = mongoose.model('News',NewsSchema);