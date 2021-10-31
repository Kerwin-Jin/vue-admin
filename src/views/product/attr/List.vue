<template>
  <div>
    <el-card>
      <CategorySelector @handlerCategory="handlerCategory" :disabled="isShowList"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px;">

      <!-- 属性列表页面 -->
      <div v-show="isShowList">
        <!-- 添加按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="isShowList = false" :disabled="!category3Id">添加属性</el-button>
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
              <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin:2px">{{item.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="{row}">
              <HintButton size="mini" type="warning" icon="el-icon-edit" title="修改" @click="showUpdateDiv(row)"></HintButton>
              <HintButton size="mini" type="danger" icon="el-icon-delete" title="删除" @click="deleteAttr(row.attrId)"></HintButton>
          </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加或者修改的页面 -->
      <div v-show="!isShowList">
        <el-form :inline="true" :model="attrForm">
          <el-form-item label="属性名">
            <el-input  placeholder="请输入属性名" v-model="attrForm.attrName" ref="attrInput"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="addAttrValue" :disabled="!attrForm.attrName">添加属性值</el-button>
        <el-button @click="backToShowAttrList">取消</el-button>

        <el-table
          border
          style="margin:20px 0"
          :data="attrForm.attrValueList"
          >
          <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
          <el-table-column label="属性值">
            <template slot-scope="{row,$index}">
              <el-input 
              :ref="$index"
              v-model="row.name" 
              placeholder="请输入属性值" 
              v-if="row.isEdit"
              @blur="toLock(row)"
              @keyup.enter.native="toLock(row)" size="mini">
              </el-input>
              <span v-else @click="toEditMode(row,$index)" style="display:block;width:100%;height:100%">{{row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" label="操作" align="center">
            <template slot-scope="{row,$index}">
              <!-- onConfirm点击气泡确认框的确定按钮，会触发一个事件，事件名称是onConfirm，官网写错了 -->
              <el-popconfirm :title="`确定要删除${row.name}属性值吗？`" @onConfirm="attrForm.attrValueList.splice($index,1)">
                <HintButton slot="reference" type="danger" size="mini" icon="el-icon-delete" title="删除属性"></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="save" :disabled="attrForm.attrValueList.length==0">保存</el-button>
        <el-button @click="backToShowAttrList">取消</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep"
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
          // 以后都要记住，data当中不能使用this，获取data当中的另外一个数据，因为data数据是一个对象，初始化的时候，谁先谁后不一定
          // categoryId:this.category3Id
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
      // 点击取消后返回到属性列表展示界面
      backToShowAttrList(){
        this.attrForm={
          attrName:'',
          attrValueList:[],
          // 在这里可以收集category3Id，因为此时data中的数据都准备好了
          categoryId:this.category3Id,
          categoryLevel:3
        };
        this.isShowList = true;
      },
      // 点击添加属性值按钮
      addAttrValue(){
        this.attrForm.attrValueList.push({
          attrId:this.attrForm.attrId,
          name:'',
          isEdit:true   //这个属性值标识着这个属性值的模式是编辑模式，每个属性值都有这个属性要么是true要么是false
        });

        // 让新添加的这个属性值input自动获取焦点，新添加的永远是最后一个
        this.$nextTick(()=>{
          this.$refs[this.attrForm.attrValueList.length-1].focus();
        })
      },

      showUpdateDiv(row){
        // this.attrForm = {...row};  //这次这里使用浅拷贝没办法，因为数组内部是一个对象类型，浅拷贝还是地址
        this.attrForm = cloneDeep(row);

        // 这里代表修改属性，修改属性的时候，属性当中已经存在了一些属性值，这些属性值我们也得添加模式
        // this.attrForm.attrValueList.forEach(item => item.isEdit = false);

        // 这里使用item.isEdit = false给每个属性值添加属性，不是响应式属性
        // Vue当中对数据进行数据监视的时候，只是一开始对数据里面的所有属性做了响应式
        // Object.defineProperty对data当中的每个属性都做了getter和setter做了响应式
        // 但是如果不是一开始就有的属性，不会做监视，既然没做监视，后期添加的这个属性就不是响应式属性
        // 不是响应式属性，那么后期这个属性值改变，页面时不会改变的
        // this.$set 或者 Vue.set为响应式对象添加新属性才是响应式属性
        this.attrForm.attrValueList.forEach(item => this.$set(item, 'isEdit', false));

        this.isShowList = false;
      },

      toLock(row){
        // 是去焦点的时候我们要判断输入框中是否有值，如果没有值或者不合法，不会变为span
        row.name = row.name.trim();
        if(row.name == ''){
          return
        }

        // 当属性值存在的话，就给一个提示
        let isRepeat = this.attrForm.attrValueList.some(item=>{
          if(item !== row) return item.name == row.name; 
        })

        if(isRepeat){
          this.$message.info('输入的属性名称不能重复');
          row.name = '';
          return;
        }

        row.isEdit = false;
      },

      // 对span进行点击的时候，切换为编辑模式
      toEditMode(row,index){
        row.isEdit = true;

        // 从span变为input我们需要自动获取焦点
        // 直接写这一行，input标签其实还没有创建成功，所以报错this.$refs[index]是undefined
        this.$nextTick(()=>{
          this.$refs[index].focus();
        })
      },


      // 点击保存按钮
      save(){
        // 获取参数
        let attr = this.attrForm;

        if(!attr.attrName){
          this.$message.warning("请输入属性名！");
          this.$refs['attrInput'].focus();
          return;
        };

        // 处理参数
        attr.attrValueList = attr.attrValueList.filter(item=>{
          if(item.name.trim() != ''){
            delete item.isEdit;
            this.attrForm={
              attrName:'',
              attrValueList:[],
              // 在这里可以收集category3Id，因为此时data中的数据都准备好了
              categoryId:this.category3Id,
              categoryLevel:3
            };
            return true;
          }
        });

        // 发送请求
        this.$API.attr.addOrUpdateAttr(attr);
        this.$message.success("添加属性成功");
        this.isShowList = true;

        // 重新获取attr列表
        this.attrList = this.$API.attr.getAttrList(this.category1Id,this.category2Id,this.category3Id);
      },

      // 点击删除按钮调用接口进行删除操作
      deleteAttr(attrId){
        this.$API.attr.deleteAttr(attrId);
        // 重新获取attr列表
        this.attrList = this.$API.attr.getAttrList(this.category1Id,this.category2Id,this.category3Id);
      }
    }
}
</script>