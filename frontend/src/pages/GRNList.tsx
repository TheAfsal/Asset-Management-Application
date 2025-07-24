import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGRN } from "../hooks/useGRN";
import type { GrnHeader } from "../types";

const GRNList: React.FC = () => {
  const { grns, fetchGrns } = useGRN();
  const navigate = useNavigate();

  console.log(grns);
  

  useEffect(() => {
    fetchGrns();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">GRN List</h1>
        <button
          onClick={() => navigate("/grns/new")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          aria-label="Create New GRN"
        >
          Create New GRN
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">GRN Number</th>
            <th className="p-2 text-left">GRN Date</th>
            <th className="p-2 text-left">Invoice Number</th>
            <th className="p-2 text-left">Vendor</th>
            <th className="p-2 text-left">Branch</th>
          </tr>
        </thead>
        <tbody>
          {grns.map((grn: GrnHeader) => (
            <tr key={grn.id}>
              <td className="p-2">{grn.grn_number}</td>
              <td className="p-2">
                {new Date(grn.grn_date).toLocaleDateString()}
              </td>
              <td className="p-2">{grn.invoice_number}</td>
              <td className="p-2">{grn.vendor_id}</td>
              <td className="p-2">{grn.branch_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GRNList;
