import ApiService from '../utils/apiService';
class ProdProcessService {
    constructor() {
        this.apiService = new ApiService();
    }
    //新增生产流程
    async addData(data) {
        await this.uploadVideo(data.steps);
        return this.apiService.post('/api/process/add', data, true)
    }
    //删除生产流程
    deleteData(ids) {
        return this.apiService.post('/api/process/delete', ids, true)
    }
    //修改生产流程
    async updateData(data) {
        await this.uploadVideo(data.steps);
        return this.apiService.post('/api/process/update', data, true)
    }
    //查询生产流程
    getData(companyId) {
        return this.apiService.get('/api/process/get' + companyId, false)
    }
    //查询生产流程列表
    getDataList() {
        return this.apiService.get('/api/process/getlist', {}, true)
    }
    //上传流程视频
    async uploadVideo(steps) {
        //判断data.steps中的video_file是否为文件，如果是文件则上传到oss
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].video_file) {
                let formData = new FormData();
                formData.append('file', steps[i].video_file);
                let res = await this.apiService.post('/api/oss/upload', formData, true);
                console.log(res);
                steps[i].video_url = res.data;
                delete steps[i].video_file; //删除video_file属性，如果不删除，则会认为还未上传
            }
        }
    }
}

export default ProdProcessService;
