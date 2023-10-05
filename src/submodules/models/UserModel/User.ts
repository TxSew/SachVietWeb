import { Model } from "sequelize";
import { Modified } from "../BaseModel/contanst";
import { BaseModel } from "../BaseModel";

export interface User extends Modified, BaseModel, Model {
  fullName?: string;
  password?: string;
  phone?: number;
  userGroup?: number;
  email?: string;
  address?: string;
}

export interface TUser {
  totalPage: number;
  page: number;
  limit: number;
  Users: User[];
}
