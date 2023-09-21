import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosConfig } from '../interface/axiosConfig';
import { Product, TProductResponse } from '../../models/ProductModel/Product';
class HttpCategoryController {
  get(): TProductResponse | PromiseLike<TProductResponse> {
    throw new Error("Method not implemented.");
  }
  private axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosConfig) {
    // Create an Axios instance with the provided configuration
    this.axiosInstance = axios.create(axiosConfig);
   const token:any =  localStorage.getItem('token')
       const jwtToken = JSON.parse(token)
        if (jwtToken) {
          this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
        }

        this.axiosInstance.interceptors.response.use((response) => {
          return response;
      }, (error) => {
              if (error.response.status === 401) {
      
                  return window.location.href = '/auth'
              }
          return Promise.reject(error);
      });

  }

  async getAll(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('category');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
   async getOne(slug:string) : Promise<any> {
     try {
       const response = await this.axiosInstance.get(`products/${slug}`) 
        return response.data
     } 
      catch (err) {
         throw err
      }
   }

  async post(  product: Product): Promise<any> {
    try {
      const response = await this.axiosInstance.post(
        `products/store`,
        product,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async put(id: number, data: Product): Promise<any> {
    try {
      const response = await this.axiosInstance.put(
        'update',
        id,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(url: string, id: number): Promise<any> {
    try {
      const response = await this.axiosInstance.delete(
        url,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default HttpCategoryController;
