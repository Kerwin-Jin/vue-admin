<template>
  <div>
    <el-card>
      <CategorySelector @handlerCategory="handlerCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px;">
      <!-- 添加按钮 -->
      <el-button icon="el-icon-plus" type="primary">添加属性</el-button>
      <!-- 属性列表的表格 -->
      <el-table
        :data="attrList"
        border
        style="width:100%;margin-top:20px"
        >
        <el-table-column
         type="index"
         label="序号"
         align="center"
         width="80">
        </el-table-column>
        <el-table-column
         label="属性名称"
         prop="attrName"
         align="center"
         width="100">
        </el-table-column>
        <el-table-column
         label="属性值列表"
         prop="attrList"
         align="center">
          <template slot-scope="{row}">
            <el-tag v-for="(item,index) in row.attrList" :key="index" style="margin:2px">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
         label="操作"
         align="center">
         <template>
            <HintButton size="mini" type="warning" icon="el-icon-edit" title="修改"></HintButton>
            <HintButton size="mini" type="danger" icon="el-icon-delete" title="删除"></HintButton>
         </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'Attr',
    data(){
      return{
        category1Id:'',
        category2Id:'',
        category3Id:'',
        attrList:[]
      }
    },
    methods:{
      showInfo(data){
        this.$message.info("点击成功，返回值为:", data);
      },
      handlerCategory({categoryId,level}){
        if(level == 1){
          this.category1Id = categoryId;
          this.category2Id = '';
          this.category3Id = '';
          this.attrList = [];
        }else if(level == 2){
          this.category2Id = categoryId;
          this.category3Id = '';
          this.attrList = [];
        }else{
          this.category3Id = categoryId;
          this.attrList = this.$API.attr.getAttrList(this.category1Id,this.category2Id,this.category3Id);
        }
      }
    }
}
</script>

<style>

</style>