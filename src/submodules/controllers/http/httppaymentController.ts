import axios, { AxiosInstance } from 'axios';
class HttpPaymentController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: any) {
        // Create an Axios instance with the provided configuration
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';

        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }
    async getPayment(data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`/payment/stripe-payment`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default HttpPaymentController;
