import axios, { AxiosInstance } from 'axios';
import { Voucher } from '../../models/voucherModel/Voucher';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpUserAddressController {
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
    async getListUserAddress() {
        try {
            const response = await this.axiosInstance.get('/userAddress/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async createUserAddress(props: any) {
        try {
            const response = await this.axiosInstance.post('/userAddress/createUserAddress', props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async addVoucherUser(props: Voucher) {
        console.log(props);
        try {
            const response = await this.axiosInstance.post('/userAddress/createUserAddress', {
                ...props,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpUserAddressController;
