export interface Modified {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  status?: string | null | number;
}
export type DateModified = Omit<Modified, "trashed" | "status">;
