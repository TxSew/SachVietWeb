import axios, { AxiosInstance } from 'axios';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpProductController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: AxiosConfig) {
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';
        }
    }
    async getAll(props: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`products/filter`, {
                ...props,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getOne(slug: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`products/${slug}`, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
            });
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
    async updateQuantity(props: any) {
        try {
            const response = await this.axiosInstance.post(`products/updateQuantity`, props);

            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async getProductByCategory(slug: string): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`products/category?slug=${slug}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    async post(product: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`products/store`, product);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async put(id: number, data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.put(`products/update/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async updateProductInventory(props: any) {
        try {
            const response = await this.axiosInstance.post(`products/addProductInventory`, { ...props });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async delete(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.delete(`products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpProductController;
