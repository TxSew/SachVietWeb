import axios, { AxiosInstance } from "axios";
import { TProductResponse } from "../../models/ProductModel/Product";
import { AxiosConfig } from "../interface/axiosConfig";
class HttpStatisticalController {
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
  async getStatistical(): Promise<any> {
    try {
      const response = await this.axiosInstance.get("/statistical");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default HttpStatisticalController;
