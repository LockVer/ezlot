import ApiService from '../utils/apiService';
class OrderService {
    constructor() {
        this.apiService = new ApiService("");
    }
    getBatchList() {
        return this.apiService.post('/api/order/getbatchcodelist',{}, true)
    }
    importData(data) {
        return this.apiService.post('/api/order/importdata', data, true)
    }
    getDataList(){
        return this.apiService.post('/api/order/getlist',{}, true)
    }
}

export default OrderService;
