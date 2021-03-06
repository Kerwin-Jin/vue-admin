import service from "@/utils/request"

// attr模块相关的接口

let spuListData = [
    {   
        spuId:101,
        spuName:'HUAWEI P40',
        spuDescription:"HUAWEI P40"
    },
    {   
        spuId:102,
        spuName:'iPhone 13',
        spuDescription:"iPhone 13"
    },
    {   
        spuId:103,
        spuName:'Xiaomi 10',
        spuDescription:"Xiaomi 10"
    }
]
export default{
   getCategory1(){
       return service.get('/admin/product/attr/categoroy1');
   },
   getCategory2(id1){
       switch(id1){
           case 1001:
               return[
                   {id:100101,name:'手机通讯'},
                   {id:100102,name:'运营商'},
                   {id:100103,name:'手机配件'},
                   {id:100104,name:'摄影摄像'},
                   {id:100105,name:'数码配件'}
               ]
            case 1002:
                return [
                    {id:100201,name:'电脑整机'},
                    {id:100202,name:'电脑配件'},
                    {id:100203,name:'游戏设备'}
                ]
            case 1003:
                return [
                    {id:100301,name:'流行男鞋'},
                    {id:100302,name:'运动鞋包'},
                    {id:100303,name:'运动服饰'}
                ]
            default:
                console.log('未传入参数！');
                break;
       }
   },
   getCategory3(id2){
       switch(id2){
           case 100101:
               return [
                   {id:10010101,name:'手机'},
                   {id:10010102,name:'游戏手机'},
                   {id:10010103,name:'5G手机'},
                   {id:10010104,name:'拍照手机'},
                   {id:10010105,name:'全面屏手机'},
                   {id:10010106,name:'对讲机'}
               ]
            case 100102:
                return [
                    {id:10010201,name:'合约机'},
                    {id:10010202,name:'手机卡'},
                    {id:10010204,name:'充话费/流量'},
                    {id:10010205,name:'中国电信'},
                    {id:10010206,name:'中国移动'},
                    {id:10010207,name:'中国联通'}
                ]
            case 100103:
                return [
                    {id:10010301,name:'手机壳'},
                    {id:10010302,name:'贴膜'},
                    {id:10010303,name:'手机存储卡'},
                    {id:10010304,name:'数据线'},
                    {id:10010305,name:'充电器'},
                    {id:10010306,name:'手机耳机'}
                ]
            case 100104:
                return [
                    {id:10010401,name:'数码相机'},
                    {id:10010402,name:'微单相机'},
                    {id:10010403,name:'单反相机'},
                    {id:10010404,name:'拍立得'},
                    {id:10010405,name:'运动相机'},
                    {id:10010406,name:'镜头'}
                ]
            case 100105:
                return [
                    {id:10010501,name:'存储卡'},
                    {id:10010502,name:'三脚架'},
                    {id:10010503,name:'相机包'},
                    {id:10010504,name:'滤镜'},
                    {id:10010505,name:'镜头附件'},
                    {id:10010506,name:'读卡器'}
                ]
            default:
                console.log('未传入参数！');
                break;
       }
   },

   getSpuList(id1,id2,id3){
        if(id1&&id2&&id3){
            return spuListData;
        }else{
            return [];
        }
        
   },
   getSpuInfoById(spuId){
        return service.get(`/admin/product/getSpuById/${spuId}`);
   },

   getImageBySpuId(spuId){
        return service.get(`/admin/product/getImageBySpuId/${spuId}`);
   },

    getTrademark(){
        return service.get(`/admin/product/getTrademark`);
    },

    getSaleAttr(){
        return service.get('/admin/product/getSaleAttr');
    }
}
