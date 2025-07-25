import { useState } from "react";
import { useSnackbar } from "notistack";
import { useVendor } from "../../hooks/useVendor";
import type { Vendor } from "../../types";
import VendorTable from "./components/VendorTable";
import CreateVendorDialog from "./components/CreateVendorDialog";
import EditVendorDialog from "./components/EditVendorDialog";
import ConfirmDialog from "./components/ConfirmDialog";

const VendorList: React.FC = () => {
  const { vendors, createVendor, updateVendor, deleteVendor } = useVendor();
  const { enqueueSnackbar } = useSnackbar();

  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleCreate = async (vendor: Omit<Vendor, "id">) => {
    try {
      await createVendor(vendor);
      enqueueSnackbar("Vendor created successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to create vendor", { variant: "error" });
    }
  };

  const handleUpdate = async (vendor: Vendor) => {
    try {
      await updateVendor(vendor.id, vendor);
      enqueueSnackbar("Vendor updated successfully", { variant: "success" });
      setEditVendor(null);
    } catch {
      enqueueSnackbar("Failed to update vendor", { variant: "error" });
    }
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteVendor(deleteId);
        enqueueSnackbar("Vendor deleted", { variant: "success" });
      } catch {
        enqueueSnackbar("Failed to delete vendor", { variant: "error" });
      } finally {
        setDeleteId(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Vendor
        </button>
      </div>
      <VendorTable
        vendors={vendors}
        onEdit={setEditVendor}
        onDelete={(id) => setDeleteId(id)}
      />
      <CreateVendorDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSave={handleCreate}
      />
      {editVendor && (
        <EditVendorDialog
          vendor={editVendor}
          onClose={() => setEditVendor(null)}
          onSave={handleUpdate}
        />
      )}
      <ConfirmDialog
        open={deleteId !== null}
        message="Are you sure you want to delete this vendor?"
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default VendorList;
