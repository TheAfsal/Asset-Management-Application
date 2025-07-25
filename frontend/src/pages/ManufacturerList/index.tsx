import React, { useState } from "react";
import { useManufacturer } from "../../hooks/useManufacturer";
import ManufacturerTable from "./components/ManufacturerTable";
import ManufacturerForm from "./components/ManufacturerForm";
import ConfirmDialog from "./components/ConfirmDialog";
import { useSnackbar } from "notistack";
import type { Manufacturer } from "../../types";

const ManufacturerList: React.FC = () => {
  const { manufacturers, createManufacturer, updateManufacturer, deleteManufacturer } = useManufacturer();
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Manufacturer | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCreate = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEdit = (manufacturer: Manufacturer) => {
    setEditData(manufacturer);
    setOpenForm(true);
  };

  const handleFormSubmit = async (data: Omit<Manufacturer, "id">, id?: number) => {
    try {
      if (id) {
        await updateManufacturer(id, data);
        enqueueSnackbar("Manufacturer updated successfully", { variant: "success" });
      } else {
        await createManufacturer(data);
        enqueueSnackbar("Manufacturer created successfully", { variant: "success" });
      }
    } catch {
      enqueueSnackbar("Operation failed", { variant: "error" });
    } finally {
      setOpenForm(false);
      setEditData(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteManufacturer(deleteId);
        enqueueSnackbar("Manufacturer deleted", { variant: "info" });
      } catch {
        enqueueSnackbar("Failed to delete", { variant: "error" });
      } finally {
        setConfirmOpen(false);
        setDeleteId(null);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manufacturers</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Manufacturer
        </button>
      </div>

      <ManufacturerTable
        manufacturers={manufacturers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ManufacturerForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editData}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Manufacturer"
        message="Are you sure you want to delete this manufacturer?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManufacturerList;
