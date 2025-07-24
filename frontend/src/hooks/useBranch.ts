import { useState, useEffect } from "react";
import type { Branch } from "../types";
import API from "../services/axiosInstance";

export const useBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchBranches = async () => {
    const response = await API.get("/branches");
    setBranches(response.data);
  };

  const createBranch = async (data: Branch) => {
    await API.post("/branches", data);
    await fetchBranches();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, fetchBranches, createBranch };
};
