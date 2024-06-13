import ApiService from '../utils/apiService';
class UserService {
    constructor() {
        this.apiService = new ApiService();
    }
    //新增用户
    addData(data) {
        return this.apiService.post('/api/users/add', data, true)
    }
    //删除用户
    deleteData(ids) {
        return this.apiService.post('/api/users/delete', ids, true)
    }
    //修改用户
    updateData(data) {
        return this.apiService.post('/api/users/update', data, true)
    }
    //查询用户
    getData(companyId) {
        return this.apiService.get('/company/get/' + companyId, false)
    }
    //查询用户列表
    getDataList() {
        return this.apiService.get('/api/users/getlist',{}, true)
    }
}

export default UserService;
