var mongoose=require('../db');
var Schema = mongoose.Schema;
var commentSchema=new Schema({
    userid:'',
    username:'',
    msgbody:'',
    part:'',
    pushtime:{type:Date,default:Date.now()},
    comments_id:{type:Array,default:[]},
    praise:{type:Array,default:[]}
},{versionKey: false});
module.exports = mongoose.model('Comments',commentSchema);