var mongoose=require('../db');
var bcrypt=require('bcryptjs');
var Schema = mongoose.Schema;
var userSchema=new Schema({
    username:{type:String,unique:true},
    password:'',
    role:{type:String,default:'普通用户'}
},{versionKey: false});
userSchema.pre('save',function (next) {
    var user=this;
    bcrypt.genSalt(10,function (err,salt) {
        if(err)return next(err);
        bcrypt.hash(user.password,salt,function (err,hash) {
            if(err)return next(err);
            user.password=hash;
            next();
        })
    })
});

userSchema.methods={
    comparePassword:function (_password,cb) {
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if(err)return cb(err);
            cb(null,isMatch)
        })
    }
};

module.exports=mongoose.model('User',userSchema);