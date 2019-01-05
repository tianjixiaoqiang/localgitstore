<template>
    <div class="upload-news">
       <h1 class="main-label">这里是上传新闻界面</h1>
       <h2 class="up-label">选择类型</h2>
       <div class="news-body">
           <el-card class="box-card">
               <div slot="header" class="clearfix">
                   <span>图文混排</span>
                   <el-button style="float: right; padding: 3px 0" type="text" @click="showdialog('图文混排')">选择</el-button>
               </div>
               <div>图片和文字</div>
           </el-card>
           <el-card class="box-card">
               <div slot="header" class="clearfix">
                   <span>视频文混排</span>
                   <el-button style="float: right; padding: 3px 0" type="text" @click="showdialog('视频文字混排')">选择</el-button>
               </div>
               <div>视频和描述文字</div>
           </el-card>
           <el-card class="box-card">
               <div slot="header" class="clearfix">
                   <span>视频文混排</span>
                   <el-button style="float: right; padding: 3px 0" type="text" @click="showdialog('视频图片文字混排')">选择</el-button>
               </div>
               <div>视频、图片和描述文字</div>
           </el-card>
       </div>
       <el-dialog
               title="上传新闻"
               :visible.sync="tuwenhunpai"
               width="50%"
       >
           <el-form :model="form" label-width="80px">
               <el-form-item label="新闻类型">
                   <el-select v-model="form.newstype" placeholder="请选择新闻类型" clearable>
                       <el-option  value="社会"></el-option>
                       <el-option  value="娱乐"></el-option>
                       <el-option  value="明星"></el-option>
                       <el-option  value="生活"></el-option>
                       <el-option  value="政治"></el-option>
                       <el-option  value="军事"></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="作者">
                   <el-input v-model="form.writer" style="width:200px;"></el-input>
               </el-form-item>
               <el-form-item label="新闻标题">
                   <el-input v-model="form.label" style="width:300px;"></el-input>
               </el-form-item>
               <el-form-item label="相关图片">
                   <el-upload :auto-upload="false"
                              action=""
                              :on-change="handleChange"
                              multiple
                              style="width:230px;"
                              ref="upload"
                   >
                       <el-button size="small" type="primary">点击上传</el-button>
                       <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且会在上传时过滤掉超过500kb的</div>
                   </el-upload>
               </el-form-item>
               <el-form-item label="配图文字">
                 <el-select style="width:300px;" v-model="form.selectimgname">
                     <el-option v-for="item in form.filelist" :value="item.name" v-if="form.filelist"></el-option>
                 </el-select>
                 <el-input style="width:300px;" type="textarea" v-for="item in form.newsbody" v-model="item.msg" v-if="form.newsbody&&item.imgname==form.selectimgname"></el-input>
               </el-form-item>
           </el-form>
         <span slot="footer" class="dialog-footer">
            <el-button @click="canceldialog">取 消</el-button>
            <el-button type="primary" @click="uploadnews">上 传</el-button>
         </span>
       </el-dialog>
       <el-dialog
                title="上传新闻"
                :visible.sync="spwenzihunpai"
                width="50%"
        >
           <el-form :model="form2" label-width="80px">
               <el-form-item label="新闻类型">
                   <el-select v-model="form2.newstype" placeholder="请选择新闻类型" clearable>
                       <el-option  value="社会"></el-option>
                       <el-option  value="娱乐"></el-option>
                       <el-option  value="明星"></el-option>
                       <el-option  value="生活"></el-option>
                       <el-option  value="政治"></el-option>
                       <el-option  value="军事"></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="作者">
                   <el-input v-model="form2.writer" style="width:200px;"></el-input>
               </el-form-item>
               <el-form-item label="新闻标题">
                   <el-input v-model="form2.label" style="width:300px;"></el-input>
               </el-form-item>
               <el-form-item label="相关视频">
                   <el-upload :auto-upload="false"
                              action=""
                              :on-change="handleChange2"
                              multiple
                              style="width:230px;"
                              ref="upload2"
                   >
                       <el-button size="small" type="primary">点击上传</el-button>
                       <div slot="tip" class="el-upload__tip">只能上传mp4文件，且会在上传时过滤掉超过300mb的</div>
                   </el-upload>
               </el-form-item>
               <el-form-item label="搭配文字">
                   <el-select style="width:300px;" v-model="form2.selectimgname">
                       <el-option v-for="item in form2.filelist" :value="item.name" v-if="form2.filelist"></el-option>
                   </el-select>
                   <el-input style="width:300px;" type="textarea" v-for="item in form2.newsbody" v-model="item.msg" v-if="form2.newsbody&&item.imgname==form2.selectimgname"></el-input>
               </el-form-item>
           </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="canceldialog2">取 消</el-button>
            <el-button type="primary" @click="uploadnews2">确 定</el-button>
          </span>
        </el-dialog>
       <el-dialog
                title="上传新闻"
                :visible.sync="sptpwenzihunpai"
                width="50%"
        >
            <el-form :model="form3" label-width="80px">
                <el-form-item label="新闻类型">
                    <el-select v-model="form3.newstype" placeholder="请选择新闻类型" clearable>
                        <el-option  value="社会"></el-option>
                        <el-option  value="娱乐"></el-option>
                        <el-option  value="明星"></el-option>
                        <el-option  value="生活"></el-option>
                        <el-option  value="政治"></el-option>
                        <el-option  value="军事"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form3.writer" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="新闻标题">
                    <el-input v-model="form3.label" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="相关视频">
                    <el-upload :auto-upload="false"
                               action=""
                               :on-change="handleChange3"
                               multiple
                               style="width:230px;"
                               ref="upload3"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件，且会在上传时过滤掉超过500kb的图片和300mb的MP4</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="搭配文字">
                    <el-select style="width:300px;" v-model="form3.selectimgname">
                        <el-option v-for="item in form3.filelist" :value="item.name" v-if="form3.filelist"></el-option>
                    </el-select>
                    <el-input style="width:300px;" type="textarea" v-for="item in form3.newsbody" v-model="item.msg" v-if="form3.newsbody&&item.imgname==form3.selectimgname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="canceldialog3">取 消</el-button>
            <el-button type="primary" @click="uploadnews3">确 定</el-button>
          </span>
        </el-dialog>
       <div class="progress"><el-progress type="circle" :percentage="progress" :width="100"></el-progress></div>
    </div>
