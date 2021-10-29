<template>
  <div>
    <el-card>
      <CategorySelector @handlerCategory="handlerCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px;">

      <!-- 属性列表页面 -->
      <div v-show="isShowList">
        <!-- 添加按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="isShowList = !isShowList" :disabled="!category3Id">添加属性</el-button>
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
              <el-tag v-for="item in row.attrList" :key="item.id" style="margin:2px">{{item.name}}</el-tag>
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
      </div>

      <!-- 添加或者修改的页面 -->
      <div v-show="!isShowList">
        <el-form :inline="true" :model="attrForm">
          <el-form-item label="属性名">
            <el-input  placeholder="请输入属性名" v-model="attrForm.attrName"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="addAttrValue">添加属性值</el-button>
        <el-button>取消</el-button>

        <el-table
          border
          style="margin:20px 0"
          :data="attrForm.attrValueList"
          >
          <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
          <el-table-column label="属性值" align="center">
            <template slot-scope="{row}">
              <el-input v-model="row.attrValue" placeholder="请输入属性值"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="200" label="操作" align="center">
            <template>
              <el-button type="warning" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" disabled>保存</el-button>
        <el-button @click="isShowList = !isShowList">取消</el-button>
      </div>

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
        attrList:[],
        isShowList:true,
        attrForm:{
          attrName:'',
          attrValueList:[],
          categoryId:0,
          categoryLevel:3
        }
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
      },

      addAttrValue(){
        console.log(1);
        this.attrForm.attrValueList.push({
          attrId:this.attrForm.attrId,
          attrValue:''
        });
      }
    }
}
</script>

<style>

</style>