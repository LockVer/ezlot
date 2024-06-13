import ApiService from '../utils/apiService';
class ProductService {
    constructor() {
        this.apiService = new ApiService();
    }
    
    //查询产品信息列表
    getDataList() {
        return this.apiService.post('/awards/getList',{}, true)
    }

}

export default ProductService;
