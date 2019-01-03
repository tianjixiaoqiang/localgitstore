<template>
    <div class="shownews">
        <h1 class="main-label">这里是新闻显示页面</h1>
        <el-tabs v-model="activeName" @tab-click="handleClick" style="position: relative;">
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
    </div>
</template>

<script>
    export default {
        name: "shownews",
        data() {
            return {
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
            }
        },
        computed:{
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
               }
        },
        mounted(){
            this.init();
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
        margin:20px auto;
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

}
</style>