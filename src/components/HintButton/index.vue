<template>
  <span :title="title" style="margin:5px">
    <el-button v-bind="$attrs" @click="handleClick()">{{title}}</el-button>
  </span>
</template>

<script>
export default {
    name:"HintButton",
    props:{
        title:{
            require:true,
            default:'按钮1'
        }
    },
    methods:{
        handleClick(){
            this.$emit('superlistener', 'fjsdkf');
        }
    }
}
</script>
