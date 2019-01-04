<template>
    <div class="shownews">
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
            <ul>
                <li v-for="item in currentpart">
                    <div>
                        <div class="li-head">
                            <span class="spanname">{{item.username}}</span>
                            <el-button type="text">参与讨论</el-button>
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
</template>

<script>
    export default {
        name: "shownews",
        data() {
            return {
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
                        {
                            _id:'dgdgddfdfdfddhh',
                            userid:'fdhdfshdfdfdf',
                            username:'dgdfdf',
                            msgbody:'dsdfdgdfdfhfjdfhdjdhfkdfkdfjksfjkdfkdjfkdjfkdjfdkfjdkfjkdfjdkfjkdfjdkhjhjhjjhkhkkjkndhfskjdfkldjsfkhkgshdkfjkdjfksjfkdsjfksjfskdjfdkgdkjfkdjfdkfjdkjfhjdfhdjfhdjfhjdfhjdhfjdhfjdfhdjfhj',
                            part:'社会',
                            pushtime:'',
                            showtime:'',
                            comments_id:[],
                            praise:[]
                        },
                    ],
                    yulepart:[],
                    mingxingpart:[],
                    shenghuopart:[],
                    zhengzhipart:[],
                    junshipart:[],
                }
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
                  return this.comments.shehuipart;
              }
              if(this.activeName=='yule'){
                  return this.comments.yulepart;
              }
              if(this.activeName=='mingxing'){
                  return this.comments.mingxingpart;
              }
              if(this.activeName=='shenghuo'){
                  return this.comments.shenghuopart;
              }
              if(this.activeName=='zhengzhi'){
                  return this.comments.zhengzhipart;
              }
              if(this.activeName=='junshi'){
                  return this.comments.junshipart;
              }
          }
        },
        watch:{
        },
        methods: {
            /*
            {
                    uptime:'',
                    res_type:'',
                    res_url:'',
                    msg:'',
                    news_writer:'',
                    news_label:''
                }
            */
               init(){
                   //console.log('shownews58');
                   this.$axios.get('/api/upnewsrouter/getnews',{}).then(res=>{
                       if(res.data){
                           //console.log(res.data);
                           if(res.data instanceof Array){
                               res.data.forEach(function (val,index,arr) {
                                   var msgs=val.resourse_desc.map(function (val,index,arr) {
                                       return val.msg;
                                   });
                                  /* var uptime2=val.resourse_url[0].split('/')[2];
                                   var year=uptime2.slice(0,4)+'年';
                                   var month=uptime2.slice(4,6)+'月';
                                   var day=uptime2.slice(6,8)+'日';
                                   var hour=uptime2.slice(8,10)+'时';
                                   var minutes=uptime2.slice(10,12)+'分';
                                   //var second=uptime2.slice(12,14)+'秒';
                                   var uptime=year+month+day+hour+minutes;*/
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
               init3(){
                   this.$axios.get('/api/commentrouter/getallcomments',{}).then(res=>{
                       if(res.data instanceof Array){
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
                               if(val.part=='娱乐'){this.comments.yulepart.push(obj);}
                               if(val.part=='明星'){this.comments.mingxingpart.push(obj);}
                               if(val.part=='生活'){this.comments.shenghuopart.push(obj);}
                               if(val.part=='政治'){this.comments.zhengzhipart.push(obj);}
                               if(val.part=='军事'){this.comments.junshipart.push(obj);}
                           })
                       }else{
                           console.log('无评论数据或发生未知错误');
                       }
                   }).catch(err=>{})
               },
               init2(){
                //console.log('ceshidaima vue156');
                if(!this.$store.state.user._id){
                    //console.log('userbucunzai');
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
               handleClick(tab, event) {
                  this.ulstyle='margin-left:0px;';
                  this.currentstate=0;
               },
               clickleft(){
                   if(this.currentstate==0){
                       return;
                   }else{
                       this.currentstate--;
                       this.ulstyle=`margin-left:${-800*this.currentstate}px;`
                   }
               },
               clickright(){
                   if(this.currentstate>=this.currentlength){
                       return;
                   }else{
                       this.currentstate++;
                       this.ulstyle=`margin-left:${-800*this.currentstate}px;`
                   }
               },
               pushcomment(){
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
               dianzan(commentid){
                   this.currentpart.forEach((val,index,arr)=>{
                       if(val._id==commentid){
                           if(val.praise.indexOf(this.userid)==-1){
                               val.praise.push(this.userid);
                               //这里发送axios请求
                           }else{
                              return;
                           }
                       }
                   })
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
    background-color: white;
    opacity: 0.95;
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
}
</style>