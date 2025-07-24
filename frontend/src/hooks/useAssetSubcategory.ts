import { useState, useEffect } from 'react';
import type { AssetSubcategory } from '../types';
import API from '../services/axiosInstance';

export const useAssetSubcategory = () => {
  const [subcategories, setSubcategories] = useState<AssetSubcategory[]>([]);

  const fetchAssetSubcategories = async () => {
    const response = await API.get('/asset-subcategories');
    setSubcategories(response.data);
  };

  const createAssetSubcategory = async (data: AssetSubcategory) => {
    await API.post('/asset-subcategories', data);
    await fetchAssetSubcategories();
  };

  useEffect(() => {
    fetchAssetSubcategories();
  }, []);

  return { subcategories, fetchAssetSubcategories, createAssetSubcategory };
};