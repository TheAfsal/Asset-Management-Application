import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import type { Vendor } from "../../../types";

interface Props {
  vendor: Vendor;
  onClose: () => void;
  onSave: (vendor: Vendor) => void;
}

const EditVendorDialog: React.FC<Props> = ({ vendor, onClose, onSave }) => {
  const [form, setForm] = useState<Vendor>(vendor);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(vendor);
  }, [vendor]);

  const validate = (): boolean => {
    if (!form.name.trim()) {
      setError("Name is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //@ts-ignore
    if (!emailRegex.test(form.email)) {
      setError("Invalid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold">Edit Vendor</Dialog.Title>
          <div className="mt-4 space-y-3">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Contact Person"
              value={form.contact_person}
              onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
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

export default EditVendorDialog;
