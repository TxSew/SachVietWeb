export interface Modified {
  createdAt?: string;
  updatedAt?: string;
  deleteAt?: boolean;
  status?: string | null | number;
}
export type DateModified = Omit<Modified, "trashed" | "status">;
