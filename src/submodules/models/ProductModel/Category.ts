import { BaseModel } from "../BaseModel";
import { Modified } from "../BaseModel/contanst";

export interface Category extends BaseModel, Modified {
  name?: string;
  parentId?: string;
  level?: number;
  orders?: number;
  subcategories?: [
    {
      id: number;
      name?: string;
      parentId?: string;
      level?: number;
      orders?: number;
    }
  ];
}
interface subcategories {
  id: number;
}
