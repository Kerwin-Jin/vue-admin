<template>
  <div>
    <el-form :inline="true" :model="attrForm" class="demo-form-inline">
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
            <el-select v-model="attrForm.category3" placeholder="请选择">
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
    mounted(){
        this.getCategoryList1();
    },
    methods:{
        async getCategoryList1(){
            let res = await this.$API.attr.getCategory1();
            if(res.code==200){
                this.categoryList1 = res.data;
            }
        },
        getCategoryList2(){
            this.categoryList2 = [];
            this.categoryList3 = [];
            this.attrForm.category2 = '';
            this.attrForm.category3 = '';

            this.categoryList2 = this.$API.attr.getCategory2(this.attrForm.category1);
        },
        getCategoryList3(){
            this.categoryList3 = [];
            this.attrForm.category3 = '';

            this.categoryList3 = this.$API.attr.getCategory3(this.attrForm.category2);
        }
    }
}
</script>

<style>

</style>