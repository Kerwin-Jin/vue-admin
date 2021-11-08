<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spuInfo">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
        </el-form-item>

        <el-form-item label="品牌">
            <el-select  placeholder="请选择品牌" v-model="spuInfo.tmId">
                <el-option :label="item.tmName" :value="item.id" v-for="item in trademarkList" :key="item.id"></el-option>
            </el-select>
        </el-form-item>

        <!-- element-ui里面没有textarea，也是使用input去做 -->
        <el-form-item label="SPU描述">
            <el-input type="textarea" rows="4" placeholder="请输入SPU描述" v-model="spuInfo.description"></el-input>
        </el-form-item>

        <!-- :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" -->
        <el-form-item label="SPU图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlePictureSuccess"
            :file-list="imageList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="销售属性">
          <el-select  :placeholder="`还有${unUseSaleAttrList.length}未选择`" v-model="unUseSaleAttr">
              <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="item in unUseSaleAttrList" :key="item.id"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" style="margin-left:10px" @click="addSaleAttr" :disabled="!unUseSaleAttr">添加销售属性</el-button>
          <el-table 
            align="center"
            style="margin-top:20px"
            :data="spuInfo.spuSaleAttrList"
            border>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="属性名"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              label="属性值名称列表">
              <template slot-scope="{row}">
                <el-tag size="medium" closable v-for="(item,index) in row.saleAttrValueList" :key="index" style="margin:3px 3px">{{item.saleAttrValueName}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="row.inputVisible"
                  v-model="row.inputValue"
                  width="100"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
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
        dialogImageUrl: '',
        dialogVisible: false,
        // 这个spuInfo我们内部初始化属性都是空的，是为了添加spu的时候收集数据用的
        // 修改spu的时候，这个spuInfo就会被赋值为请求回来的有数据的对象
        spuInfo:{
          category3Id:"",
          description:"",
          spuImageList:[],
          spuName:"",
          spuSaleAttrList:[],
          tmId:""
        },
        imageList:[],
        trademarkList:[],
        saleAttrList:[],
        unUseSaleAttr:''
      };
    },
    methods: {

      // 移除图片的回调
      handleRemove(file, fileList) {

        // 这里传回了两个参数，file是被删除的图片，fileList是还剩下的图片，这里直接将剩下图片的列表赋值给imageList就行
        console.log(file, fileList);
        this.imageList = fileList;
      },
      // 图片预览的回调
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      // 图片上传成功之后的回调
      handlePictureSuccess(res,file,fileList){
        console.log(res,file,fileList);
        this.imageList = this.fileList;
      },

      getAddSpuFormInitData(){
        console.log('getAddSpuFormInitData');
      },

      async getUpdateSpuFormInitData(spu){
        
        // 根据spuid获取spuinfo
        let spuInfoResult = await this.$API.spu.getSpuInfoById(spu.spuId);
        if(spuInfoResult.code==200){
          this.spuInfo = spuInfoResult.data;
        }

        // 根据spuid获取图片列表
        let imageResult = await this.$API.spu.getImageBySpuId(spu.spuId);
        if(imageResult.code==200){
          this.imageList = imageResult.data.map(item=>{
            return {
              name:item.imgName,
              url:item.imgUrl
            }
          });
        }

        // 获取trademark列表
        let trademarkResult = await this.$API.spu.getTrademark();
        if(trademarkResult.code == 200){
          this.trademarkList = trademarkResult.data;
        }

        // 获取所有销售属性
        let saleAttrResult = await this.$API.spu.getSaleAttr();
        if(saleAttrResult.code == 200){
          this.saleAttrList = saleAttrResult.data;
        }
      },

      // 点击添加销售属性
      addSaleAttr(){
        let [id,name] = this.unUseSaleAttr.split(":");
        // 构造数据
        let item = {
          id,
          name,
          spuSaleAttrValueList:[]
        };
        this.spuInfo.spuSaleAttrList.push(item);

        this.unUseSaleAttr = "";
      },

      // 当用户输入销售属性值完成后失去焦点或者回车的回调
      handleInputConfirm(row){
        let saleAttrValueName = row.inputValue.trim();
        let baseSaleAttrId = row.id;

        if(saleAttrValueName==""){
          this.$message.warning("请输入属性值！");
          row.inputValue = "";
          return;
        }
        let isRepeat = row.saleAttrValueList.some(item=>item.saleAttrValueName == saleAttrValueName);

        if(isRepeat){
          this.$message.warning("属性值重复，请重新输入！");
          row.inputValue = "";
          return;
        }
        let obj = {
          baseSaleAttrId,
          saleAttrValueName
        }
        row.saleAttrValueList.push(obj);
        row.inputVisible = false;
        row.inputValue = "";
      },
      showInput(row){
        // row.inputVisible = true;
        this.$set(row,"inputVisible",true);

        // 点击自动获取焦点
        this.$nextTick(()=>{
          this.$refs.saveTagInput.focus();
        })
      }
    },
    computed:{
      unUseSaleAttrList(){
        return this.saleAttrList.filter(item=>{
          return this.spuInfo.spuSaleAttrList.every(i=>{
            return i.id != item.id;
          });
        })
      }
    }
}
</script>
<style scoped>
.input-new-tag{
  width: 100px;
}
</style>
