<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>

    <!-- 
      table当中，:data="tableData"，代表的是表格要展示的数组
      当我们写上这个的时候，table会把这个数组给每各列传递一份
      每各列内部都是在展示我们的这个数组数据，v-for
      每个列在展示数据的时候，结构是由我们自己说了算
      其实我们大家要明白，table列内部是有作用域插槽的

      table的列在展示数据的时候，如果我们的数据就是要展示的内容，那么直接写prop就行
      如果我们的数据不是直接展示的数据，而是需要其他的机构，那么必须使用作用域插槽

     -->
    <el-table
      :data="tableData"
      style="width: 100%; margin:20px 0"
      border>

      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

      <el-table-column
        prop="tmName"
        label="品牌名称"
        align="center">
      </el-table-column>

      <el-table-column
        prop="logoUrl"
        label="品牌logo"
        align="center">
        <template slot-scope="{row,$index}">
          <!-- row就代表当前遍历的对象，$index代表当前遍历的下标 -->
          <img :src="row.logoUrl" alt="" width="80px" :data-index="$index">
        </template>
      </el-table-column>

      <el-table-column
        prop="id"
        align="center"
        label="操作"
        width="500">
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="openUpdateDialog(row,$index)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteTrademark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align:center"
      background
      :total="total"
      :current-page="page"
      :page-size="limit"
      :pager-count="5"
      :page-sizes="[1,3,5]"
      @current-change="getTrademarkList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper, ->, sizes, total"
      >
    </el-pagination>

    <!-- 点击添加或者编辑需要展示的对话框 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" style="width:80%" :rules="tmFormRules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" label-width="100px" prop="tmLogoUrl">
          <!-- 在拷贝upload组件的时候，需要把html，css，js代码都拷贝过来 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'Trademark',
    data(){

      // 自定义的验证规则
      // value代表后期要验证的用户输入的数据
      // callback是一个回调函数，如果callback调用的时候传递了参数，代表的是验证失败，如果没有传递参数，代表验证成功
      const validatetmName = (rule, value, callback) => {
        if (value.length < 2 || value.length > 20) {
          callback(new Error('tmName不能小于2位或者大于20位'));
        } else {
          callback();
        }
      }
      return {
          tableData: [],
          total:0,
          page:1,
          limit:3,
          dialogFormVisible:false,

          // tmForm就是我们收集成功的那个品牌对象
          tmForm:{
            tmName:'',
            tmLogoUrl:''
          },
          tmFormRules:{
            tmName:[{ validator:validatetmName, trigger: 'blur' }],   //这里使用自定义校验规则
            tmLogoUrl:[{required:true,message:"请上传图片",trigger:"blur"}]
          }
      }
    },
    mounted(){
      this.getTrademarkList();
    },
    methods:{

      // page = 1的意思是：给了一个默认参数， @current-change="getTrademarkList" 这个函数会把点击的当前页传进来
      async getTrademarkList(page = 1){

        // 将点击的页数赋值给page，然后发送请求
        this.page = page;

        let {data,code} = await this.$API.trademark.getPageList(this.page,this.limit);
        if(code == 200){
          this.tableData = data.records;
          this.total = data.total;
        }else{
          console.log("获取商标列表失败")
        }
      },

      // 当每页数目变化时的回调函数
      handleSizeChange(size){
        this.limit = size;
        this.getTrademarkList();
      },

      // 点击添加按钮打开添加品牌对话框
      openAddDialog(){
        this.tmForm = {
          tmName:'',
          tmLogoUrl:''
        }
        this.dialogFormVisible = true;
      },
      //展示修改对话框
      openUpdateDialog(row,index){
        this.tmForm = {...row, index};
        console.log(this.tmForm);
        this.dialogFormVisible = true;
      },

      // 添加或者修改通过一个函数实现，区别是添加或者修改的标志就是看是否tmForm中有id这个属性，有说明是修改，没有说明是添加
      submitAddOrUpdate(){
        if(this.tmForm.id){
          this.tableData[this.tmForm.index] = this.tmForm;
          // this.tableData.push 是为了能让页面进行更新；这里只是模拟，把data中的数组修改了，真实项目中应该是向后端发请求
          this.tableData.push();
          this.$message.success('修改成功');
        }else{
          this.$message.success('添加成功');
        }
        this.dialogFormVisible = false
      },

      // 删除
      deleteTrademark(row){
        this.$confirm(`是否删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.tableData = this.tableData.filter((item)=>{
            return item.id != row.id;
          });

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 图片上传成功之后的回调函数
      handleAvatarSuccess(res, file) {
        // console.log(res,file);
        // 在这个回调函数中，res代表的是上传成功之后的响应数据，file代表的是上传成功之后的图片文件本身

        // 本身写的这个东西是错的，它也是在手机上传成功之后的图片路径，但是这样的写法只是模拟
        // 它最终收集的是本地的路径，是错的，我们要的是上传成功之后服务器返回来的线上路径
      },

      // 图片上传前的回调，可以用来做图片大小和格式校验
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>