import axios, { AxiosInstance } from 'axios';
import { Voucher } from '../../models/voucherModel/Voucher';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpVoucherController {
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

    async getAllVoucherByUser() {
        try {
            const response = await this.axiosInstance.post('/voucher');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getAllVoucherByUserIsNull() {
        try {
            const response = await this.axiosInstance.post('/voucher/getVOucherUserIsNull');
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
            throw error;
        }
    }

    async addVoucherUser(props: Voucher) {
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
