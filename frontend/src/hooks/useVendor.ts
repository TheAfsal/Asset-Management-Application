import { useState, useEffect } from "react";
import type { Vendor } from "../types";
import API from "../services/axiosInstance";

export const useVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const fetchVendors = async () => {
    try {
      const response = await API.get("/vendors");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      throw error;
    }
  };

  const createVendor = async (data: Omit<Vendor, "id" | "created_at" | "updated_at">) => {
    try {
      await API.post("/vendors", data);
      await fetchVendors();
    } catch (error) {
      console.error("Error creating vendor:", error);
      throw error;
    }
  };

  const updateVendor = async (id: number, data: Partial<Vendor>) => {
    try {
      await API.put(`/vendors/${id}`, data);
      await fetchVendors();
    } catch (error) {
      console.error("Error updating vendor:", error);
      throw error;
    }
  };

  const deleteVendor = async (id: number) => {
    try {
      await API.delete(`/vendors/${id}`);
      await fetchVendors();
    } catch (error) {
      console.error("Error deleting vendor:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return { vendors, fetchVendors, createVendor, updateVendor, deleteVendor };
};