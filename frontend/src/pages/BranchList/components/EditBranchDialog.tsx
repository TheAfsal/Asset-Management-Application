import { useState } from "react";
import { useSnackbar } from "notistack";
import { Dialog } from "@headlessui/react";
import type { Branch } from "../../../types";
import { useBranch } from "../../../hooks/useBranch";

interface EditBranchDialogProps {
  branch: Branch;
  onClose: () => void;
}

const EditBranchDialog: React.FC<EditBranchDialogProps> = ({
  branch,
  onClose,
}) => {
  const { updateBranch } = useBranch();
  const { enqueueSnackbar } = useSnackbar();

  const [updated, setUpdated] = useState<Branch>({ ...branch });

  const handleUpdate = async () => {
    if (!updated.name.trim() || !updated.code.trim()) {
      enqueueSnackbar("Name and Code are required", { variant: "error" });
      return;
    }

    try {
      await updateBranch(branch.id, updated);
      enqueueSnackbar("Branch updated successfully", { variant: "success" });
      onClose();
    } catch {
      enqueueSnackbar("Failed to update branch", { variant: "error" });
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-medium mb-4">
            Edit Branch
          </Dialog.Title>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={updated.name}
              onChange={(e) => setUpdated({ ...updated, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={updated.location}
              onChange={(e) =>
                setUpdated({ ...updated, location: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Code"
              value={updated.code}
              onChange={(e) => setUpdated({ ...updated, code: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <select
              value={updated.status}
              onChange={(e) =>
                setUpdated({
                  ...updated,
                  //@ts-ignore
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="w-full border p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditBranchDialog;
