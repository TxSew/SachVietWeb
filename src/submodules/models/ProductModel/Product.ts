import { BaseModel } from "../BaseModel";
import { Modified } from "../BaseModel/contanst";
import { Producer } from "../producerModel/producer";
import { Category } from "./Category";

export interface Product extends BaseModel, Modified {
  title?: string;
  product?: any;
  desc?: string;
  producerID?: number;
  categoryId?: number;
  slug?: string;
  price?: number;
  price_sale?: number;
  quantity?: number;
  image?: string;
  listImage?: string;
  productId?: number;
  author?: string;
  cartQuantity?: number;
  files?: string[];
  productImages?: ProductImage[];
  category?: Category;
  producer?: Producer;
}
interface ProductImage extends Modified {
  productId?: number;
  image?: string;
}

export interface TProductResponse {
  page?: number;
  limit?: number;
  total?: number;
  products?: Product[];
}
