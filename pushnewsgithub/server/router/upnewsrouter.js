var express = require('express');
let multer = require('multer');
const fs = require('fs');
var storage=multer.diskStorage({
    destination: function (req, file, cb) {
        var date=req.body.pushtime;
       if(file.mimetype=='image/jpeg'||file.mimetype=='image/png'){
           fs.access('./public/images/'+date, fs.constants.F_OK, (err) => {
               if(err){
                   fs.mkdir('./public/images/'+date, { recursive: true }, (err) => {
                       if (err) throw err;
                       cb(null, './public/images/'+date)
                   });
               }else{
                   cb(null, './public/images/'+date)
               }
           });
       }
       if(file.mimetype=='video/mp4'){
           var exists=fs.existsSync('./public/mp4/'+date);//这里fs只能判断最后一层date是否存在，而不是判断整个路径是否存在
           if(!exists){
               fs.mkdirSync('./public/mp4/'+date,{ recursive: true });
               cb(null, './public/mp4/'+date)
           }else{
               cb(null, './public/mp4/'+date)
           }
       }
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});
var storage2=multer.diskStorage({
    destination: function (req, file, cb) {
        var date=req.body.date;
        if(file.mimetype=='image/jpeg'||file.mimetype=='image/png'){
            fs.access('./public/images/'+date, fs.constants.F_OK, (err) => {
                if(err){
                    fs.mkdir('./public/images/'+date, { recursive: true }, (err) => {
                        if (err) throw err;
                        cb(null, './public/images/'+date)
                    });
                }else{
                    cb(null, './public/images/'+date)
                }
            });
        }
        if(file.mimetype=='video/mp4'){
            var exists=fs.existsSync('./public/mp4/'+date);//这里fs只能判断最后一层date是否存在，而不是判断整个路径是否存在
            if(!exists){
                fs.mkdirSync('./public/mp4/'+date,{ recursive: true });
                cb(null, './public/mp4/'+date)
            }else{
                cb(null, './public/mp4/'+date)
            }
        }
    },
    filename: function (req, file, cb) {
        var filename=req.body.res_url.split('/').pop();
        cb(null,filename)
    }
});
var upnewscontroller=require('../controller/upnewscontroller');
var upnewsrouter = express.Router();
upnewsrouter.post('/upnewsrouter/upload',multer({storage:storage}).array('files'),upnewscontroller.upnews);
upnewsrouter.get('/upnewsrouter/getnews',upnewscontroller.getnews);
upnewsrouter.post('/upnewsrouter/deletepart',upnewscontroller.deletepart);
upnewsrouter.post('/upnewsrouter/changepart',multer({storage:storage2}).single('file'),upnewscontroller.updatepart);
upnewsrouter.post('/upnewsrouter/deleteparts',upnewscontroller.deleteparts);
module.exports=upnewsrouter;