import service from "@/utils/request"


export default{
    delete(id){
        return service.delete('/admin/product/baseTrademark/remove/'+id);
    },

    addOrUpdate(trademark){
        // 如果有id，说明是修改
        if(trademark.id){
            return service.put('/admin/product/baseTrademark/update', trademark)
        }else{
            // 没有id说明是在添加
            return service.post('/admin/product/baseTrademark/save', trademark)
        }
    },

    // 查询品牌分页列表数据
    getPageList(page,limit){
        return service.get('/admin/product/baseTrademark/'+page+'/'+limit)
    }
}
