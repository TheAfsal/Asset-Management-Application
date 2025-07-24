import { useState, useEffect } from "react";
import type { Vendor } from "../types";
import API from "../services/axiosInstance";

export const useVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const fetchVendors = async () => {
    const response = await API.get("/vendors");
    setVendors(response.data);
  };

  const createVendor = async (data: Vendor) => {
    await API.post("/vendors", data);
    await fetchVendors();
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return { vendors, fetchVendors, createVendor };
};
