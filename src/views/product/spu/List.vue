<template>
  <div>
    <el-card>
      <!-- <CategorySelector></CategorySelector> -->
      <CategorySelector @handlerCategory="handlerCategory" :disabled="isShowList"></CategorySelector>
    </el-card>
    <el-card style="margin:20px 0">
      <el-button type="primary" size="mini" icon="el-icon-plus">添加SPU</el-button>
      <el-table
        style="margin:20px 0"
        :data=spuList
        border>
        <el-table-column
        type="index" 
        label="序号"
        width="80"
        align="center">
        </el-table-column>
        <el-table-column
        prop="spuName"
        label="SPU名称"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="spuDescription"
        label="SPU描述"
        align="center">
        </el-table-column>
        <el-table-column
        label="操作"
        align="center">
          <template>
            <HintButton type="success" size="mini" title="添加SPU" icon="el-icon-plus"></HintButton>
            <HintButton type="primary" size="mini" title="修改SPU" icon="el-icon-edit"></HintButton>
            <HintButton type="info" size="mini" title="查看SPU" icon="el-icon-info"></HintButton>
            <HintButton type="danger" size="mini" title="删除SPU" icon="el-icon-delete"></HintButton>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50"
        style="text-align:center;">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'Spu',
    data(){
      return{
        category1Id:'',
        category2Id:'',
        category3Id:'',
        spuList:[],
        isShowList:true
      }
    },
    methods:{
      handlerCategory({categoryId,level}){
        if(level == 1){
          this.category1Id = categoryId;
          this.category2Id = "",
          this.category3Id = "",
          this.spuList = [];
        }else if(level == 2){
          this.category2Id = categoryId;
          this.category3Id = "",
          this.spuList = [];
        }else{
          this.category3Id = categoryId;
          this.spuList = this.$API.spu.getSpuList(this.category1Id,this.category2Id,this.category3Id);
        }
      }
    }
    
}
</script>