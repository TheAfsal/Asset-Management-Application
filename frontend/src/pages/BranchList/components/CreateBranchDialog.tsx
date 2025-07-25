import { useState } from "react";
import { useSnackbar } from "notistack";
import { useBranch } from "../../../hooks/useBranch";
import { Dialog } from "@headlessui/react";

interface CreateBranchDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateBranchDialog: React.FC<CreateBranchDialogProps> = ({
  open,
  onClose,
}) => {
  const { createBranch } = useBranch();
  const { enqueueSnackbar } = useSnackbar();

  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    code: "",
  });

  const handleCreate = async () => {
    if (!newBranch.name.trim() || !newBranch.code.trim()) {
      enqueueSnackbar("Name and Code are required", { variant: "error" });
      return;
    }

    try {
      //@ts-ignore
      await createBranch({ ...newBranch });
      enqueueSnackbar("Branch created successfully", { variant: "success" });
      setNewBranch({ name: "", location: "", code: "" });
      onClose();
    } catch {
      enqueueSnackbar("Failed to create branch", { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-medium mb-4">
            Create Branch
          </Dialog.Title>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={newBranch.name}
              onChange={(e) =>
                setNewBranch({ ...newBranch, name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={newBranch.location}
              onChange={(e) =>
                setNewBranch({ ...newBranch, location: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Code"
              value={newBranch.code}
              onChange={(e) =>
                setNewBranch({ ...newBranch, code: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreate}
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

export default CreateBranchDialog;
