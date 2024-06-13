import ApiService from '../utils/apiService';

class LogsService {
    constructor() {
        this.apiService = new ApiService();
    }

    // 获取最近一个月的日志
    getRecentLogs() {
        return this.apiService.get('/api/logs/recent', {}, true);
    }
}

export default LogsService;
