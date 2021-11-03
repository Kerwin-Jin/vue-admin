<template>
  <div>
    <el-form ref="form" label-width="80px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称"></el-input>
        </el-form-item>

        <el-form-item label="品牌">
            <el-select  placeholder="请选择品牌">
                <el-option label="品牌1" value="shanghai"></el-option>
                <el-option label="品牌2" value="beijing"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="SPU描述">
            <el-input type="textarea" rows="4" placeholder="请输入SPU描述"></el-input>
        </el-form-item>

        <el-form-item label="SPU图片">
           <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item label="销售属性">
          <el-select  placeholder="还有1未选择">
              <el-option label="品牌1" value="shanghai"></el-option>
              <el-option label="品牌2" value="beijing"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" style="margin-left:10px">添加销售属性</el-button>
          <el-table 
            align="center"
            style="margin-top:20px" 
            border>
            <el-table-column
              type="index"
              label="序号"
              width="100">
            </el-table-column>
            <el-table-column
              label="属性名"
              width="180">
            </el-table-column>
            <el-table-column
              label="属性值名称列表">
            </el-table-column>
            <el-table-column
              label="操作">
              <template>
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('update:visible', 1)">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    name:"SpuForm",
    props:['visible'],
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
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

<style scoped>
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