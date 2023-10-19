import axios, { AxiosInstance } from "axios";
import { TProductResponse } from "../../models/ProductModel/Product";
import { Producer } from "../../models/producerModel/producer";
import { AxiosConfig } from "../interface/axiosConfig";
class HttpProducerController {
  get(): TProductResponse | PromiseLike<TProductResponse> {
    throw new Error("Method not implemented.");
  }
  private axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosConfig) {
    // Create an Axios instance with the provided configuration
    this.axiosInstance = axios.create(axiosConfig);
    const token: any = localStorage.getItem("token");
    const jwtToken = JSON.parse(token);
    if (jwtToken) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${jwtToken}`;
    }
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          return (window.location.href = "/auth");
        }
        return Promise.reject(error);
      }
    );
  }

  async getAll(page: number = 1): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`producer?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getOne(id: number): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`producer/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async post(producer: Producer) {
    try {
      const response = await this.axiosInstance.post(
        `producer/store`,
        producer
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async put(id: number, data: Producer): Promise<any> {
    try {
      const response = await this.axiosInstance.put(
        `producer/update/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const response = await this.axiosInstance.delete(`/producer/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default HttpProducerController;
