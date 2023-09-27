export interface Province {
  id?: number;
  type?: string;
  name?: string;
  district?: district[];
}
export interface district {
  id?: number;
  name?: string;
  type?: string;
  provinceID?: number;
}
