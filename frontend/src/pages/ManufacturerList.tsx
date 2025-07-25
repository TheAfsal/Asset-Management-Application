import { useState } from "react";
import { useManufacturer } from "../hooks/useManufacturer";
import type { Manufacturer } from "../types";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ManufacturerList: React.FC = () => {
  const {
    manufacturers,
    fetchManufacturers,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
  } = useManufacturer();
  const [newManufacturer, setNewManufacturer] = useState({
    name: "",
    description: "",
  });
  const [editManufacturer, setEditManufacturer] = useState<Manufacturer | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (close: () => void) => {
    if (!newManufacturer.name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await createManufacturer(newManufacturer);
      setNewManufacturer({ name: "", description: "" });
      setError(null);
      close();
    } catch {
      setError("Failed to create manufacturer");
    }
  };

  const handleUpdate = async (close: () => void) => {
    if (!editManufacturer || !editManufacturer.name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await updateManufacturer(editManufacturer.id, {
        name: editManufacturer.name,
        description: editManufacturer.description,
      });
      setEditManufacturer(null);
      setError(null);
      close();
    } catch {
      setError("Failed to update manufacturer");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this manufacturer?")) {
      try {
        await deleteManufacturer(id);
      } catch {
        setError("Failed to delete manufacturer");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manufacturers</h1>
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Manufacturer
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
                      Create Manufacturer
                    </h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                      type="text"
                      placeholder="Name"
                      value={newManufacturer.name}
                      onChange={(e) =>
                        setNewManufacturer({
                          ...newManufacturer,
                          name: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Manufacturer Name"
                    />
                    <textarea
                      placeholder="Description"
                      value={newManufacturer.description}
                      onChange={(e) =>
                        setNewManufacturer({
                          ...newManufacturer,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Manufacturer Description"
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
                          setNewManufacturer({ name: "", description: "" });
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
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer: Manufacturer) => (
            <tr key={manufacturer.id}>
              <td className="p-2">{manufacturer.name}</td>
              <td className="p-2">{manufacturer.description}</td>
              <td className="p-2">
                <Popover className="relative inline-block">
                  {({ open, close }) => (
                    <>
                      <Popover.Button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                        onClick={() => setEditManufacturer(manufacturer)}
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
                              Edit Manufacturer
                            </h2>
                            {error && <p className="text-red-500">{error}</p>}
                            <input
                              type="text"
                              placeholder="Name"
                              value={editManufacturer?.name || ""}
                              onChange={(e) =>
                                setEditManufacturer(
                                  editManufacturer
                                    ? {
                                        ...editManufacturer,
                                        name: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Manufacturer Name"
                            />
                            <textarea
                              placeholder="Description"
                              value={editManufacturer?.description || ""}
                              onChange={(e) =>
                                setEditManufacturer(
                                  editManufacturer
                                    ? {
                                        ...editManufacturer,
                                        description: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Manufacturer Description"
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
                                  setEditManufacturer(null);
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
                  onClick={() => handleDelete(manufacturer.id)}
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

export default ManufacturerList;
