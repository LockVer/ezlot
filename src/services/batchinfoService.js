import ApiService from '../utils/apiService';
class BatchinfoService {
    constructor() {
        this.apiService = new ApiService();
    }
    //新增经销商
    async addData(data) {
        await this.uploadVideo(data.test_report_image);
        return this.apiService.post('/api/batchinfo/add', data, true)
    }
    //删除经销商
    deleteData(ids) {
        return this.apiService.post('/api/batchinfo/delete', ids, true)
    }
    //修改经销商
    async updateData(data) {
        await this.uploadVideo(data.test_report_image);
        return this.apiService.post('/api/batchinfo/update', data, true)
    }
    //查询经销商
    getData(companyId) {
        return this.apiService.get('/api/batchinfo/get' + companyId, false)
    }
    //查询经销商列表
    getDataList() {
        return this.apiService.get('/api/batchinfo/getlist',{}, true)
    }
    //上传图片
    async uploadVideo(uploadList){
        //判断uploadList的item是否为file类型，如果是文件则上传到oss
        for(let i=0;i<uploadList.length;i++){
            //判断是否为文件类型
            if(uploadList[i].constructor === File){
                let formData = new FormData();
                formData.append('file', uploadList[i]);
                let res = await this.apiService.post('/api/oss/upload', formData, true);
                console.log(res);
                uploadList[i] = res.data;
            }
        }
    }
}

export default BatchinfoService;
