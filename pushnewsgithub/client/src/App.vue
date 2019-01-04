<template>
  <div id="app">
      <img class="background" src="./assets/background.jpg">
      <div class="main_menu">
          <router-link to="/" class="newsmainpage_a">新闻主页</router-link><br/>
          <router-link to="/login" v-if="username" class="login_a">登录</router-link><br v-if="username"/>
          <router-link to="/uploard" v-if="manager" class="upnews_a">上传新闻</router-link><br v-if="manager"/>
          <router-link to="/managenews" v-if="manager" class="managenews_a">管理新闻</router-link><br v-if="manager"/>
          <router-link to="/register" class="register_a">注册</router-link><br/>
      </div>
      <el-button type="warning" round style="position: fixed;right:10px;top:10px;" @click="logout" v-if="!username">退出系统</el-button>
    <router-view/>
  </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            logout(){
                this.$confirm('确认退出？')
                    .then(()=> {
                        console.log('确认');
                        this.$axios.post('/api/userrouter/logout',{}).then(res=>{
                            //console.log('242424242');
                            //console.log(res.data);
                            if(res.data=='成功退出'){
                                window.localStorage.removeItem('tjxqtoken');
                                this.$store.commit('removeuser');
                                this.$message({
                                    message:'成功退出',
                                    type:'success'
                                });
                            }
                        }).catch(err=>{})
                    })
                    .catch(()=> {});
            }
        },
        computed:{
            username(){
                //console.log('232323')
                //console.log(this.$store.state.user._id?false:true);//先输出true，在输出false
                return this.$store.state.user._id?false:true;
            },
            manager(){
                if(this.$store.state.user.username=='天极小强'){
                    //console.log('shi tjxq');
                    return true;
                }else{
                    return false;
                }
            }
        },
        beforeDestroy(){
            this.$axios.post('/api/userrouter/logout',{}).then(res=>{
            }).catch(err=>{})
        },
        mounted(){

        }
    }
</script>

<style lang="scss">
@import "reset.css";
@import "assets/style.css";
#app {
   .background{
       position:fixed;
       z-index: -1;
       top:0px;
   }
    .main_menu{
        width:100px;
        height:150px;
        border-radius: 5px 5px 5px 5px;
        position: fixed;
        top:20px;
        .newsmainpage_a,.login_a,.upnews_a,.managenews_a,.register_a{
            color:white;
            line-height: 50px;
        }
        .newsmainpage_a:hover{
            color:#7bf2ca;
        }
        .login_a:hover{
            color:#74a4f2;
        }
        .upnews_a:hover{
            color:#a274f2;
        }
        .managenews_a:hover{
            color:#f27dc3;
        }
        .register_a:hover{
            color:#f2da7d;
        }
    }
   cursor: url("assets/3.png"),auto;
}
</style>
