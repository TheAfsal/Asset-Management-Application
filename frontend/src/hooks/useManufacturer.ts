import { useState, useEffect } from "react";
import type { Manufacturer } from "../types";
import API from "../services/axiosInstance";

export const useManufacturer = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  const fetchManufacturers = async () => {
    const response = await API.get("/manufacturers");
    setManufacturers(response.data);
  };

  const createManufacturer = async (data: Manufacturer) => {
    await API.post("/manufacturers", data);
    await fetchManufacturers();
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return { manufacturers, fetchManufacturers, createManufacturer };
};
