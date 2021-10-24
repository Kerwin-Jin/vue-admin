<template>
  <div>
    <el-card>
      <CategorySelector></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px;">
      <HintButton type="warning" size="mini" title="tips" @superlistener="showInfo"></HintButton>
      <HintButton></HintButton>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'Attr',
    methods:{
      showInfo(data){
        this.$message.info("点击成功，返回值为:", data);
      }
    }
}
</script>

<style>

</style>