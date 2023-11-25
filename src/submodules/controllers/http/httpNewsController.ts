import axios, { AxiosInstance } from 'axios';
class HttpNewController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: any) {
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';

        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }

    async getList(props: any) {
        try {
            const response = await this.axiosInstance.post(`/news/filter`, props);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getOne(id: number) {
        try {
            const response = await this.axiosInstance.get(`/news/getMe/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getDetail(slug: string) {
        try {
            const response = await this.axiosInstance.get(`/news/detail/${slug}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async createNew(data: any) {
        try {
            const response = await this.axiosInstance.post(`/news/createNews`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async updateNew(data: any) {
        try {
            const response = await this.axiosInstance.post(`/news/updateNews`, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteNew(id: number) {
        try {
            const response = await this.axiosInstance.delete(`/news/removeNews/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default HttpNewController;
