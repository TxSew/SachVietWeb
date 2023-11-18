import axios, { AxiosInstance } from 'axios';
import { Category } from '../../models/ProductModel/Category';
import { Product } from '../../models/ProductModel/Product';
import { AxiosConfig } from '../interface/axiosConfig';
class HttpCategoryController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: AxiosConfig) {
        // Create an Axios instance with the provided configuration
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);

        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }

    async getCategory(props: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post('category/filter', {
                ...props,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`category?page=${page}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getOne(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`category/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async store(category: Category): Promise<any> {
        try {
            const response = await this.axiosInstance.post(`category/store`, category);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async put(id: number, data: Product): Promise<any> {
        try {
            const response = await this.axiosInstance.put(`/category/update/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.delete(`category/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default HttpCategoryController;
