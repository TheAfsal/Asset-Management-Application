import { useState, useEffect } from "react";
import type { AssetSubcategory } from "../types";
import API from "../services/axiosInstance";

export const useAssetSubcategory = () => {
  const [subcategories, setSubcategories] = useState<AssetSubcategory[]>([]);

  const fetchAssetSubcategories = async () => {
    try {
      const response = await API.get("/asset-subcategories");
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching asset subcategories:", error);
      throw error;
    }
  };

  const createAssetSubcategory = async (data: Omit<AssetSubcategory, "id" | "created_at" | "updated_at">) => {
    try {
      await API.post("/asset-subcategories", data);
      await fetchAssetSubcategories();
    } catch (error) {
      console.error("Error creating asset subcategory:", error);
      throw error;
    }
  };

  const updateAssetSubcategory = async (id: number, data: Partial<AssetSubcategory>) => {
    try {
      await API.put(`/asset-subcategories/${id}`, data);
      await fetchAssetSubcategories();
    } catch (error) {
      console.error("Error updating asset subcategory:", error);
      throw error;
    }
  };

  const deleteAssetSubcategory = async (id: number) => {
    try {
      await API.delete(`/asset-subcategories/${id}`);
      await fetchAssetSubcategories();
    } catch (error) {
      console.error("Error deleting asset subcategory:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAssetSubcategories();
  }, []);

  return {
    subcategories,
    fetchAssetSubcategories,
    createAssetSubcategory,
    updateAssetSubcategory,
    deleteAssetSubcategory,
  };
};
