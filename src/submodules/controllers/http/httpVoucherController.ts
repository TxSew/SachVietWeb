import axios, { AxiosInstance } from 'axios';
import { Voucher } from '../../models/voucherModel/Voucher';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpVoucherController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: AxiosConfig) {
        // Create an Axios instance with the provided configuration
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }
    async getAllVoucherByUser(userId: number) {
        try {
            const response = await this.axiosInstance.post('/voucher/', {
                userId: userId,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getOneVoucher(props: any) {
        try {
            const response = await this.axiosInstance.post('/voucher/getVoucher', props);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async addVoucherUser(props: Voucher) {
        console.log(props);
        try {
            const response = await this.axiosInstance.post('/voucher/add-voucher', {
                ...props,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpVoucherController;
