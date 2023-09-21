import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface Discount extends BaseModel, Modified {
  code?: string;
  discount?: string;
  limit_number?: number;
  number_used?: number;
  expiration_date?: string;
  payment_limit?: number;
  desc?: string;
}
