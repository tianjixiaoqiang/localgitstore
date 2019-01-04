var News=require('../model/news');
module.exports={
    upnews(req,res){
        var news_label=req.body.news_label;
        var news_type=req.body.news_type;
        var news_writer=req.body.news_writer;
        var resourse_desc=JSON.parse(req.body.resourse_desc);
        //console.log(resourse_desc);//3
        var arr=req.files.map(function (value,index,array) {
            return value.path.replace(/\\/ig,'/');
        });
        var resourse_url=arr;
        //console.log(resourse_url);
        var one=new News({
            news_label:news_label,
            news_type:news_type,
            news_writer:news_writer,
            resourse_desc:resourse_desc,
            resourse_url:resourse_url
        });
        one.save(function (err,doc) {
            if(err){console.log(err);res.end();return;}
            res.send(doc);
            res.end();
        })
        //console.log(resourse_desc instanceof Array);//false
        //console.log(typeof resourse_desc);//string
       //console.log(req.body);
       //console.log(req.body.files[0]);
       //console.log(req.files);
       /*
       [{ fieldname: 'files',
    originalname: '1.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './public/images',
    filename: '1.jpg',
    path: 'public\\images\\1.jpg',
    size: 54892 },]
       */
    },
    getnews(req,res){
        News.find({},function (err,docs) {
            if(err){console.error(err)}
            res.send(docs);
            res.end();
        })
    },
    deletepart(req,res){
        var _id=req.body._id;
        var delete_url=req.body.delete_url;
        if(!_id||!delete_url){
            res.send('error');
            res.end();
            return;
        }
        News.findOne({_id:_id},function (err,doc) {
            if(err){console.log(err)}
            if (doc.resourse_url.length==1){
                News.deleteOne({_id:_id},function (err) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    res.send('删除成功');
                    res.end();
                    return;
                })
            }else{
                var resourse_url=doc.resourse_url;
                var resourse_msg=doc.resourse_desc;
                resourse_url.forEach(function (val,index,arr) {
                    if(val==delete_url){
                        arr.splice(index,1);
                        resourse_msg.splice(index,1);
                    }
                });
                News.updateOne({_id:_id},{$set:{resourse_url:resourse_url,resourse_desc:resourse_msg}},function (err,result) {
                    if(err){console.log(err);return;}
                    res.send('删除成功');
                    res.end();
                })
            }
        })
    },
    updatepart(req,res){
        var _id=req.body._id;
        var res_msg=req.body.res_msg;
        var changeindex=req.body.changeindex;
        if(!_id||!res_msg||!changeindex){
            res.send('error');
            res.end();
            return;
        }
        News.findOne({_id:_id},function (err,doc) {
            if(err){console.log(err);}
            var resourse_desc=doc.resourse_desc;
            resourse_desc[changeindex].msg=res_msg;
            News.updateOne({_id:_id},{$set:{resourse_desc:resourse_desc}},function (err,result) {
                if(err){console.log(err)}
                res.send('修改成功');
                res.end();
            })
        })
    },
    deleteparts(req,res){
        var deletearr=req.body.deletearr;
        var deleteobj={};
        deletearr.forEach(function (value, index, array) {
            if(deleteobj[value._id]){
                deleteobj[value._id].push(value.res_url);
            }else{
                deleteobj[value._id]=[value.res_url];
            }
        });
        //console.log(deletearr);
        var promises=[];//可以用event事件优化速度
        for(var id in deleteobj){
           var promise=new Promise((resolve,reject)=>{
               var _id=id;
               var delete_urls=deleteobj[id];
               News.findOne({_id:_id},function (err,doc) {
                   if(err){console.log(err);reject(err)}
                   if(doc.resourse_url.length==delete_urls.length){
                       News.deleteOne({_id:_id},function (err) {
                           if(err){
                               console.log(err);
                               reject(err);
                           }
                           resolve();
                       })
                   }else{
                       var resourse_url=doc.resourse_url;
                       var resourse_msg=doc.resourse_desc;
                       delete_urls.forEach(function (val,index2,arr) {
                           var index3=resourse_url.indexOf(val);
                           if(index3==-1){reject();}
                           resourse_url.splice(index3,1);
                           resourse_msg.splice(index3,1);
                       });
                       News.updateOne({_id:_id},{$set:{resourse_url:resourse_url,resourse_desc:resourse_msg}},function (err,result) {
                           if(err){console.log(err);reject(err);}
                           resolve();
                       })
                   }
               })
           })
           promises.push(promise);
        }
        Promise.all(promises).then(()=>{
            res.send('删除成功');
            res.end();
        }).catch(err=>{})
    }
}
