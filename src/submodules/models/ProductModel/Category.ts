import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface Category extends BaseModel, Modified {
  name?: string;
  parentId?: string;
  level?: number;
  orders?: number;
}
interface subcategories {
  id:number
}
interface Subcategories extends Category {
  subcategories : subcategories[
    
  ]
}
 interface TOrderResponse {
   Category: Category;

   SubCategory: Subcategories[]
 }
