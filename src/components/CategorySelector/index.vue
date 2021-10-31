<template>
  <div>
    <el-form :inline="true" :model="attrForm" class="demo-form-inline" :disabled="!disabled">
        <el-form-item label="一级分类">
            <el-select v-model="attrForm.category1" placeholder="请选择" @change="getCategoryList2">
                <el-option :label="a1.name" :value="a1.id" v-for="a1 in categoryList1" :key="a1.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="attrForm.category2" placeholder="请选择" @change="getCategoryList3">
                <el-option :label="a2.name" :value="a2.id" v-for="a2 in categoryList2" :key="a2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="attrForm.category3" placeholder="请选择" @change="handleSelect3Level">
                <el-option :label="a3.name" :value="a3.id" v-for="a3 in categoryList3" :key="a3.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:"CategorySelector",
    data(){
        return{
            attrForm:{
                category1:'',
                category2:'',
                category3:''
            },
            categoryList1:[],
            categoryList2:[],
            categoryList3:[]
        }
    },
    props:{
      disabled:{type:Boolean,default:true}  
    },
    mounted(){
        this.getCategoryList1();
    },
    methods:{
        // 获取一级分类列表
        async getCategoryList1(){
            let res = await this.$API.attr.getCategory1();
            if(res.code==200){
                this.categoryList1 = res.data;
            }
        },

        // 当一级列表改变的时候触发该函数
        getCategoryList2(){
            this.categoryList2 = [];
            this.categoryList3 = [];
            this.attrForm.category2 = '';
            this.attrForm.category3 = '';

            this.$emit('handlerCategory',{categoryId:this.attrForm.category1,level:1});
            this.categoryList2 = this.$API.attr.getCategory2(this.attrForm.category1);
        },

        // 当二级列表改变的时候触发该函数
        getCategoryList3(){
            this.categoryList3 = [];
            this.attrForm.category3 = '';

            this.$emit('handlerCategory',{categoryId:this.attrForm.category2,level:2});
            this.categoryList3 = this.$API.attr.getCategory3(this.attrForm.category2);
        },

        // 当选中三级分类时，将三级列表的ID传给父组件
        handleSelect3Level(){
            this.$emit('handlerCategory',{categoryId:this.attrForm.category3,level:3});
        }
    }
}
</script>

<style>

</style>