import { useState, useEffect, useCallback } from 'react';
import type { Vendor, Branch, AssetSubcategory, Grn } from '../types';
import API from '../services/axiosInstance';

export const useReports = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [subcategories, setSubcategories] = useState<AssetSubcategory[]>([]);
  const [grns, setGrns] = useState<Grn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVendors = useCallback(async () => {
    try {
      const response = await API.get('/vendors');
      setVendors(response.data);
    } catch (error: any) {
      console.error('Error fetching vendors:', error);
      setError(error.response?.data?.message || 'Failed to fetch vendors');
    }
  }, []);

  const fetchBranches = useCallback(async () => {
    try {
      const response = await API.get('/branches');
      setBranches(response.data);
    } catch (error: any) {
      console.error('Error fetching branches:', error);
      setError(error.response?.data?.message || 'Failed to fetch branches');
    }
  }, []);

  const fetchSubcategories = useCallback(async () => {
    try {
      const response = await API.get('/asset-subcategories');
      setSubcategories(response.data);
    } catch (error: any) {
      console.error('Error fetching subcategories:', error);
      setError(error.response?.data?.message || 'Failed to fetch subcategories');
    }
  }, []);

  const fetchGrns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/report');
      const grnsFromApi: Grn[] = response.data;

      console.log('Fetched GRN report:', grnsFromApi);

      // Filter out malformed GRNs
      const validGrns = grnsFromApi.filter((grn) => {
        if (!grn.header?.id || isNaN(grn.header.id)) {
          console.warn(`Invalid GRN header ID:`, grn);
          return false;
        }
        return true;
      });

      setGrns(validGrns);
      if (validGrns.length === 0) {
        setError('No valid GRNs found.');
      }
    } catch (error: any) {
      console.error('Error fetching GRN report:', error);
      setError(error.response?.data?.message || 'Failed to fetch GRN report');
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchVendors();
    fetchBranches();
    fetchSubcategories();
    fetchGrns();
  }, [fetchVendors, fetchBranches, fetchSubcategories, fetchGrns]);

  return {
    vendors,
    branches,
    subcategories,
    grns,
    loading,
    error,
    fetchGrns,
  };
};