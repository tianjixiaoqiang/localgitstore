var mongoose=require('../db');
var bcrypt=require('bcryptjs');//加密中间件
var Schema = mongoose.Schema;
var userSchema=new Schema({//用户类
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
    comparePassword:function (_password,cb) {//设置一个比较密码的实例方法
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if(err)return cb(err);
            cb(null,isMatch)
        })
    }
};

module.exports=mongoose.model('User',userSchema);