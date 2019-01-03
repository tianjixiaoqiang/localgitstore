<template>
    <div class="register-page">
        <el-form v-model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="密 码">
                <el-input type="password" v-model="form.password" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                form:{
                    username:'',
                    password:''
                }
            }
        },
        methods: {
            register(){
                if(!this.form.username||!this.form.password){
                    this.$message({
                        message: '请完善必要信息',
                        type: 'warning'
                    });
                    return;
                }
                this.$axios.post('/api/userrouter/register',{username:this.form.username,password:this.form.password}).then(res=>{
                    if(res.data=='请完善信息'){
                        this.$message({
                            message: '请完善信息',
                            type: 'warning'
                        });
                        return;
                    }
                    if(res.data=='用户名已存在'){
                        this.$message({
                            message: '用户名已存在',
                            type: 'warning'
                        });
                        return;
                    }
                    if(res.data.user._id){
                        this.$store.commit('setuser',{_id:res.data.user._id,username:res.data.user.username,role:res.data.user.role});
                        window.localStorage.tjxqtoken=res.data.token;
                        this.$message({
                            message:'注册成功',
                            type:'success'
                        });
                        this.$router.replace('/');
                    }else{
                        this.$message({
                            message: '出现未知错误',
                            type: 'warning'
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">

</style>