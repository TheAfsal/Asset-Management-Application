import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useBranch } from "../../hooks/useBranch";
import CreateBranchDialog from "./components/CreateBranchDialog";
import EditBranchDialog from "./components/EditBranchDialog";
import BranchTable from "./components/BranchTable";
import type { Branch } from "../../types";

const BranchList: React.FC = () => {
  const { branches, fetchBranches, deleteBranch } = useBranch();
  const { enqueueSnackbar } = useSnackbar();
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBranch(id);
      enqueueSnackbar("Branch deleted successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to delete branch", { variant: "error" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Branches</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Branch
        </button>
      </div>
      <BranchTable
        branches={branches}
        onEdit={setEditBranch}
        onDelete={handleDelete}
      />
      <CreateBranchDialog open={openCreate} onClose={() => setOpenCreate(false)} />
      {editBranch && (
        <EditBranchDialog
          branch={editBranch}
          onClose={() => setEditBranch(null)}
        />
      )}
    </div>
  );
};

export default BranchList;
