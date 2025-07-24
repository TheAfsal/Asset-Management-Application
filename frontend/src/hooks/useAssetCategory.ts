import { useState, useEffect } from "react";
import type { AssetCategory } from "../types";
import API from "../services/axiosInstance";

export const useAssetCategory = () => {
  const [categories, setCategories] = useState<AssetCategory[]>([]);

  const fetchAssetCategories = async () => {
    const response = await API.get("/asset-categories");
    setCategories(response.data);
  };

  const createAssetCategory = async (data: AssetCategory) => {
    await API.post("/asset-categories", data);
    await fetchAssetCategories();
  };

  useEffect(() => {
    fetchAssetCategories();
  }, []);

  return { categories, fetchAssetCategories, createAssetCategory };
};
