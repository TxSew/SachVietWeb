import { Model } from 'sequelize';
import { Modified } from '../BaseModel/contanst';
import { BaseModel } from '../BaseModel';

export interface User extends Modified, BaseModel, Model {
    fullName?: string;
    password?: string;
    phone?: number;
    userGroup?: number;
    email?: string;
    sex?: number;
    birthday?: Date;
    address?: string;
    confirmPassword?: string;
}
export interface ForgotPassword {
    otp: string;
    email: string;
    token?: string;
    password: string;
    confirmPassword?: string;
}
export interface ChangePassword {
    password: string;
    newPassword: string;
    repeatNewPassword?: string;
}
export interface TUser {
    totalPage: number;
    page: number;
    limit: number;
    Users: User[];
}
