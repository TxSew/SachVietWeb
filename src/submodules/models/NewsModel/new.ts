import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface New extends BaseModel, Modified {
    title?: string;
    desc?: string;
    slug?: string;
    descShort?: string;
    image: string;
    author?: string;
}
