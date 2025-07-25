import { useEffect, useState, Fragment } from "react";
import { useAssetSubcategory } from "../hooks/useAssetSubcategory";
import { useAssetCategory } from "../hooks/useAssetCategory";
import type { AssetSubcategory } from "../types";
import { Popover, Transition } from "@headlessui/react";

const AssetSubcategoryList: React.FC = () => {
  const {
    subcategories,
    fetchAssetSubcategories,
    createAssetSubcategory,
    updateAssetSubcategory,
    deleteAssetSubcategory,
  } = useAssetSubcategory();

  const { categories, fetchAssetCategories } = useAssetCategory();

  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    category_id: 0,
    description: "",
    status: "active" as "active" | "inactive",
  });

  const [editSubcategory, setEditSubcategory] = useState<AssetSubcategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssetSubcategories();
    fetchAssetCategories();
  }, []);

  const handleCreate = async (close: () => void) => {
    if (!newSubcategory.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!newSubcategory.category_id) {
      setError("Category is required");
      return;
    }
    try {
      await createAssetSubcategory(newSubcategory);
      setNewSubcategory({
        name: "",
        category_id: 0,
        description: "",
        status: "active",
      });
      setError(null);
      close();
    } catch {
      setError("Failed to create subcategory");
    }
  };

  const handleUpdate = async (close: () => void) => {
    if (!editSubcategory || !editSubcategory.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!editSubcategory.category_id) {
      setError("Category is required");
      return;
    }
    try {
      await updateAssetSubcategory(editSubcategory.id, editSubcategory);
      setEditSubcategory(null);
      setError(null);
      close();
    } catch {
      setError("Failed to update subcategory");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteAssetSubcategory(id);
        setError(null);
      } catch {
        setError("Failed to delete subcategory");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Subcategories</h1>
        <Popover className="relative">
          {({ close }) => (
            <>
              <Popover.Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Subcategory
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
                    <h2 className="text-lg font-semibold">Create Subcategory</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                      type="text"
                      placeholder="Name"
                      value={newSubcategory.name}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                      className="border p-2 rounded w-full"
                    />
                    <select
                      value={newSubcategory.category_id}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, category_id: parseInt(e.target.value) })}
                      className="border p-2 rounded w-full"
                    >
                      <option value={0}>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Description"
                      value={newSubcategory.description}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                      className="border p-2 rounded w-full"
                    />
                    <select
                      value={newSubcategory.status}
                      onChange={(e) => setNewSubcategory({ ...newSubcategory, status: e.target.value as "active" | "inactive" })}
                      className="border p-2 rounded w-full"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCreate(close)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setNewSubcategory({ name: "", category_id: 0, description: "", status: "active" });
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
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory) => (
            <tr key={subcategory.id}>
              <td className="p-2">{subcategory.name}</td>
              <td className="p-2">
                {categories.find((cat) => cat.id === subcategory.category_id)?.name || "N/A"}
              </td>
              <td className="p-2">{subcategory.description}</td>
              <td className="p-2">{subcategory.status}</td>
              <td className="p-2">
                <Popover className="relative inline-block">
                  {({ close }) => (
                    <>
                      <Popover.Button
                        onClick={() => setEditSubcategory(subcategory)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
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
                            <h2 className="text-lg font-semibold">Edit Subcategory</h2>
                            {error && <p className="text-red-500">{error}</p>}
                            <input
                              type="text"
                              placeholder="Name"
                              value={editSubcategory?.name || ""}
                              onChange={(e) =>
                                setEditSubcategory(
                                  editSubcategory ? { ...editSubcategory, name: e.target.value } : null
                                )
                              }
                              className="border p-2 rounded w-full"
                            />
                            <select
                              value={editSubcategory?.category_id || 0}
                              onChange={(e) =>
                                setEditSubcategory(
                                  editSubcategory
                                    ? { ...editSubcategory, category_id: parseInt(e.target.value) }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                            >
                              <option value={0}>Select Category</option>
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                            <textarea
                              placeholder="Description"
                              value={editSubcategory?.description || ""}
                              onChange={(e) =>
                                setEditSubcategory(
                                  editSubcategory ? { ...editSubcategory, description: e.target.value } : null
                                )
                              }
                              className="border p-2 rounded w-full"
                            />
                            <select
                              value={editSubcategory?.status || "active"}
                              onChange={(e) =>
                                setEditSubcategory(
                                  editSubcategory
                                    ? { ...editSubcategory, status: e.target.value as "active" | "inactive" }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate(close)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditSubcategory(null);
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
                  onClick={() => handleDelete(subcategory.id)}
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

export default AssetSubcategoryList;
