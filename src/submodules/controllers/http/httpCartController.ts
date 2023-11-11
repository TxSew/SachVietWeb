import axios, { AxiosInstance } from "axios";
import { TProductResponse } from "../../models/ProductModel/Product";
import { AxiosConfig } from "../interface/axiosConfig";
class HttpCartController {
  get(): TProductResponse | PromiseLike<TProductResponse> {
    throw new Error("Method not implemented.");
  }
  private axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosConfig) {
    this.axiosInstance = axios.create(axiosConfig);
    const token: any = localStorage.getItem("token");
    const jwtToken = JSON.parse(token!);
    if (jwtToken) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${jwtToken}`;
    }
  }

  async getAll(props: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post(`/order`, {
        ...props,
      });
      return response.data;
    } catch (error) {
      throw error;
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
  async getOrderbyUser(id: number): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`order/current/${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  async getOneUpdate(id: number) {
    try {
      const response = await this.axiosInstance.get(
        `products/currentUpdate/${id}`
      );
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
      const response = await this.axiosInstance.post(
        `order/update/${id}`,
        status
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<any> {
    console.log(id);
    try {
      const response = await this.axiosInstance.delete(`/order/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default HttpCartController;
