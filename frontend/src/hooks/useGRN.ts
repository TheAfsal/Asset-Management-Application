import { useState, useEffect, useCallback } from 'react';
import type { GrnHeader, GrnFormData, Vendor, Branch, AssetSubcategory } from '../types';
import API from '../services/axiosInstance';

export const useGRN = () => {
  const [grns, setGrns] = useState<GrnHeader[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [subcategories, setSubcategories] = useState<AssetSubcategory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGrns = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/grns');
      setGrns(response.data);
    } catch (error) {
      console.error('Error fetching GRNs:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVendors = useCallback(async () => {
    try {
      const response = await API.get('/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  }, []);

  const fetchBranches = useCallback(async () => {
    try {
      const response = await API.get('/branches');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  }, []);

  const fetchSubcategories = useCallback(async () => {
    try {
      const response = await API.get('/asset-subcategories');
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  }, []);

  const getGrnById = useCallback(async (id: number): Promise<GrnFormData> => {
    try {
      const response = await API.get(`/grns/${id}`);
      // Ensure grn_date is formatted as YYYY-MM-DD
      const grnData = response.data as GrnFormData;
      return {
        header: {
          ...grnData.header,
          grn_date: new Date(grnData.header.grn_date).toISOString().split('T')[0], // Format to YYYY-MM-DD
        },
        lineItems: grnData.lineItems.map(item => ({
          ...item,
          taxable_value: item.taxable_value ?? item.quantity * item.unit_price,
          total_amount: item.total_amount ?? item.quantity * item.unit_price * (1 + item.tax_percent / 100),
        })),
      };
    } catch (error) {
      console.error(`Error fetching GRN ${id}:`, error);
      throw error;
    }
  }, []);

  const submitGrn = useCallback(async (data: GrnFormData) => {
    try {
      await API.post('/grns', data);
      await fetchGrns();
    } catch (error) {
      console.error('Error submitting GRN:', error);
      throw error;
    }
  }, [fetchGrns]);

  const updateGrn = useCallback(async (id: number, data: GrnFormData) => {
    try {
      await API.put(`/grns/${id}`, data);
      await fetchGrns();
    } catch (error) {
      console.error(`Error updating GRN ${id}:`, error);
      throw error;
    }
  }, [fetchGrns]);

  const deleteGrn = useCallback(async (id: number) => {
    try {
      await API.delete(`/grns/${id}`);
      await fetchGrns();
    } catch (error) {
      console.error(`Error deleting GRN ${id}:`, error);
      throw error;
    }
  }, [fetchGrns]);

  useEffect(() => {
    fetchGrns();
    fetchVendors();
    fetchBranches();
    fetchSubcategories();
  }, [fetchGrns, fetchVendors, fetchBranches, fetchSubcategories]);

  return {
    grns,
    vendors,
    branches,
    subcategories,
    loading,
    fetchGrns,
    submitGrn,
    getGrnById,
    updateGrn,
    deleteGrn,
  };
};