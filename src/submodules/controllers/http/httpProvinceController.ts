import axios, { AxiosInstance } from 'axios';
import { TProductResponse } from '../../models/ProductModel/Product';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpProviceController {
    get(): TProductResponse | PromiseLike<TProductResponse> {
        throw new Error('Method not implemented.');
    }
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

    async getAll(): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/province');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getDistrict(): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/province/district', {});
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getOrderDetail(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`order/orderDetail/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async getOneUpdate(id: number) {
        try {
            const response = await this.axiosInstance.get(`products/currentUpdate/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async post(discount: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`discount/store`, discount);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async put(id: number, status: any) {
        try {
            const response = await this.axiosInstance.post(`order/update/${id}`, status);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id: number): Promise<any> {
        console.log(id);
        try {
            const response = await this.axiosInstance.delete(`/order/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default HttpProviceController;
