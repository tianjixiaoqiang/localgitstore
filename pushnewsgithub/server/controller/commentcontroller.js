var Comment=require('../model/comment');
module.exports={
    pushcomment(req,res){
        var userid=req.body.userid;
        var username=req.body.username;
        var msgbody=req.body.msgbody;
        var part=req.body.part;
        if(!userid||!username||!msgbody||!part){
            res.send('error');
            res.end();
            return;
        }
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
    },
    praise(req,res){
        var commentid=req.body.commentid;
        var userid=req.body.userid;
        Comment.findOne({_id:commentid},function (err,doc) {
            if(err){console.log(err);res.send('error');res.end();return;}
            if(doc){
                if(doc.praise.indexOf(userid)==-1){
                    doc.praise.push(userid);
                    Comment.updateOne({_id:doc._id},{$set:{praise:doc.praise}},function (err,result) {
                        if(err){console.log(err);res.send('error');res.end();return;}
                        res.send('点赞成功');
                        res.end();
                    })
                }else{
                    res.send('评论不存在');
                    res.end();
                }
            }
        })
    },
    pushdiscuss(req,res){
        var userid=req.body.userid;
        var username=req.body.username;
        var msgbody=req.body.msgbody;
        var part=req.body.part;
        var joinedcommentid=req.body.joinedcommentid;
        if(!userid||!username||!msgbody||!part||!joinedcommentid){
            res.send('error');
            res.end();
            return;
        }
        var one=new Comment({
            userid:userid,
            username:username,
            msgbody:msgbody,
            part:part,
            pushtime:Date.now()
        });
        one.save(function (err,doc) {
            if(err){console.log(err);return;}
            Comment.findOne({_id:joinedcommentid},function (err,doc2) {
                if(err){console.log(err);res.send('error');res.end();return;}
                if(doc2){
                    var comments_id=doc2.comments_id;
                    comments_id.push(doc._id);
                    Comment.updateOne({_id:doc2._id},{$set:{comments_id:comments_id}},function (err,result) {
                        if(err){console.log(err);res.send('error');res.end();return;}
                        res.send(doc);
                        res.end();
                    })
                }else{
                    res.send('该评论不存在');
                    res.end();
                }
            })
        })
    }
};