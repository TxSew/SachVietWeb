import { BaseModel } from "../BaseModel";
import { Modified } from "../BaseModel/contanst";

export interface Producer extends BaseModel, Modified {
  name?: string;
  code?: string;
  keyword?: string;
}
export interface TProducer {
  totalPage?: number;
  limit?: number;
  page?: number;
  producers?: Producer[];
}
