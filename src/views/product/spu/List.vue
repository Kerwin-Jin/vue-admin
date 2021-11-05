<template>
  <div>
    <el-card>
      <!-- <CategorySelector></CategorySelector> -->
      <CategorySelector @handlerCategory="handlerCategory" :disabled="isShowList"></CategorySelector>
    </el-card>
    <el-card style="margin:20px 0">

      <!-- spu的列表页面 -->
      <div v-show="activeDiv==1">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddSpuDiv" :disabled="!category3Id">添加SPU</el-button>
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
            <template slot-scope="{row}">
              <HintButton type="success" size="mini" title="添加SKU" icon="el-icon-plus" @click="showAddSpuDiv"></HintButton>
              <HintButton type="primary" size="mini" title="修改SPU" icon="el-icon-edit" @click="showUpdateDiv(row)"></HintButton>
              <HintButton type="info" size="mini" title="查看SPU" icon="el-icon-info"></HintButton>
              <HintButton type="danger" size="mini" title="删除SPU" icon="el-icon-delete"></HintButton>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          v-if="spuList.length"
          small
          layout="prev, pager, next"
          :total="50"
          style="text-align:center;">
        </el-pagination>
      </div>



      <!-- spu的添加和修改页面 -->
      <!-- <SpuForm v-show="activeDiv==2" :visible="activeDiv" @update:visible="activeDiv = $event"></SpuForm> -->
      <SpuForm v-show="activeDiv==2" :visible.sync="activeDiv" ref="spu"></SpuForm>

      <!-- sku的添加页面 -->
      <SkuForm v-show="activeDiv==3" :visible.sync="activeDiv" ref="sku"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm"
import SkuForm from "./SkuForm"
export default {
    name:'Spu',
    components:{SpuForm,SkuForm},
    data(){
      return{
        category1Id:'',
        category2Id:'',
        category3Id:'',
        spuList:[],
        isShowList:true,
        activeDiv:1
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
      },

      // 展示更新Spu的DIV
      showUpdateDiv(row){
        // 显示更新Spu的DIV
        this.activeDiv = 2;
        this.$refs.spu.getUpdateSpuFormInitData(row);
      },

      // 展示添加Spu的DIV
      showAddSpuDiv(){
        this.activeDiv = 3;
        this.$refs.spu.getAddSpuFormInitData();
      }

    }
    
}
</script>