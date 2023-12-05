import { Model } from 'sequelize';
import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface Comment extends BaseModel, Modified, Model {
    userId: number;
    productId: number;
    image: string;
    content: string;
    star: number;
}

export interface CommentImg extends BaseModel, Modified, Model {
    commentId: number;
    images: string;
}
