<template>
    <div class="shownews">
        <div style="opacity: 0.95;">
            <h1 class="main-label">这里是新闻显示页面</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick" style="position: relative;border:1px green solid;">
                <i class="el-icon-arrow-left i-left" @click="clickleft"></i>
                <i class="el-icon-arrow-right i-right" @click="clickright"></i>
                <el-tab-pane label="社会" name="shehui">
                    <div class="shehui">
                        <ul class="shehui-ul" :style="ulstyle2">
                            <li v-for="item in shehui" class="shehui-li">
                                <h3>{{item.news_label}}</h3>
                                <h4>{{item.news_writer}}</h4>
                                <h5>时间:{{item.uptime}}</h5>
                                <img :src="item.res_url" v-if="item.res_type=='images'">
                                <video :src="item.res_url" v-if="item.res_type=='mp4'" controls>

                                </video>
                                <p style="border:1px solid red;height:200px;">{{item.msg}}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="娱乐" name="yule">
                    <div class="shehui">
                        <ul class="shehui-ul" :style="ulstyle2">
                            <li v-for="item in yule" class="shehui-li">
                                <h3>{{item.news_label}}</h3>
                                <h4>{{item.news_writer}}</h4>
                                <h5>时间:{{item.uptime}}</h5>
                                <img :src="item.res_url" v-if="item.res_type=='images'">
                                <video :src="item.res_url" v-if="item.res_type=='mp4'" controls>

                                </video>
                                <p style="border:1px solid red;height:200px;">{{item.msg}}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="明星" name="mingxing">
                    <div class="shehui">
                        <ul class="shehui-ul" :style="ulstyle2">
                            <li v-for="item in mingxing" class="shehui-li">
                                <h3>{{item.news_label}}</h3>
                                <h4>{{item.news_writer}}</h4>
                                <h5>时间:{{item.uptime}}</h5>
                                <img :src="item.res_url" v-if="item.res_type=='images'">
                                <video :src="item.res_url" v-if="item.res_type=='mp4'" controls>

                                </video>
                                <p style="border:1px solid red;height:200px;">{{item.msg}}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="生活" name="shenghuo">
                    <div class="shehui">
                        <ul class="shehui-ul" :style="ulstyle2">
                            <li v-for="item in shenghuo" class="shehui-li">
                                <h3>{{item.news_label}}</h3>
                                <h4>{{item.news_writer}}</h4>
                                <h5>时间:{{item.uptime}}</h5>
                                <img :src="item.res_url" v-if="item.res_type=='images'">
                                <video :src="item.res_url" v-if="item.res_type=='mp4'" controls>

                                </video>
                                <p style="border:1px solid red;height:200px;">{{item.msg}}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="政治" name="zhengzhi">
                    <div class="shehui">
                        <ul class="shehui-ul" :style="ulstyle2">
                            <li v-for="item in zhengzhi" class="shehui-li">
                                <h3>{{item.news_label}}</h3>
                                <h4>{{item.news_writer}}</h4>
                                <h5>时间:{{item.uptime}}</h5>
                                <img :src="item.res_url" v-if="item.res_type=='images'">
                                <video :src="item.res_url" v-if="item.res_type=='mp4'" controls>

                                </video>
                                <p style="border:1px solid red;height:200px;">{{item.msg}}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="军事" name="junshi">
                    <div class="shehui">
                        <ul class="shehui-ul" :style="ulstyle2">
                            <li v-for="item in junshi" class="shehui-li">
                                <h3>{{item.news_label}}</h3>
                                <h4>{{item.news_writer}}</h4>
                                <h5>时间:{{item.uptime}}</h5>
                                <img :src="item.res_url" v-if="item.res_type=='images'">
                                <video :src="item.res_url" v-if="item.res_type=='mp4'" controls>

                                </video>
                                <p style="border:1px solid red;height:200px;">{{item.msg}}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="comments">
                <ul v-if="currentpart">
                    <li v-for="item in currentpart">
                        <div>
                            <div class="li-head">
                                <span class="spanname">{{item.username}}</span>
                                <el-button type="text" @click="joindiscuss(item)">参与讨论</el-button>
                                <span style="float: right;">{{item.praise.length}}</span>
                                <i :class="item.praise.indexOf(userid)!=-1?'icon-appreciatefill':'icon-appreciate'" @click="dianzan(item._id)"></i>
                            </div>
                            <div class="li-body">
                                <p class="spanmsgbody">{{item.msgbody}}</p>
                            </div>
                            <div  class="li-bottom">
                                <span>{{item.showtime}}</span>
                                <span style="margin-left:10px;">{{item.comments_id.length}}回复</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="pinglun" v-if="userid">
                <div class="pinglun-head">
                    <span style="color:white;">所在类型:{{currenttype}}</span>
                    <el-button type="primary" round style="margin-left:20px;" @click="pushcomment">发表评论</el-button>
                </div>
                <div class="pinglun-body">
                    <el-input type="textarea" v-model="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                </div>
            </div>
        </div>
        <el-dialog
                title="讨论区"
                :visible.sync="joindis"
                width="50%"
        >
            <div v-if="joinedcomment" class="discuss-partdialog">
                <div class="discuss-head">
                    <div class="li-head">
                        <span class="spanname">{{joinedcomment.username}}#1楼</span>
                        <span style="float: right;">{{joinedcomment.praise.length||0}}</span>
                        <i :class="joinedcomment.praise.indexOf(userid)!=-1?'icon-appreciatefill':'icon-appreciate'" @click="dianzan(joinedcomment._id)"></i>
                    </div>
                    <div class="li-body">
                        <p class="spanmsgbody">{{joinedcomment.msgbody}}</p>
                    </div>
                    <div  class="li-bottom">
                        <span>{{joinedcomment.showtime}}</span>
                        <span style="margin-left:10px;">{{joinedcomment.comments_id.length||0}}回复</span>
                    </div>
                </div>
                <div class="discuss-body">
                    <ul>
                        <li v-for="item in discusspart">
                            <div>
                                <div class="li-head">
                                    <span class="spanname">{{item.username}}#{{item.louceng}}楼</span>
                                    <span style="float: right;">{{item.praise.length}}</span>
                                    <i :class="item.praise.indexOf(userid)!=-1?'icon-appreciatefill':'icon-appreciate'" @click="dianzan(item._id,'讨论区')"></i>
                                </div>
                                <div class="li-body">
                                    <p class="spanmsgbody">{{item.msgbody}}</p>
                                </div>
                                <div  class="li-bottom">
                                    <span>{{item.showtime}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="discuss-bottom">
                    <div><el-button type="primary" round @click="pushdiscuss">发表讨论</el-button></div>
                    <div class="discuss-textarea">
                        <el-input type="textarea" v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="joindis = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "shownews",
        data() {
            return {
                textarea2:'',
                textarea:'',
                ulstyle:'margin-left:0px;',
                activeName:'shehui',
                shehui:[],
                yule:[],
                mingxing:[],
                shenghuo:[],
                zhengzhi:[],
                junshi:[],
                totallength:0,
                currentstate:0,
                comments:{
                    shehuipart:[
                        //{
                            // _id:'dgdgddfdfdfddhh',
                            // userid:'fdhdfshdfdfdf',
                            // username:'dgdfdf',
                            // msgbody:'dsdfdgdfdfhfjdfhdjdhfkdfkdfjksfjkdfkdjfkdjfkdjfdkfjdkfjkdfjdkfjkdfjdkhjhjhjjhkhkkjkndhfskjdfkldjsfkhkgshdkfjkdjfksjfkdsjfksjfskdjfdkgdkjfkdjfdkfjdkjfhjdfhdjfhdjfhjdfhjdhfjdhfjdfhdjfhj',
                            // part:'社会',
                            // pushtime:'',
                            // showtime:'',
                            // comments_id:[],
                            // praise:[]
                        //},
                    ],
                    yulepart:[],
                    mingxingpart:[],
                    shenghuopart:[],
                    zhengzhipart:[],
                    junshipart:[],
                    discusspartstore:[],
                },
                joindis:false,
                joinedcomment:'',
                discusspart:[],
            }
        },
        computed:{
          currenttype(){
              if(this.activeName=='shehui'){
                  return '社会';
              }
              if(this.activeName=='yule'){
                  return '娱乐';
              }
              if(this.activeName=='mingxing'){
                  return '明星';
              }
              if(this.activeName=='shenghuo'){
                  return '生活';
              }
              if(this.activeName=='zhengzhi'){
                  return '政治';
              }
              if(this.activeName=='junshi'){
                  return '军事';
              }
          },
          currentlength(){
              if(this.activeName=='shehui'){
                  return this.shehui.length-1;
              }
              if(this.activeName=='yule'){
                  return this.yule.length-1;
              }
              if(this.activeName=='mingxing'){
                  return this.mingxing.length-1;
              }
              if(this.activeName=='shenghuo'){
                  return this.shenghuo.length-1;
              }
              if(this.activeName=='zhengzhi'){
                  return this.zhengzhi.length-1;
              }
              if(this.activeName=='junshi'){
                  return this.junshi.length-1;
              }
          },
          ulstyle2(){
              //console.log(this.ulstyle+`height:800px;width:${(this.currentlength+1)*800}px;`);
              return this.ulstyle+`height:800px;width:${(this.currentlength+1)*800}px;`;
          },
          userid(){
              //console.log(this.$store.state.user._id?true:false);
              return this.$store.state.user._id;
          },
          currentpart(){
              if(this.activeName=='shehui'){
                      return this.comments.shehuipart.sort(function (a,b) {
                          return b.praise.length-a.praise.length
                      });
              }
              if(this.activeName=='yule'){
                      return this.comments.yulepart.sort(function (a,b) {
                          return b.praise.length-a.praise.length
                      });
              }
              if(this.activeName=='mingxing'){
                      return this.comments.mingxingpart.sort(function (a,b) {
                          return b.praise.length-a.praise.length
                      });
              }
              if(this.activeName=='shenghuo'){
                      return this.comments.shenghuopart.sort(function (a,b) {
                          return b.praise.length-a.praise.length
                      });
              }
              if(this.activeName=='zhengzhi'){
                      return this.comments.zhengzhipart.sort(function (a,b) {
                          return b.praise.length-a.praise.length
                      });
              }
              if(this.activeName=='junshi'){
                      return this.comments.junshipart.sort(function (a,b) {
                          return b.praise.length-a.praise.length
                      });
              }
          },
        },
        watch:{

        },
        methods: {
            init(){//初始化新闻数据
                   this.$axios.get('/api/upnewsrouter/getnews',{}).then(res=>{
                       if(res.data){
                           if(res.data instanceof Array){
                               res.data.forEach(function (val,index,arr) {
                                   var msgs=val.resourse_desc.map(function (val,index,arr) {
                                       return val.msg;
                                   });
                                   var uptime=val.resourse_url[0].split('/')[2];
                                   var newstype=val.news_type;
                                   var newslabel=val.news_label;
                                   var newswriter=val.news_writer;
                                   if(newstype=='社会'){
                                       val.resourse_url.forEach(function (val,index,arr) {
                                           var obj={};
                                           var val2='../../../server/'+val;
                                           //if(val2===`../../../server/${val}`){console.log('======')}else{console.log('!=!=!=')}
                                           obj.uptime=uptime;
                                           obj.res_type=val.split('/')[1];//images or mp4
                                           obj.res_url=require(`../../../server/${val}`);
                                           //obj.res_url=require(val2);
                                           obj.msg=msgs[index];
                                           obj.news_writer=newswriter;
                                           obj.news_label=newslabel;
                                           this.shehui.push(obj);
                                       }.bind(this))
                                   }
                                   if(newstype=='娱乐'){
                                       val.resourse_url.forEach(function (val,index,arr) {
                                           var obj={};
                                           obj.uptime=uptime;
                                           obj.res_type=val.split('/')[1];//images or mp4
                                           obj.res_url=require(`../../../server/${val}`);
                                           obj.msg=msgs[index];
                                           obj.news_writer=newswriter;
                                           obj.news_label=newslabel;
                                           this.yule.push(obj);
                                       }.bind(this))
                                   }
                                   if(newstype=='明星'){
                                       val.resourse_url.forEach(function (val,index,arr) {
                                           var obj={};
                                           obj.uptime=uptime;
                                           obj.res_type=val.split('/')[1];//images or mp4
                                           obj.res_url=require(`../../../server/${val}`);
                                           obj.msg=msgs[index];
                                           obj.news_writer=newswriter;
                                           obj.news_label=newslabel;
                                           this.mingxing.push(obj);
                                       }.bind(this))
                                   }
                                   if(newstype=='生活'){
                                       val.resourse_url.forEach(function (val,index,arr) {
                                           var obj={};
                                           obj.uptime=uptime;
                                           obj.res_type=val.split('/')[1];//images or mp4
                                           obj.res_url=require(`../../../server/${val}`);
                                           obj.msg=msgs[index];
                                           obj.news_writer=newswriter;
                                           obj.news_label=newslabel;
                                           this.shenghuo.push(obj);
                                       }.bind(this))
                                   }
                                   if(newstype=='政治'){
                                       val.resourse_url.forEach(function (val,index,arr) {
                                           var obj={};
                                           obj.uptime=uptime;
                                           obj.res_type=val.split('/')[1];//images or mp4
                                           obj.res_url=require(`../../../server/${val}`);
                                           obj.msg=msgs[index];
                                           obj.news_writer=newswriter;
                                           obj.news_label=newslabel;
                                           this.zhengzhi.push(obj);
                                       }.bind(this))
                                   }
                                   if(newstype=='军事'){
                                       val.resourse_url.forEach(function (val,index,arr) {
                                           var obj={};
                                           obj.uptime=uptime;
                                           obj.res_type=val.split('/')[1];//images or mp4
                                           obj.res_url=require(`../../../server/${val}`);
                                           obj.msg=msgs[index];
                                           obj.news_writer=newswriter;
                                           obj.news_label=newslabel;
                                           this.junshi.push(obj);
                                       }.bind(this))
                                   }
                               }.bind(this))
                           }

                       }else{
                           console.log('res.data不存在')
                       }
                   }).catch(err=>{
                       console.log(err);
                   })
               },
            init3(){//初始化评论数据
                   this.$axios.get('/api/commentrouter/getallcomments',{}).then(res=>{
                       if(res.data instanceof Array){
                           res.data.reverse();
                           res.data.forEach((val,index,array)=>{
                               var obj=val;
                               var pushtime=new Date(val.pushtime);
                               var cha=Date.now()-pushtime;
                               if(cha<1000*10){
                                   obj.showtime='10秒前';
                               }else
                               if(cha<1000*60){
                                   obj.showtime='1分钟前';
                               }else
                               if(cha<1000*60*60){
                                   obj.showtime=`${Math.floor(cha/1000/60)}分钟前`;
                               }else
                               if(cha<1000*60*60*24){
                                   obj.showtime=`${Math.floor(cha/1000/60/60)}小时前`;
                               }else
                               if(cha<1000*60*60*24*30){
                                   obj.showtime=`${Math.floor(cha/1000/60/60/24)}天前`;
                               }else
                               if(cha<1000*60*60*24*30*12){
                                   obj.showtime=`${Math.floor(cha/1000/60/60/24/30)}月前`;
                               }else{
                                   obj.showtime='很久以前';
                               }
                               if(val.part=='社会'){this.comments.shehuipart.push(obj);}
                               else if(val.part=='娱乐'){this.comments.yulepart.push(obj);}
                               else if(val.part=='明星'){this.comments.mingxingpart.push(obj);}
                               else if(val.part=='生活'){this.comments.shenghuopart.push(obj);}
                               else if(val.part=='政治'){this.comments.zhengzhipart.push(obj);}
                               else if(val.part=='军事'){this.comments.junshipart.push(obj);}
                               else{this.comments.discusspartstore.push(obj);}
                           })
                       }else{
                           console.log('无评论数据或发生未知错误');
                       }
                   }).catch(err=>{})
               },
            init2(){//自动登录
                if(!this.$store.state.user._id){
                    if(window.localStorage.tjxqtoken){
                        this.$axios.post('/api/userrouter/autologin',{token:window.localStorage.tjxqtoken}).then(res=>{
                            //console.log(res.data);
                            if(res.data!='token失效'&&res.data!='token过期'){
                                this.$store.commit('setuser',{_id:res.data._id,username:res.data.username,role:res.data.role});
                            }
                        }).catch(err=>{});
                      }
                   }
                },
            handleClick(tab, event){//切换新闻种类菜单tab时触发
                  this.ulstyle='margin-left:0px;';
                  this.currentstate=0;
               },
            clickleft(){//向左滑动
                   if(this.currentstate==0){
                       return;
                   }else{
                       this.currentstate--;
                       this.ulstyle=`margin-left:${-800*this.currentstate}px;`
                   }
               },
            clickright(){//向右滑动
                   if(this.currentstate>=this.currentlength){
                       return;
                   }else{
                       this.currentstate++;
                       this.ulstyle=`margin-left:${-800*this.currentstate}px;`
                   }
               },
            pushcomment(){//上传评论
                 var userid=this.$store.state.user._id;
                 var username=this.$store.state.user.username;
                 var msgbody=this.textarea;
                 var part=this.currenttype;
                 if(!msgbody.replace(/\s/g,'')){
                     this.$message({
                         message:"内容不能为空",
                         type:'warning'
                     });
                     return;
                 }
                 if(msgbody.length>500){
                     this.$message({
                         message:'内容不能过长',
                         type:'warning'
                     });
                     return;
                 }
                 this.$axios.post('/api/commentrouter/pushcomment',{userid:userid,username:username,msgbody:msgbody,part:part}).then(res=>{
                     if(res.data._id){
                         var obj=res.data;
                         var pushtime=new Date(obj.pushtime);
                         var cha=Date.now()-pushtime;
                         if(cha<1000*10){
                             obj.showtime='10秒前';
                         }else
                         if(cha<1000*60){
                             obj.showtime='1分钟前';
                         }else
                         if(cha<1000*60*60){
                             obj.showtime=`${Math.floor(cha/1000/60)}分钟前`;
                         }else{
                             obj.showtime='刚发的不可能是很久以前吧';
                         }
                         if(part=='社会'){
                             this.comments.shehuipart.push(obj);
                         }
                         if(part=='娱乐'){
                             this.comments.yulepart.push(obj);
                         }
                         if(part=='明星'){
                             this.comments.mingxingpart.push(obj);
                         }
                         if(part=='生活'){
                             this.comments.shenghuopart.push(obj);
                         }
                         if(part=='政治'){
                             this.comments.zhengzhipart.push(obj);
                         }
                         if(part=='军事'){
                             this.comments.junshipart.push(obj);
                         }
                         this.textarea='';
                         this.$message({
                             message:'发表成功',
                             type:'success'
                         })
                     }else{
                         this.$message({
                             message:'发表失败',
                             type:'error'
                         })
                     }
                 }).catch(err=>{
                     this.$message({
                     message:'发表失败',
                     type:'error'
                 })
                 })
               },
            dianzan(commentid,taolunqu){//点赞功能
                   if(!this.userid){
                       this.$message({
                           message:'请先登录',
                           type:'info'
                       });
                       return;
                   }
                   if(taolunqu=='讨论区'){
                       this.discusspart.forEach((val,index,arr)=>{
                           if(val._id==commentid){
                               if(val.praise.indexOf(this.userid)==-1){
                                   val.praise.push(this.userid);
                                   //这里发送axios请求
                                   this.$axios.post('/api/commentrouter/praise',{commentid:commentid,userid:this.userid}).then(res=>{
                                       if(res.data=='点赞成功'){
                                           console.log(res.data);
                                           return;
                                       }
                                       if(res.data=='评论不存在'){
                                           this.$message({
                                               message:'评论不存在',
                                               type:'warning'
                                           })
                                       }
                                   }).catch(err=>{})
                               }else{
                                   console.log('你已经赞啦');
                                   return;
                               }
                           }
                       })
                   }else{
                       this.currentpart.forEach((val,index,arr)=>{
                           if(val._id==commentid){
                               if(val.praise.indexOf(this.userid)==-1){
                                   val.praise.push(this.userid);
                                   //这里发送axios请求
                                   this.$axios.post('/api/commentrouter/praise',{commentid:commentid,userid:this.userid}).then(res=>{
                                       if(res.data=='点赞成功'){
                                           console.log(res.data);
                                           return;
                                       }
                                       if(res.data=='评论不存在'){
                                           this.$message({
                                               message:'评论不存在',
                                               type:'warning'
                                           })
                                       }
                                   }).catch(err=>{})
                               }else{
                                   console.log('你已经赞啦');
                                   return;
                               }
                           }
                       })
                   }
               },
            joindiscuss(item){//参与讨论
                this.joindis=true;
                this.discusspart=[];
                this.joinedcomment=item;
                item.comments_id.forEach((val,index,arr)=>{
                    this.comments.discusspartstore.forEach((val2,index2,arr2)=>{
                        if(val==val2._id){
                           this.discusspart.push(val2);
                        }
                    })
                });
                this.discusspart.sort(function (a,b) {
                    return b.praise.length-a.praise.length;
                });
                var louceng=2;
                this.discusspart.forEach(function (val,index,arr) {
                    val.louceng=louceng;
                    louceng++;
                })
            },
            shutdiscuss(){//关闭讨论，这个方法没有用到
                console.log('guanbidiscuss');
                this.joindis=false;
            },
            pushdiscuss(){//上传讨论
                var joinedcommentid=this.joinedcomment._id;
                var userid=this.userid;
                var username=this.$store.state.user.username;
                var msgbody=this.textarea2;
                var part=this.joinedcomment._id;
                if(!msgbody.replace(/\s/g,'')){
                    this.$message({
                        message:"内容不能为空",
                        type:'warning'
                    });
                    return;
                }
                if(msgbody.length>500){
                    this.$message({
                        message:'内容不能过长',
                        type:'warning'
                    });
                    return;
                }
                this.$axios.post('/api/commentrouter/pushdiscuss',{userid:userid,username:username,msgbody:msgbody,part:part,joinedcommentid:joinedcommentid}).then(res=>{
                    if(res.data._id){
                       res.data.louceng=this.discusspart.length+2;
                        var obj=res.data;
                        var pushtime=new Date(obj.pushtime);
                        var cha=Date.now()-pushtime;
                        if(cha<1000*10){
                            obj.showtime='10秒前';
                        }else
                        if(cha<1000*60){
                            obj.showtime='1分钟前';
                        }else
                        if(cha<1000*60*60){
                            obj.showtime=`${Math.floor(cha/1000/60)}分钟前`;
                        }else{
                            obj.showtime='刚发的不可能是很久以前吧';
                        }
                       this.discusspart.push(obj);
                       this.comments.discusspartstore.push(obj);
                       this.currentpart.forEach((val,index,array)=>{
                           if(val._id==joinedcommentid){
                               val.comments_id.push(res.data._id);
                           }
                       });
                       this.textarea2='';
                       this.$message({
                           message:'发表成功',
                           type:'success'
                       })
                    }
                }).catch(err=>{})
            }
        },
        mounted(){
            this.init();
            this.init3();
            this.init2();
            //window.localStorage.removeItem('tjxqtoken');
            /*this.$nextTick(()=>{
                this.changeurl();
            });*/
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
.shownews{
    border-radius: 10px 10px 0 0;
    background-color: rgba(255,255,255,0.8);
    width:1000px;
    margin:20px auto;
    -moz-box-shadow: 1px 2px 4px rgba(0, 0, 0,0.5);
    -webkit-box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    .main-label{
        font-size:30px;
        font-weight:500;
        font-family:PingFang SC;
        color:green;
        text-align: center;
        margin:40px auto 20px;
    }
    .i-left{
        cursor:pointer;
        font-size:100px;
        &:hover { color: deeppink; }
        position:absolute;
        left:0;
        top:235px;
    }
    .i-right{
        cursor:pointer;
        font-size:100px;
        &:hover { color: deeppink; }
        position:absolute;
        right:0;
        top:235px;
    }
    .shehui{
        width:800px;
        height:800px;
        overflow: hidden;
        margin:0 auto;
        .shehui-ul{
            transition: margin-left ease 0.5s;
            .shehui-li{
                width:800px;
                height:800px;
                display: inline-block;
                overflow: hidden;
                h3{
                    text-align: center;
                    color:#663682;
                    font-size:30px;
                }
                h4{
                    text-align: center;
                    color:#663682;
                    font-size:16px;
                }
                img{
                    width:800px;
                    height:500px;
                    object-fit: cover;

                }
                video{
                    width:800px;
                    height:500px;
                    object-fit: cover;
                }
            }
        }
    }
    .comments{
        ul{
            margin:0 auto;
            width:800px;
        }
        li{
            font-size:20px;
            border-bottom: 1px solid #868889;
            .spanname{
               color:#777782;
            }
            .spanmsgbody{
                line-height:1.35em;
                display: -webkit-box !important;
                overflow: hidden;
                text-overflow:ellipsis;
                word-break:break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
            }
            i{
                float: right;
                cursor: pointer;
            }
            .li-bottom{
                margin-top:5px;
                font-size:16px;
                color:#777782;
            }
        }
    }
    .pinglun{
        position:fixed;
        left:10px;
        top:50%;
        height:300px;
        width:230px;
    }
    .discuss-partdialog{
        .discuss-head{
            font-size:20px;
            border-bottom: 1px solid #868889;
            .li-head{
                font-size:25px;
                .spanname{
                    color:#777782;
                }
                i{
                    float:right;
                    cursor: pointer;
                }
            }
            .li-body{
                .spanmsgbody{
                    line-height:1.35em;
                }
            }
            .li-bottom{
                margin-top:5px;
                font-size:16px;
                color:#777782;
            }
        }
        .discuss-body{
            height:500px;
            overflow-y: auto;
            ul{
                margin:0 auto;
            }
            li{
                font-size:20px;
                padding-bottom:5px;
                margin-bottom:5px;
                border-bottom: 1px solid #868889;
                .spanname{
                    color:#777782;
                }
                .spanmsgbody{
                    line-height:1.35em;
                    display: -webkit-box !important;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    word-break:break-all;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp:2;
                }
                i{
                    float: right;
                    cursor: pointer;
                }
                .li-bottom{
                    margin-top:5px;
                    font-size:16px;
                    color:#777782;
                }
            }
        }
        .discuss-bottom{

        }
    }
}
</style>