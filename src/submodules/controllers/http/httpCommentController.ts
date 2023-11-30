import axios, { AxiosInstance } from 'axios';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpCommentController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: AxiosConfig) {
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }
    async addComment(props: any) {
        try {
            const response = await this.axiosInstance.post('/comment/store', props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getCommentByProduct(props: any) {
        try {
            const response = await this.axiosInstance.post('/comment/filter', props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpCommentController;
