<template>
  <div id="app">
      <router-link to="/">新闻主页</router-link><br/>
      <router-link to="/login" v-if="username">登录</router-link><br v-if="username"/>
      <router-link to="/uploard" v-if="manager">上传新闻</router-link><br v-if="manager"/>
      <router-link to="/managenews" v-if="manager">管理新闻</router-link><br v-if="manager"/>
      <router-link to="/register">注册</router-link><br/>
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
#app {
   cursor: url("assets/3.png"),auto;
}
</style>
