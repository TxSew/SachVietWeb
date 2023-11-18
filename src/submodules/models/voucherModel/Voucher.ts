import { Model } from 'sequelize';
import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface Voucher extends BaseModel, Model, Omit<Modified, 'status'> {
    userId?: number;
    discountId?: number;
    code?: string;
}
