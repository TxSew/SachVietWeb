import axios, { AxiosInstance } from 'axios';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpStatisticalController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: AxiosConfig) {
        // Create an Axios instance with the provided configuration
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }
    async getStatistical(): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/statistical');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getStatisticalByToday() {
        try {
            const response = await this.axiosInstance.get('/statistical/revenueToday');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getTwelveMonthsData(props: any) {
        try {
            const response = await this.axiosInstance.post('/statistical/twelveMonthsData', props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpStatisticalController;
