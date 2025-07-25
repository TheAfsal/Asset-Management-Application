import { useState } from "react";
import { useBranch } from "../hooks/useBranch";
import type { Branch } from "../types";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const BranchList: React.FC = () => {
  const { branches, createBranch, updateBranch, deleteBranch } = useBranch();

  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    code: "",
  });

  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (close: () => void) => {
    if (!newBranch.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!newBranch.code.trim()) {
      setError("Code is required");
      return;
    }
    try {
      //@ts-ignore
      await createBranch({ ...newBranch });
      setNewBranch({ name: "", location: "", code: "" });
      setError(null);
      close();
    } catch {
      setError("Failed to create branch");
    }
  };

  const handleUpdate = async (close: () => void) => {
    if (!editBranch || !editBranch.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!editBranch.code.trim()) {
      setError("Code is required");
      return;
    }
    try {
      await updateBranch(editBranch.id, {
        name: editBranch.name,
        location: editBranch.location,
        code: editBranch.code,
        status: editBranch.status,
      });
      setEditBranch(null);
      setError(null);
      close();
    } catch {
      setError("Failed to update branch");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await deleteBranch(id);
        setError(null);
      } catch {
        setError("Failed to delete branch");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Branches</h1>
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  open ? "hover:bg-blue-600" : "hover:bg-blue-600"
                }`}
              >
                Create Branch
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
                    <h2 className="text-lg font-semibold">Create Branch</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                      type="text"
                      placeholder="Name"
                      value={newBranch.name}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, name: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Branch Name"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newBranch.location}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, location: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Branch Location"
                    />
                    <input
                      type="text"
                      placeholder="Code"
                      value={newBranch.code}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, code: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                      aria-label="Branch Code"
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
                          setNewBranch({ name: "", location: "", code: "" });
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
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch: Branch) => (
            <tr key={branch.id}>
              <td className="p-2">{branch.name}</td>
              <td className="p-2">{branch.location}</td>
              <td className="p-2">{branch.code}</td>
              <td className="p-2">{branch.status}</td>
              <td className="p-2">
                <Popover className="relative inline-block">
                  {({ open, close }) => (
                    <>
                      <Popover.Button
                        className={`${open?"hover:bg-yellow-600":"hover:bg-yellow-600"}bg-yellow-500 text-white px-3 py-1 rounded mr-2`}
                        onClick={() => setEditBranch(branch)}
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
                              Edit Branch
                            </h2>
                            {error && <p className="text-red-500">{error}</p>}
                            <input
                              type="text"
                              placeholder="Name"
                              value={editBranch?.name || ""}
                              onChange={(e) =>
                                setEditBranch(
                                  editBranch
                                    ? { ...editBranch, name: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Branch Name"
                            />
                            <input
                              type="text"
                              placeholder="Location"
                              value={editBranch?.location || ""}
                              onChange={(e) =>
                                setEditBranch(
                                  editBranch
                                    ? {
                                        ...editBranch,
                                        location: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Branch Location"
                            />
                            <input
                              type="text"
                              placeholder="Code"
                              value={editBranch?.code || ""}
                              onChange={(e) =>
                                setEditBranch(
                                  editBranch
                                    ? { ...editBranch, code: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Branch Code"
                            />
                            <select
                              value={editBranch?.status || ""}
                              onChange={(e) =>
                                setEditBranch(
                                  //@ts-ignore
                                  editBranch
                                    ? { ...editBranch, status: e.target.value }
                                    : null
                                )
                              }
                              className="border p-2 rounded w-full"
                              aria-label="Branch Status"
                            >
                              <option value="">Select Status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
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
                                  setEditBranch(null);
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
                  onClick={() => handleDelete(branch.id)}
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

export default BranchList;
