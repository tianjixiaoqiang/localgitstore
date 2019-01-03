var mongoose=require('../db');
var Schema = mongoose.Schema;
var commentSchema=new Schema({
    _id:'',
    username:'',
    body:'',
    part:'',
    praise:{type:Number,default:0}
},{versionKey: false});
module.exports = mongoose.model('Comments',commentSchema);