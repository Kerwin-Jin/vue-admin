// 这个文件的目的是把所有的接口整合到一起，然后一起暴露出去
// 引入并暴露可以理解为先引入，引入之后再暴露出去


// 使用引入并暴露的方式，default引入的时候不能简写
export {default as trademark} from "./trademark"
export {default as attr} from "./attr"
export {default as spu} from "./spu"

// 相当于是分别暴露了trademark和attr对象

// 最终暴露出去的是
// {
//     trademark,
//     attr
// }

