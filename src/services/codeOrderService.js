import ApiService from '../utils/apiService';
class CodeOrderService {
    constructor() {
        this.apiService = new ApiService("http://192.168.1.224:8081/");
    }
    addData(data) {
        return this.apiService.post('/qrCode/generateCode', data, false)
    }
    deleteData(ids) {
        return this.apiService.post('/company/deleteInf', ids, false)
    }
    updateData(data) {
        return this.apiService.post('/order/updateInf', data, false)
    }
    getData(companyId) {
        return this.apiService.get('/company/get/' + companyId, false)
    }
    getDataList() {
        return this.apiService.post('/qrCode/getCodeBatchList',{pageNum:1,pageSize:99999}, false)
    }
    downloadFile(batchCode){
        return this.apiService.downloadFile('/qrCode/downloadCsv?batchCode='+batchCode,batchCode,false)
    }
}

export default CodeOrderService;
