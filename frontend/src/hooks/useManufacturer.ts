import { useState, useEffect } from "react";
import type { Manufacturer } from "../types";
import API from "../services/axiosInstance";

export const useManufacturer = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  const fetchManufacturers = async () => {
    try {
      const response = await API.get("/manufacturers");
      setManufacturers(response.data);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const createManufacturer = async (data: Omit<Manufacturer, "id" | "created_at" | "updated_at">) => {
    try {
      await API.post("/manufacturers", data);
      await fetchManufacturers();
    } catch (error) {
      console.error("Error creating manufacturer:", error);
      throw error;
    }
  };

  const updateManufacturer = async (id: number, data: Partial<Manufacturer>) => {
    try {
      await API.put(`/manufacturers/${id}`, data);
      await fetchManufacturers();
    } catch (error) {
      console.error("Error updating manufacturer:", error);
      throw error;
    }
  };

  const deleteManufacturer = async (id: number) => {
    try {
      await API.delete(`/manufacturers/${id}`);
      await fetchManufacturers();
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return { manufacturers, fetchManufacturers, createManufacturer, updateManufacturer, deleteManufacturer };
};