import { useState, useEffect } from "react";
import type {
  GrnFormData,
  GrnHeader,
  Vendor,
  Branch,
  AssetSubcategory,
} from "../types";
import API from "../services/axiosInstance";

export const useGRN = () => {
  const [grns, setGrns] = useState<GrnHeader[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [subcategories, setSubcategories] = useState<AssetSubcategory[]>([]);

  const fetchGrns = async () => {
    const response = await API.get("/grns");
    setGrns(response.data);
  };

  const fetchVendors = async () => {
    const response = await API.get("/vendors");
    setVendors(response.data);
  };

  const fetchBranches = async () => {
    const response = await API.get("/branches");
    setBranches(response.data);
  };

  const fetchSubcategories = async () => {
    const response = await API.get("/asset-subcategories");
    setSubcategories(response.data);
  };

  const submitGrn = async (data: GrnFormData) => {
    await API.post("/grns", data);
  };

  useEffect(() => {
    fetchVendors();
    fetchBranches();
    fetchSubcategories();
  }, []);

  return { grns, vendors, branches, subcategories, fetchGrns, submitGrn };
};
