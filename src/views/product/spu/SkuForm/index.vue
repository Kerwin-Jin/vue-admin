<template>
  <div>
    <el-button type="primary">保存</el-button>
    <el-button @click="$emit('update:visible', 1)">取消</el-button>
  </div>
</template>

<script>
export default {
    name:"SkuForm",
    props:['visible']
}
</script>

<style>

</style>