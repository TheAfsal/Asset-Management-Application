import { useState, useEffect } from 'react';
import type { GrnHeader, Vendor, Branch } from '../types';
import API from '../services/axiosInstance';

interface AssetSummary {
  category_name: string;
  branch_name: string;
  asset_count: number;
}

export const useReports = () => {
  const [grns, setGrns] = useState<GrnHeader[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [summaries, setSummaries] = useState<AssetSummary[]>([]);

  const fetchGrns = async () => {
    const response = await API.get('/grns');
    setGrns(response.data);
  };

  const fetchVendors = async () => {
    const response = await API.get('/vendors');
    setVendors(response.data);
  };

  const fetchBranches = async () => {
    const response = await API.get('/branches');
    setBranches(response.data);
  };

  const fetchAssetSummaries = async () => {
    // Mock data for asset summary report
    setSummaries([
      { category_name: 'Electronics', branch_name: 'Main Branch', asset_count: 50 },
      { category_name: 'Furniture', branch_name: 'Branch A', asset_count: 20 },
    ]);
  };

  useEffect(() => {
    fetchVendors();
    fetchBranches();
  }, []);

  return { grns, vendors, branches, summaries, fetchGrns, fetchAssetSummaries };
};