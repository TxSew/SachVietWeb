import axios, { AxiosInstance } from 'axios';
import { User } from '../../models/UserModel/User';
class HttpAccountController {
    private axiosInstance: AxiosInstance;

    constructor(axiosConfig: any) {
        this.axiosInstance = axios.create(axiosConfig);
        const token: any = localStorage.getItem('token');
        const jwtToken = JSON.parse(token!);
        console.log(jwtToken);
        this.axiosInstance.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';

        if (jwtToken) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    }
    async getAll(props: any) {
        try {
            const response = await this.axiosInstance.post(`/users`, props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(account: User) {
        try {
            const response = await this.axiosInstance.post('auth/login', account);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async loginGoogle(props: string) {
        try {
            const response = await this.axiosInstance.post('auth/loginGoogle', props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(account: User) {
        try {
            const response = await this.axiosInstance.post('auth/changePassword', account);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(account: User) {
        try {
            const response = await this.axiosInstance.post('auth/register', account);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(url: string) {
        try {
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async sendOtp(props: string) {
        try {
            const response = await this.axiosInstance.post(`forgotPassword/send-otp-email`, {
                email: props,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async verifyOtpAndResetPassword(props: any) {
        try {
            const response = await this.axiosInstance.post(`forgotPassword/verify-otp-email-resetPassword`, {
                ...props,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getMe() {
        try {
            const response = await this.axiosInstance.get(`users/getMe`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async updateUser(props: any) {
        try {
            const response = await this.axiosInstance.post(`users/updateUser`, props);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default HttpAccountController;
