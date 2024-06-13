import ApiService from '../utils/apiService';
class DealerService {
    constructor() {
        this.apiService = new ApiService();
    }
    //新增经销商
    addData(data) {
        return this.apiService.post('/api/dealer/add', data, true)
    }
    //删除经销商
    deleteData(ids) {
        return this.apiService.post('/api/dealer/delete', ids, true)
    }
    //修改经销商
    updateData(data) {
        return this.apiService.post('/api/dealer/update', data, true)
    }
    //查询经销商
    getData(companyId) {
        return this.apiService.get('/api/dealer/get' + companyId, false)
    }
    //查询经销商列表
    getDataList() {
        return this.apiService.get('/api/dealer/getlist',{}, true)
    }
}

export default DealerService;
