var fs=require('fs');
module.exports={
    logger(url,type){
        if(type=='info'){//如果是info类型的日志
            return {
                info(msg2){
                    var data=new Date();
                    var msg=data.toLocaleString()+`[${type}]`+msg2+' end;\n';//设置消息格式
                    fs.appendFile(url,msg,err=>{//往文件里写入消息
                        if (err) throw err;
                    })
                },
            }
        }
        if(type=='error'){
            return {
                error(msg2){
                    var data=new Date();//同上
                    var msg=data.toLocaleString()+`[${type}]`+msg2+' end;';
                    fs.appendFile(url,msg,err=>{
                        if (err) throw err;
                    })
                }
            }
        }
    }
}