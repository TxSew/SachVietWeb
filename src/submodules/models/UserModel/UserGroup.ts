import { BaseModel } from '../BaseModel';
import { Modified } from '../BaseModel/contanst';

export interface UserGroup extends BaseModel, Modified {
  name?: string;
}
