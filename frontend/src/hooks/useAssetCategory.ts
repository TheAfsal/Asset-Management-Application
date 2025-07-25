import { useState, useEffect } from "react";
import type { AssetCategory } from "../types";
import API from "../services/axiosInstance";

export const useAssetCategory = () => {
  const [categories, setCategories] = useState<AssetCategory[]>([]);

  const fetchAssetCategories = async () => {
    try {
      const response = await API.get("/asset-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching asset categories:", error);
      throw error;
    }
  };

  const createAssetCategory = async (data: Omit<AssetCategory, "id" | "created_at" | "updated_at">) => {
    try {
      await API.post("/asset-categories", data);
      await fetchAssetCategories();
    } catch (error) {
      console.error("Error creating asset category:", error);
      throw error;
    }
  };

  const updateAssetCategory = async (id: number, data: Partial<AssetCategory>) => {
    try {
      await API.put(`/asset-categories/${id}`, data);
      await fetchAssetCategories();
    } catch (error) {
      console.error("Error updating asset category:", error);
      throw error;
    }
  };

  const deleteAssetCategory = async (id: number) => {
    try {
      await API.delete(`/asset-categories/${id}`);
      await fetchAssetCategories();
    } catch (error) {
      console.error("Error deleting asset category:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAssetCategories();
  }, []);

  return { categories, fetchAssetCategories, createAssetCategory, updateAssetCategory, deleteAssetCategory };
};