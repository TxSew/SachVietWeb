import axios, { AxiosInstance } from 'axios';
import { TProductResponse } from '../../models/ProductModel/Product';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpDiscountController {
    get(): TProductResponse | PromiseLike<TProductResponse> {
        throw new Error('Method not implemented.');
    }
    private axiosInstance: AxiosInstance;
    constructor(axiosConfig: AxiosConfig) {
        // Create an Axios instance with the provided configuration
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token'!);
        const jwtToken = JSON.parse(token);
        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
    }
    async getAll(props: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post('discount', {
                ...props,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getOne(id: number) {
        try {
            const response = await this.axiosInstance.get(`discount/${id}`);
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
            throw error;
        }
    }
    async put(id: number, data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.put(`discount/update/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.delete(`discount/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpDiscountController;
