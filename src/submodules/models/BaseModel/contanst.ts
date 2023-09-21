export interface Modified {
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: boolean;
  status?: string;
}
export type DateModified = Omit<Modified, "trashed" | "status"> 
