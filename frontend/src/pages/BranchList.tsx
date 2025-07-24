import { useEffect } from "react";
import { useBranch } from "../hooks/useBranch";
import type { Branch } from "../types";

const BranchList: React.FC = () => {
  const { branches, fetchBranches } = useBranch();

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Branches</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch: Branch) => (
            <tr key={branch.id}>
              <td className="p-2">{branch.name}</td>
              <td className="p-2">{branch.location}</td>
              <td className="p-2">{branch.code}</td>
              <td className="p-2">{branch.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;