</template>

<script>
    export default {
        name: "uploardnews",
        data() {
            return {
               tuwenhunpai:false,
               spwenzihunpai:false,
               sptpwenzihunpai:false,
               progress_status:'text',
                form:{
                    newstype:'',
                    writer:'',
                    label:'',
                    filelist:[],
                    newsbody:[],
                    selectimgname:'',
                },
                form2:{
                    newstype:'',
                    writer:'',
                    label:'',
                    filelist:[],
                    newsbody:[],
                    selectimgname:'',
                },
                form3:{
                    newstype:'',
                    writer:'',
                    label:'',
                    filelist:[],
                    newsbody:[],
                    selectimgname:'',
                },
                progress:0,
            }
        },
        methods: {
            showdialog(str){//显示表单
                if(str=='图文混排'){
                    this.tuwenhunpai=true;
                }
                if(str=='视频文字混排'){
                    this.spwenzihunpai=true;
                }
                if(str=='视频图片文字混排'){
                    this.sptpwenzihunpai=true
                }
            },
            handleChange(file,filelist){//一次选中多个文件时，此方法会调用多次
                const isJPG = file.raw.type === 'image/jpeg'||file.raw.type === 'image/png';
                const isLt500k = file.size / 1024  < 500;//小于500kb
                if(isJPG&&isLt500k){
                  this.form.newsbody.push({imgname:file.name,msg:''})
                  this.form.filelist.push(file);
                }
                //return isJPG&&isLt500k;
            },
            handleChange2(file,filelist){
                //console.log(file.raw.type);//video/mp4
                const ismp4=file.raw.type==='video/mp4';
                const isLt300m=file.size/1024/1024<300;
                if(ismp4&&isLt300m){
                    this.form2.newsbody.push({imgname:file.name,msg:''})
                    this.form2.filelist.push(file);
                }
                //return ismp4&&isLt300m;
            },
            handleChange3(file,filelist){
                const ismp4=file.raw.type==='video/mp4';
                const isLt300m=file.size/1024/1024<300;
                const isJPG = file.raw.type === 'image/jpeg'||file.raw.type === 'image/png';
                const isLt500k = file.size / 1024  < 500;//小于500kb
                if((ismp4&&isLt300m)||(isJPG&&isLt500k)){
                    this.form3.newsbody.push({imgname:file.name,msg:''});
                    this.form3.filelist.push(file);
                }
            },
            uploadnews(){//上传新闻
               if(!this.form.newstype||!this.form.newsbody||!this.form.writer||!this.form.label||!this.form.filelist){
                   this.$message({
                       message: '请完善新闻的必要信息',
                       type: 'warning'
                   });
                   return;
               }
               var formdata=new FormData();
               var date=new Date();
                //console.log(date.toLocaleString());//2018/12/27 下午2:12:07
               var time=date.toLocaleString().replace(/\//,'年').replace(/\//,'月').replace(/\s/g,'日').replace(/:/,'时').replace(/:/,'分')+'秒';
               formdata.append('pushtime',time);
               formdata.append('news_label',this.form.label);
               formdata.append('news_type',this.form.newstype);
               formdata.append('news_writer',this.form.writer);
               formdata.append('resourse_desc',JSON.stringify(this.form.newsbody.map(function (value, index, array) {
                   return value;
               })));
                this.form.filelist.forEach(function (value, index, array) {
                    formdata.append('files',value.raw);
                });
               var headerconfig={headers:{'Content-Type':'multipart/form-data'}};
               this.$axios.post('/api/upnewsrouter/upload',formdata,headerconfig).then(res=>{
                  if(res.data){
                      this.$message({
                          message: '上传成功',
                          type: 'success'
                      });
                  }
               }).catch(err=>{});
               this.canceldialog();
            },
            uploadnews2(){//上传新闻
                if(!this.form2.newstype||!this.form2.newsbody||!this.form2.writer||!this.form2.label||!this.form2.filelist){
                    // console.log('125');
                    this.$message({
                        message: '请完善新闻的必要信息',
                        type: 'warning'
                    });
                    return;
                }
                this.progress=0;
                var formdata=new FormData();
                var date=new Date();
                var time=date.toLocaleString().replace(/\//,'年').replace(/\//,'月').replace(/\s/g,'日').replace(/:/,'时').replace(/:/,'分')+'秒';
                formdata.append('pushtime',time);
                formdata.append('news_label',this.form2.label);
                formdata.append('news_type',this.form2.newstype);
                formdata.append('news_writer',this.form2.writer);
                formdata.append('resourse_desc',JSON.stringify(this.form2.newsbody.map(function (value, index, array) {
                    return value;
                })));
                this.form2.filelist.forEach(function (value, index, array) {
                    formdata.append('files',value.raw);
                });
                var headerconfig={
                    headers:{'Content-Type':'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                        this.progress = complete;
                    }
                };
                this.$axios.post('/api/upnewsrouter/upload',formdata,headerconfig).then(res=>{
                    if(res.data){
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                    }
                }).catch(err=>{
                });
                this.canceldialog2();
            },
            uploadnews3(){//上传新闻
                if(!this.form3.newstype||!this.form3.newsbody||!this.form3.writer||!this.form3.label||!this.form3.filelist){
                    this.$message({
                        message: '请完善新闻的必要信息',
                        type: 'warning'
                    });
                    return;
                }
                this.progress=0;
                var formdata=new FormData();
                var date=new Date();
                var time=date.toLocaleString().replace(/\//,'年').replace(/\//,'月').replace(/\s/g,'日').replace(/:/,'时').replace(/:/,'分')+'秒';
                formdata.append('pushtime',time);
                formdata.append('news_label',this.form3.label);
                formdata.append('news_type',this.form3.newstype);
                formdata.append('news_writer',this.form3.writer);
                formdata.append('resourse_desc',JSON.stringify(this.form3.newsbody.map(function (value, index, array) {
                    return value;
                })));
                this.form3.filelist.forEach(function (value, index, array) {
                    formdata.append('files',value.raw);
                });
                var headerconfig={
                    headers:{'Content-Type':'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                        this.progress = complete;
                    }
                };
                this.$axios.post('/api/upnewsrouter/upload',formdata,headerconfig).then(res=>{
                    if(res.data){
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                    }
                }).catch(err=>{
                });
                this.canceldialog3();
            },
            canceldialog(){//取消上传
                this.form.filelist=[];
                this.form.label='';
                this.form.newstype='';
                this.form.writer='';
                this.form.selectimgname='';
                this.form.newsbody=[];
                this.tuwenhunpai = false;
                this.$refs.upload.clearFiles();
            },
            canceldialog2(){//取消上传
                this.form2.filelist=[];
                this.form2.label='';
                this.form2.newstype='';
                this.form2.writer='';
                this.form2.selectimgname='';
                this.form2.newsbody=[];
                this.spwenzihunpai = false;
                this.$refs.upload2.clearFiles();
            },
            canceldialog3(){//取消上传
                this.form3.filelist=[];
                this.form3.label='';
                this.form3.newstype='';
                this.form3.writer='';
                this.form3.selectimgname='';
                this.form3.newsbody=[];
                this.sptpwenzihunpai = false;
                this.$refs.upload3.clearFiles();
            }
        },
        created(){

        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
.upload-news{
    width:1000px;
    margin:20px auto;
    background-color: rgba(255,255,255,0.8);
    -moz-box-shadow: 1px 2px 4px rgba(0, 0, 0,0.5);
    -webkit-box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    .main-label{
        font-size:30px;
        font-weight:500;
        font-family:PingFang SC;
        color:green;
        text-align: center;
        margin:20px auto;
    }
    .up-label{
        font-size:30px;
        font-weight:500;
        font-family:PingFang SC;
        color:orange;
    }
    .news-body{
        .box-card{
            margin-left:20px;
            display: inline-block;
            width:300px;
        }
    }
}
</style>