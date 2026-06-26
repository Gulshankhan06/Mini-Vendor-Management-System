import api from "../api/axios"; // OR "../api/axios"
import { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data.data; 
};

export const createCategory = async (categoryData: {
  name: string;
  description?: string;
  parent: string | null;
}) => {
  const response = await api.post(
    "/categories",
    categoryData
  );
  return response.data.data;
};

// 

export const updateCategory = async (
  id: string,
  categoryData: {
    name?: string;
    description?: string;
    parent?: string | null;
    status?: "Active" | "Inactive";
  }
) => {
  const response = await api.put(
    `/categories/${id}`,
    categoryData
  );
  return response.data.data;
}; 

export const deleteCategory = async (
  id: string
) => {
  const response = await api.delete(
    `/categories/${id}`
  );
  return response.data;
};