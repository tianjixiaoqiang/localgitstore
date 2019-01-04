var Comment=require('../model/comment');
module.exports={
    pushcomment(req,res){
        var userid=req.body.userid;
        var username=req.body.username;
        var msgbody=req.body.msgbody;
        var part=req.body.part;
        var one=new Comment({
            userid:userid,
            username:username,
            msgbody:msgbody,
            part:part,
            pushtime:Date.now()
        });
        one.save(function (err,doc) {
            if(err){console.log(err);return;}
            res.send(doc);
            res.end();
        })
    },
    getallcomment(req,res){
        Comment.find({},function (err,docs) {
            if(err){console.log(err);res.send('error');res.end();}
            res.send(docs);
            res.end();
        })
    }
};