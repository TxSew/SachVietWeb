import { BaseModel } from "../BaseModel";
import { Modified } from "../BaseModel/contanst";

export interface Category extends BaseModel, Modified {
  name?: string;
  parentId?: string;
  level?: number;
  orders?: number;
  status?: string | number;
  image?: string;
  parentName?: string;
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
