import axios, { AxiosInstance } from 'axios';
class HttpNewController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: any) {
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';

        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }

    async createNew(data: any) {
        try {
            const response = await this.axiosInstance.post(`/news/createNews`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async updateNew(data: any) {
        try {
            const response = await this.axiosInstance.post(`/news/:id`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default HttpNewController;
