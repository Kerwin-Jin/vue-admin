<template>
  <div>
    <el-card>
      <!-- <CategorySelector></CategorySelector> -->
      <CategorySelector @handlerCategory="handlerCategory" :disabled="isShowList"></CategorySelector>
    </el-card>
    <el-card style="margin:20px 0">
      <el-button type="primary" size="mini" icon="el-icon-plus">添加SPU</el-button>
      <el-table>
        <el-table-column></el-table-column>
      </el-table>
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
        }else if(level == 2){
          this.category2Id = categoryId;
        }else{
          this.category3Id = categoryId;
          this.spuList = this.$API.spu.getSpuList();
        }
      }
    }
    
}
</script>