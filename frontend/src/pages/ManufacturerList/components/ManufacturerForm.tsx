import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import type { Manufacturer } from "../../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Manufacturer, "id">, id?: number) => void;
  initialData: Manufacturer | null;
}

const ManufacturerForm: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      //@ts-ignore
      setForm({ name: initialData.name, description: initialData.description });
    } else {
      setForm({ name: "", description: "" });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    //@ts-ignore
    onSubmit(form, initialData?.id);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded max-w-md w-full p-6">
          <Dialog.Title className="text-xl font-bold mb-4">
            {initialData ? "Edit Manufacturer" : "Create Manufacturer"}
          </Dialog.Title>

          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded w-full mb-4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ManufacturerForm;
