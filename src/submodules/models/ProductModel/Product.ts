import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface Product extends BaseModel, Modified {
  title?: string;
  desc?: string;
  producerID?: number;
  categoryId?: number;
  slug?: string;
  price?: number;
  price_sale?: number;
  number?: number;
  image?: string;
  listImage?: string;
   productId?:number;
   cartQuantity?: number;
    files?: string[]
    productImage?: ProductImage[] 
}
 interface ProductImage extends Modified  {
   productId?:number;
   image?:string;

 }

export interface TProductResponse {
  page?: number;
  limit?: number;
  total?: number;
  products?: Product[];
}
