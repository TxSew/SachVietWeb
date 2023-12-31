import axios, { AxiosInstance } from 'axios';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpCartController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: AxiosConfig) {
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        this.axiosInstance = axios.create({
            baseURL: axiosConfig.baseURL,
            headers: {
                Authorization: ` Bearer ${jwtToken} `,
            },
        });
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
    }

    async getAll(props: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`/order`, props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getOrderDetail(id: number) {
        try {
            const response = await this.axiosInstance.get(`order/orderDetail/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async getOrderbyUser(props: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`order/current`, props);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async getOrderAdminbyUser(id: number, props: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`order/orderUser/${id}`, props);
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

    async post(cart: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`order/store`, cart);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async put(id: number, status: any) {
        try {
            const response = await this.axiosInstance.post(`order/update/${id}`, status);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async updateOrderUser(id: number) {
        try {
            const response = await this.axiosInstance.post(`order/updateOrderUser/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.delete(`/order/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async addToCart(data: any) {
        try {
            const response = await this.axiosInstance.post(`order/addToCart`, data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async getCart() {
        try {
            const response = await this.axiosInstance.get(`cart`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}
export default HttpCartController;
