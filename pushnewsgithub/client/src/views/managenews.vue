<template>
    <div class="managenews">
        <h1 class="main-label">这里是新闻编辑界面</h1>
        <div class="managebox">
            <div class="managemenu">
                <el-button type="danger" icon="el-icon-delete" round size="small" @click="deletesome">批量删除</el-button>
                <span>排序:</span>
                <el-select v-model="selectvalue" placeholder="请选择" size="small" style="width:100px;" clearable>
                    <el-option value="日期"></el-option>
                    <el-option value="类型"></el-option>
                    <el-option value="标题"></el-option>
                    <el-option value="作者"></el-option>
                </el-select>
                <el-button type="primary" size="small" @click="sortbycol">切换成{{order}}</el-button>
                <el-select v-model="selectvalue2" placeholder="选择搜索类型" size="small" style="margin-left: 10px;width:150px;" clearable>
                    <el-option value="id"></el-option>
                    <el-option value="日期"></el-option>
                    <el-option value="类型"></el-option>
                    <el-option value="标题"></el-option>
                    <el-option value="作者"></el-option>
                    <el-option value="描述字"></el-option>
                </el-select>
                <el-input v-model="keyword" placeholder="请输入搜索关键字" size="small" style="display: inline-block;width:160px;" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
                <el-button type="primary" size="small" @click="reflush">刷新</el-button>
                <el-button type="primary" size="small" @click="jumptoupnews">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
            <div class="managetabel">
                <el-table
                        :data="pagedata"
                        border
                        @selection-change="handleSelectionChange"
                        >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="新闻id">
                                    <span style="color:#30113a;">{{ props.row._id }}</span>
                                </el-form-item>
                                <el-form-item label="日期">
                                    <span style="color:#11153a;">{{ props.row.date }}</span>
                                </el-form-item>
                                <el-form-item label="类型">
                                    <span style="color:#113a30;">{{ props.row.newstype }}</span>
                                </el-form-item>
                                <el-form-item label="所属标题">
                                    <span style="color:#113a30;">{{ props.row.news_label}}</span>
                                </el-form-item>
                                <el-form-item label="作者">
                                    <span style="color:#183a11;">{{ props.row.writer }}</span>
                                </el-form-item>
                                <el-form-item label="资源">
                                    <img :src="props.row.res_url" v-if="props.row.res_type=='images'">
                                    <video :src="props.row.res_url" v-if="props.row.res_type=='mp4'" controls>

                                    </video>
                                </el-form-item>
                                <el-form-item label="描述文字">
                                    <span style="color:#3a1c11;">{{ props.row.res_msg }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="date"
                            label="日期"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="newstype"
                            label="类型"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="news_label"
                            label="标题"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="writer"
                            label="作者"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            :show-overflow-tooltip="true"
                            prop="res_msg"
                            label="描述文字"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentpage"
                        :page-sizes="[5,10,25,50,100, 200, 300, 400]"
                        :page-size="pagesize"
                        layout="total,sizes, prev, pager, next,jumper"
                        :total="totallength">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="修改信息"
                :visible.sync="editdialogVisible"
                width="50%"
        >
            <el-form :model="form" label-width="80px">
                <el-form-item label="新闻id">
                    <el-input v-model="form._id" style="width:230px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input v-model="form.date" style="width:230px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="相关图片" v-if="form.res_type=='images'">
                    <el-upload :auto-upload="false"
                               action=""
                               :on-change="handleChange1"
                               style="width:230px;"
                               ref="upload5"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不能超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="相关视频" v-if="form.res_type=='mp4'">
                    <el-upload :auto-upload="false"
                               action=""
                               :on-change="handleChange2"
                               style="width:230px;"
                               ref="upload4"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不能超过300mb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="搭配文字">
                    <el-input style="width:300px;" type="textarea" v-model="form.res_msg"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="canceledit">取 消</el-button>
              <el-button type="primary" @click="submitchange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "managenews",
        data() {
            return {
                   deletearr:[],
                   keyword:'',
                   order:'逆序',
                   selectvalue:'',
                   selectvalue2:'',
                   form:{
                       _id:'',
                       date:'',
                       res_type:'',
                       res_msg:'',
                       file:'',
                       res_url:"",
                       change_index:0
                   },
                   tableData:[
                       {
                           _id:'sddsfsgdgdfsfdff',
                           date:'201901010916',
                           newstype:'社会',
                           news_label:'dsd',
                           writer:'天极小强',
                           res_url:'adadasdadsadsadasda',
                           res_type:'images',
                           res_msg:'adsfsfsdsdsdsdsdsdsdsdsdsdsdsdgfdgfgfdfsdgdgdfdfdhfjfffdgfhjgj',
                           delete_url:'',
                           change_index:0
                       }
                   ],
                   searchtableData:[],
                   pagetableData:[],
                   currentpage:1,
                   pagesize:10,
                   editdialogVisible:false,
            }
        },
        methods: {
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
                                var uptime=val.resourse_url[0].split('/')[2];
                                var newstype=val.news_type;
                                var newslabel=val.news_label;
                                var newswriter=val.news_writer;
                                var news_id=val._id;
                                val.resourse_url.forEach(function (val,index,arr) {
                                    var obj={};
                                    var val2='../../../server/'+val;
                                    //if(val2===`../../../server/${val}`){console.log('======')}else{console.log('!=!=!=')}
                                    obj.date=uptime;
                                    obj.res_type=val.split('/')[1];//images or mp4
                                    obj.res_url=require(`../../../server/${val}`);
                                    obj.delete_url=val;
                                    obj.change_index=index;
                                    //obj.res_url=require(val2);
                                    obj.res_msg=msgs[index];
                                    obj.writer=newswriter;
                                    obj.news_label=newslabel;
                                    obj._id=news_id;
                                    obj.newstype=newstype;
                                    this.tableData.push(obj);
                                }.bind(this));
                            }.bind(this))
                        }
                    }else{
                        console.log('res.data不存在')
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            editClick(row){
                //console.log(row);
                this.form._id=row._id;
                this.form.date=row.date;
                this.form.res_type=row.res_type;
                this.form.res_msg=row.res_msg;
                this.form.change_index=row.change_index;
                this.form.res_url=row.delete_url;
                this.editdialogVisible=true;
            },
            handleChange1(file,filelist){//一次选中多个文件时，此方法会调用多次
                const isJPG = file.raw.type === 'image/jpeg'||file.raw.type === 'image/png';
                const isLt500k = file.size / 1024  < 500;//小于500kb
                if(isJPG&&isLt500k){
                    this.form.file=file;
                }else{
                    this.$message({
                        message:'请上传符合要求的文件',
                        type:'warning'
                    })
                }
            },
            handleChange2(file,filelist){//一次选中多个文件时，此方法会调用多次
                const ismp4=file.raw.type==='video/mp4';
                const isLt300m=file.size/1024/1024<300;
                if(ismp4&&isLt300m){
                    this.form.file=file;
                }else{
                    this.$message({
                        message:'请上传符合要求的文件',
                        type:'warning'
                    })
                }
                //return isJPG&&isLt500k;
            },
            canceledit(){
                this.form._id='';
                this.form.date='';
                this.form.res_type='';
                this.form.res_msg='';
                this.form.change_index=0;
                this.form.res_url='';
                this.form.file='';
                this.editdialogVisible=false;
            },
            submitchange(){
                var formdata=new FormData();
                formdata.append('_id',this.form._id);
                formdata.append('res_msg',this.form.res_msg);
                formdata.append('res_url',this.form.res_url);
                formdata.append('changeindex',this.form.change_index);
                formdata.append('date',this.form.date);
                if(this.form.file){
                    formdata.append('file',this.form.file.raw);
                }
                var headerconfig={headers:{'Content-Type':'multipart/form-data'}};
                this.$axios.post('/api/upnewsrouter/changepart',formdata,headerconfig).then(res=>{
                    if(res.data=='修改成功'){
                        this.tableData.forEach(function (val,index,array) {
                            if(val._id==this.form._id&&val.change_index==this.form.change_index){
                                val.res_msg=this.form.res_msg;
                            }
                        }.bind(this));
                        this.searchtableData.forEach(function (val,index,array) {
                            if(val._id==this.form._id&&val.change_index==this.form.change_index){
                                val.res_msg=this.form.res_msg;
                            }
                        }.bind(this));
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        });
                        this.canceledit();
                    }else{
                        this.$message({
                            message:'修改失败',
                            type:'warning'
                        });
                    }
                }).catch(err=>{})
            },
            deleteClick(row){
                var id=row._id;
                var delete_url=row.delete_url;
                console.log(id);
                console.log(delete_url);
                //var delete_msg=row.res_msg;
                this.$axios.post('/api/upnewsrouter/deletepart',{_id:id,delete_url:delete_url}).then(res=>{
                    if(res.data=='删除成功'){
                        this.tableData.forEach(function (val,index,array) {
                            if(val._id==id&&val.delete_url==delete_url){
                                array.splice(index,1);
                            }
                        });
                        this.searchtableData.forEach(function (val,index,array) {
                            if(val._id==id&&val.delete_url==delete_url){
                                array.splice(index,1);
                            }
                        });
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        })
                    }else{
                        console.log('出现删除错误');
                    }
                }).catch(err=>{})
            },
            handleSizeChange(val) {
                this.pagesize=val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
            },
            jumptoupnews(){
                this.$router.replace('/uploard');
            },
            search(){
                if(!this.selectvalue2){
                    this.$message({
                        message:'请选择搜索类型',
                        type:'warning'
                    });
                    return;
                }
                if(!this.keyword){
                    this.$message({
                        message:'请输入关键字',
                        type:'warning'
                    });
                    return;
                }
                var searchtype=this.selectvalue2;
                this.searchtableData=this.tableData.concat();
                var temparr=[];
                var pattern=new RegExp(this.keyword);
                if(searchtype=='id'){
                  this.searchtableData.forEach((val,index,arr)=>{
                      if(pattern.test(val._id)){
                          temparr.push(val);
                      }
                  })
                }
                if(searchtype=='日期'){
                    this.searchtableData.forEach((val,index,arr)=>{
                        if(pattern.test(val.date)){
                            temparr.push(val);
                        }
                    })
                }
                if(searchtype=='类型'){
                    this.searchtableData.forEach((val,index,arr)=>{
                        if(pattern.test(val.newstype)){
                            temparr.push(val);
                        }
                    })
                }
                if(searchtype=='标题'){
                    this.searchtableData.forEach((val,index,arr)=>{
                        if(pattern.test(val.news_label)){
                            temparr.push(val);
                        }
                    })
                }
                if(searchtype=='作者'){
                    this.searchtableData.forEach((val,index,arr)=>{
                        if(pattern.test(val.writer)){
                            temparr.push(val);
                        }
                    })
                }
                if(searchtype=='描述字'){
                    this.searchtableData.forEach((val,index,arr)=>{
                        if(pattern.test(val.res_msg)){
                            temparr.push(val);
                        }
                    })
                }
                this.tableData=temparr;
            },
            reflush(){
                this.tableData=this.searchtableData.concat();
                this.searchtableData=[];
            },
            sortbycol(){
                if(!this.selectvalue){
                    this.$message({
                        message:'请选择排序列',
                        type:"warning"
                    });
                    return;
                }
                if(this.selectvalue=='日期'){
                    if(this.order=='逆序'){
                        this.tableData.sort(function (a,b) {
                            return b.date.localeCompare(a.date);
                        })
                        this.order='顺序';
                    }else{
                        this.tableData.sort(function (a,b) {
                            return a.date.localeCompare(b.date);
                        })
                        this.order='逆序';
                    }
                }
                if(this.selectvalue=='类型'){
                    if(this.order=='逆序'){
                        this.tableData.sort(function (a,b) {
                            return b.newstype.localeCompare(a.newstype,'zh');
                        })
                        this.order='顺序';
                    }else{
                        this.tableData.sort(function (a,b) {
                            return a.newstype.localeCompare(b.newstype,'zh');
                        })
                        this.order='逆序';
                    }
                }
                if(this.selectvalue=='标题'){
                    if(this.order=='逆序'){
                        this.tableData.sort(function (a,b) {
                            return b.news_label.localeCompare(a.news_label,'zh');
                        })
                        this.order='顺序';
                    }else{
                        this.tableData.sort(function (a,b) {
                            return a.news_label.localeCompare(b.news_label,'zh');
                        })
                        this.order='逆序';
                    }
                }
                if(this.selectvalue=='作者'){
                    if(this.order=='逆序'){
                        this.tableData.sort(function (a,b) {
                            return b.writer.localeCompare(a.writer,'zh');
                        })
                        this.order='顺序';
                    }else{
                        this.tableData.sort(function (a,b) {
                            return a.writer.localeCompare(b.writer,'zh');
                        })
                        this.order='逆序';
                    }
                }
            },
            handleSelectionChange(val){
                this.deletearr=val;
            },
            deletesome(){
                this.$confirm('确认删除？', '批量删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    if(this.deletearr.length==0){return;}
                    var deletearr=this.deletearr.map(function (val,index,arr) {
                        return {
                            _id:val._id,
                            res_url:val.delete_url
                        }
                    });
                    this.$axios.post('/api/upnewsrouter/deleteparts',{deletearr:deletearr}).then(res=>{
                        if(res.data=='删除成功'){
                            deletearr.forEach((val,index,arr)=>{
                                this.tableData.forEach((val2,index2,array2)=>{
                                    if(val._id==val2._id&&val.res_url==val2.delete_url){
                                        array2.splice(index2,1);
                                    }
                                });
                                this.searchtableData.forEach((val2,index2,array2)=>{
                                    if(val._id==val2._id&&val.res_url==val2.delete_url){
                                        array2.splice(index2,1);
                                    }
                                });
                            });
                            this.$message({
                                message:'删除成功',
                                type:'success'
                            });
                        }else{
                            this.$message({
                                message:'删除失败',
                                type:'error'
                            })
                        }
                    }).catch(err=>{})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        computed:{
            totallength(){
                return this.tableData.length;
            },
            pagedata(){
                //var pagelength=Math.floor(this.totallength/this.pagesize)+1;
                return this.tableData.slice(this.pagesize*(this.currentpage-1),this.pagesize*this.currentpage);
            }
        },
        mounted(){
            this.init();
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
.managenews{
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
    .managebox{
        .managemenu{
            margin-left:50px;
            margin-bottom:10px;
        }
        .managetabel{
            width:923px;
            margin:0 auto;
            img{
                width:200px;
                height:125px;
                object-fit: cover;
            }
            video{
                width:200px;
                height:125px;
                object-fit: contain;
            }
        }
    }
}
</style>