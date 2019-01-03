var fs=require('fs');
module.exports={
    logger(url,type){
        if(type=='info'){
            return {
                info(msg2){
                    var data=new Date();
                    var msg=data.toLocaleString()+`[${type}]`+msg2+' end;\n';
                    fs.appendFile(url,msg,err=>{
                        if (err) throw err;
                    })
                },
            }
        }
        if(type=='error'){
            return {
                error(msg2){
                    var data=new Date();
                    var msg=data.toLocaleString()+`[${type}]`+msg2+' end;';
                    fs.appendFile(url,msg,err=>{
                        if (err) throw err;
                    })
                }
            }
        }
    }
}