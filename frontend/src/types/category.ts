export interface Category {
  _id: string;
  name: string;
  description?: string;

  parent: string | null;

  status?: "Active" | "Inactive";
  totalProducts?: number;

  children?: Category[];
}