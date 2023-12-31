import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';
import { Product } from '../ProductModel/Product';
import { User } from '../UserModel/User';

export interface Order extends BaseModel, Modified {
    orderCode?: string;
    userID?: number;
    orderDate?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    money?: number;
    price_ship?: string;
    coupon?: number;
    province?: string;
    district?: string;
    bill?: string;
    address?: string;
    users?: User;
    orderType?: string;
    orderDetail?: OrderDetail[];
    product?: Product;
}
export interface TOrderResponse {
    result: Order;
    detailData: OrderDetail[];
}
export interface TOrders {
    totalPage?: number;
    page?: number;
    limit?: number;
    orders?: Order[];
}
export enum orderStatus {
    cancelOrder,
}
export type OrderHistory = Omit<Order, 'province' | 'district' | 'orderDate' | 'price_ship'>;

export interface OrderDetail extends Modified {
    productId?: number;
    orderID?: number;
    quantity?: number;
    price?: number;
    product?: Product;
}
export enum OrderType {
    COD = 'COD',
    VISA = 'Visa',
}

export interface OrderDto {
    orders?: Order;
    orderDetail?: OrderDetail[];
}
// orderDto {
//   order:Order,
//   orderDetail:or[]
// }
