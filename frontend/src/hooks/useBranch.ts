import { useState, useEffect } from "react";
import type { Branch } from "../types";
import API from "../services/axiosInstance";

export const useBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchBranches = async () => {
    try {
      const response = await API.get("/branches");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      throw error;
    }
  };

  const createBranch = async (data: Omit<Branch, "id" | "created_at" | "updated_at">) => {
    try {
      await API.post("/branches", data);
      await fetchBranches();
    } catch (error) {
      console.error("Error creating branch:", error);
      throw error;
    }
  };

  const updateBranch = async (id: number, data: Partial<Branch>) => {
    try {
      await API.put(`/branches/${id}`, data);
      await fetchBranches();
    } catch (error) {
      console.error("Error updating branch:", error);
      throw error;
    }
  };

  const deleteBranch = async (id: number) => {
    try {
      await API.delete(`/branches/${id}`);
      await fetchBranches();
    } catch (error) {
      console.error("Error deleting branch:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, fetchBranches, createBranch, updateBranch, deleteBranch };
};