var User=require('../model/user');//引入class user
var logger=require('../logger');//引入自定义日志模块
var loggerinfo=logger.logger('./logs/info.log','info');//通过自定义的logger方法确定日志种类，不同的种类会被写入不同的文件
var loggererror=logger.logger('./logs/error.log','error');
var jwt = require('jsonwebtoken');
var userlist=[];//维护一个用户数组以减小数据库访问次数
User.find({},function (err,docs) {//从数据库中提取所有user数据，将username存入用户数组，初始化
    if(err){console.error(err)}
    userlist=docs.map(function (val,index,arr) {
        return val.username;
    })
});
module.exports={
   adduser(req,res){//添加用户方法
       var username=req.body.username;//获取用户上传的用户名和密码
       var password=req.body.password;
       if(!username||!password){
           res.send("请完善信息");
           res.end();
           return;
       }
       if(userlist.indexOf(username)!=-1){//首先判断在用户数组中有无对应的用户名，如果有就告诉前端用户已存在，然后结束此方法避免后续代码执行。
           res.send('用户名已存在');
           res.end();
           return;
       }
       User.findOne({username:username},function (err,doc) {//代码走到这里就说明用户数组不存在刚刚提交的用户名，此时再从数据库中查询，添加。
           if(err){console.log(err);}
           if(doc){
               res.send('用户名已存在');
               res.end();
           }else{
               let role='普通用户';
               if(username=="天极小强"){
                   role='系统管理员';
               }
               var user=new User({username:username,password:password,role:role});
               user.save(function (err,user) {
                   if(err){console.error(err);res.send('用户名已存在');res.end()}//如果在存的过程中出现意外，就将错误返给前端
                   var token=jwt.sign({
                       user:user
                   }, 'tianjixiaoqiang', { expiresIn: '14d' });
                   req.session.user = user;
                   req.session.save();
                   res.json({'user':user,'token':token});
                   res.end();
               });
           }
       })
   },
   login(req,res){//这里是登录功能
       var username=req.body.username;//获取前台上传数据
       var password=req.body.password;
       if(!username||!password){
           res.send("用户不存在");
           res.end();
           return;
       }
       if(req.session.user){
           console.log(req.session.user);
           if(req.session.user.role!='系统管理员'){
               res.send('用户已经登录');
               console.log('用户已经登录');
               res.end();
               return;
           }
       }else{
           console.log('session buxunzai');
       }
       User.findOne({username:username},function (err,user) {//根据username从数据库中找到对应数据
           if(err){console.error(err)}
           if(!user){res.send('用户不存在');res.end()}//如果根据username找不到用户名就告诉前端不存在
           else{//如果存在
               user.comparePassword(password,function (err,isMacth) {//这里根据schema中定义的比较方法，比较数据库中加密的密码和用户上传的password
                   if(err){console.error(err)}
                   if(isMacth){//如果匹配成功，生成登陆日志，写入日志文件，同时将数据库的此user用户返回给前端，供前端调用。
                       loggerinfo.info(`${user.username}登录成功`);
                       req.session.user=user;
                       var token=jwt.sign({
                           user:user
                       }, 'tianjixiaoqiang', { expiresIn: '14d' });
                       req.session.user = user;
                       req.session.save();
                       res.json({'user':user,'token':token});
                       //res.send(user);
                       res.end()
                   }else{//如果匹配不成功，就告诉前端用户名或密码不正确
                       res.send('用户名或密码不正确');
                       res.end();
                   }
               })
           }
       })
   },
   autologin(req,res){
       var token=req.body.token;
       //console.log("ceshidaima 83");
       jwt.verify(token, 'tianjixiaoqiang',function (err,decoded) {
           if(err){
               res.send('token过期');
               res.end();
               return;
           }
           //console.log(decoded);
           User.findOne({_id:decoded.user._id},function (err,user) {
               if(err){console.log(err);return;}
               if(user){
                   if(decoded.user.username==user.username&&decoded.user.password==user.password){
                       //console.log('jiema97');
                       req.session.user=user;
                       req.session.save();
                       res.send(user);
                       res.end();
                   }else{
                       res.send('token失效');
                       res.end();
                   }
               }
           });
       });
   },
   logout(req,res){
       req.session.destroy();
       //console.log('ceshidaima115');
       res.send('成功退出');
       res.end();
   },

};