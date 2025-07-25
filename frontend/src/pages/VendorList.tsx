import { useState } from "react";
import { useVendor } from "../hooks/useVendor";
import type { Vendor } from "../types";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const VendorList: React.FC = () => {
  const { vendors, createVendor, updateVendor, deleteVendor } = useVendor();
  const [newVendor, setNewVendor] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
  });
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (close: () => void) => {
    if (!newVendor.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!newVendor.email.trim()) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newVendor.email)) {
      setError("Invalid email address");
      return;
    }
    try {
      await createVendor(newVendor);
      setNewVendor({ name: "", contact_person: "", email: "", phone: "" });
      setError(null);
      close();
    } catch {
      setError("Failed to create vendor");
    }
  };

  const handleUpdate = async (close: () => void) => {
    if (!editVendor || !editVendor.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!editVendor.email?.trim()) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editVendor.email)) {
      setError("Invalid email address");
      return;
    }
    try {
      await updateVendor(editVendor.id, {
        name: editVendor.name,
        contact_person: editVendor.contact_person,
        email: editVendor.email,
        phone: editVendor.phone,
      });
      setEditVendor(null);
      setError(null);
      close();
    } catch {
      setError("Failed to update vendor");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await deleteVendor(id);
        setError(null);
      } catch {
        setError("Failed to delete vendor");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`px-4 py-2 rounded ${
                  open ? "bg-blue-600" : "bg-blue-500"
                } text-white`}
              >
                Create Vendor
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 mt-2 w-96 bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Create Vendor</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                      type="text"
                      placeholder="Name"
                      value={newVendor.name}
                      onChange={(e) =>
                        setNewVendor({ ...newVendor, name: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Vendor Name"
                    />
                    <input
                      type="text"
                      placeholder="Contact Person"
                      value={newVendor.contact_person}
                      onChange={(e) =>
                        setNewVendor({
                          ...newVendor,
                          contact_person: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Contact Person"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newVendor.email}
                      onChange={(e) =>
                        setNewVendor({ ...newVendor, email: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Vendor Email"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newVendor.phone}
                      onChange={(e) =>
                        setNewVendor({ ...newVendor, phone: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Vendor Phone"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCreate(close)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setNewVendor({
                            name: "",
                            contact_person: "",
                            email: "",
                            phone: "",
                          });
                          setError(null);
                          close();
                        }}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Contact Person</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor: Vendor) => (
            <tr key={vendor.id}>
              <td className="p-2">{vendor.name}</td>
              <td className="p-2">{vendor.contact_person}</td>
              <td className="p-2">{vendor.email}</td>
              <td className="p-2">{vendor.phone}</td>
              <td className="p-2">
                <Popover className="relative inline-block">
                  {({ open, close }) => (
                    <>
                      <Popover.Button
                        className={`bg-yellow-500 text-white px-3 py-1 rounded ${
                          open ? "hover:bg-yellow-600" : "hover:bg-yellow-600"
                        } mr-2 `}
                        onClick={() => setEditVendor(vendor)}
                      >
                        Edit
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-2 w-96 bg-white shadow-lg rounded-lg p-4">
                          <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold">
                              Edit Vendor
                            </h2>
                            {error && <p className="text-red-500">{error}</p>}
                            <input
                              type="text"
                              placeholder="Name"
                              value={editVendor?.name || ""}
                              onChange={(e) =>
                                setEditVendor(
                                  editVendor
                                    ? { ...editVendor, name: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Vendor Name"
                            />
                            <input
                              type="text"
                              placeholder="Contact Person"
                              value={editVendor?.contact_person || ""}
                              onChange={(e) =>
                                setEditVendor(
                                  editVendor
                                    ? {
                                        ...editVendor,
                                        contact_person: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Contact Person"
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              value={editVendor?.email || ""}
                              onChange={(e) =>
                                setEditVendor(
                                  editVendor
                                    ? { ...editVendor, email: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Vendor Email"
                            />
                            <input
                              type="text"
                              placeholder="Phone"
                              value={editVendor?.phone || ""}
                              onChange={(e) =>
                                setEditVendor(
                                  editVendor
                                    ? { ...editVendor, phone: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Vendor Phone"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate(close)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditVendor(null);
                                  setError(null);
                                  close();
                                }}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
