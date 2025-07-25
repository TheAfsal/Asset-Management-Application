import { useState } from "react";
import { useAssetCategory } from "../hooks/useAssetCategory";
import type { AssetCategory } from "../types";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { exportToExcel, importFromExcel } from "../utils/excelUtils";

const AssetCategoryList: React.FC = () => {
  const {
    categories,
    fetchAssetCategories,
    createAssetCategory,
    updateAssetCategory,
    deleteAssetCategory,
  } = useAssetCategory();
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: "active" as "active" | "inactive",
  });
  const [editCategory, setEditCategory] = useState<AssetCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (close: () => void) => {
    if (!newCategory.name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await createAssetCategory(newCategory);
      setNewCategory({ name: "", description: "", status: "active" });
      setError(null);
      close();
    } catch {
      setError("Failed to create asset category");
    }
  };

  const handleUpdate = async (close: () => void) => {
    if (!editCategory || !editCategory.name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await updateAssetCategory(editCategory.id, {
        name: editCategory.name,
        description: editCategory.description,
        status: editCategory.status,
      });
      setEditCategory(null);
      setError(null);
      close();
    } catch {
      setError("Failed to update asset category");
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this asset category?")
    ) {
      try {
        await deleteAssetCategory(id);
      } catch {
        setError("Failed to delete asset category");
      }
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      await importFromExcel(file, "/api/v1/asset-categories");
      await fetchAssetCategories();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Categories</h1>
        <div className="flex gap-2">
          <Popover className="relative">
            {({ open, close }) => (
              <>
                <Popover.Button
                  className={`bg-blue-500 text-white px-4 py-2 rounded ${open ? " hover:bg-blue-600" : " hover:bg-blue-600"}`}
                >
                  Create Asset Category
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
                        Create Asset Category
                      </h2>
                      {error && <p className="text-red-500">{error}</p>}
                      <input
                        type="text"
                        placeholder="Name"
                        value={newCategory.name}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            name: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                        aria-label="Asset Category Name"
                      />
                      <textarea
                        placeholder="Description"
                        value={newCategory.description}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            description: e.target.value,
                          })
                        }
                        className="border p-2 rounded w-full"
                        aria-label="Asset Category Description"
                      />
                      <select
                        value={newCategory.status}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            status: e.target.value as "active" | "inactive",
                          })
                        }
                        className="border p-2 rounded w-full"
                        aria-label="Asset Category Status"
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
                            setNewCategory({
                              name: "",
                              description: "",
                              status: "active",
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
          <input
            type="file"
            accept=".xlsx"
            onChange={handleImport}
            className="border p-2 rounded"
            aria-label="Upload Excel"
          />
          <button
            //@ts-ignore
            onClick={exportToExcel}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            aria-label="Export to Excel"
          >
            Export
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: AssetCategory) => (
            <tr key={category.id}>
              <td className="p-2">{category.name}</td>
              <td className="p-2">{category.description}</td>
              <td className="p-2">{category.status}</td>
              <td className="p-2">
                <Popover className="relative inline-block">
                  {({ open, close }) => (
                    <>
                      <Popover.Button
                        onClick={() => setEditCategory(category)}
                        className={`bg-yellow-500 text-white px-3 py-1 rounded ${
                          open ? "hover:bg-yellow-600" : "hover:bg-yellow-600"
                        } mr-2 `}
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
                              Edit Asset Category
                            </h2>
                            {error && <p className="text-red-500">{error}</p>}
                            <input
                              type="text"
                              placeholder="Name"
                              value={editCategory?.name || ""}
                              onChange={(e) =>
                                setEditCategory(
                                  editCategory
                                    ? { ...editCategory, name: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Asset Category Name"
                            />
                            <textarea
                              placeholder="Description"
                              value={editCategory?.description || ""}
                              onChange={(e) =>
                                setEditCategory(
                                  editCategory
                                    ? {
                                        ...editCategory,
                                        description: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Asset Category Description"
                            />
                            <select
                              value={editCategory?.status || "active"}
                              onChange={(e) =>
                                setEditCategory(
                                  editCategory
                                    ? {
                                        ...editCategory,
                                        status: e.target.value as
                                          | "active"
                                          | "inactive",
                                      }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Asset Category Status"
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
                                  setEditCategory(null);
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
                  onClick={() => handleDelete(category.id)}
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

export default AssetCategoryList;
