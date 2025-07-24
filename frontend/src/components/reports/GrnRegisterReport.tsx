import { useState } from "react";
import { useReports } from "../../hooks/useReports";
import type { GrnHeader } from "../../types";
import { exportToExcel } from "../../utils/excelUtils";

interface GrnRegisterReportProps {
  grns: GrnHeader[];
}

const GrnRegisterReport: React.FC<GrnRegisterReportProps> = ({ grns }) => {
  const [filters, setFilters] = useState({
    dateRange: "",
    vendor: "",
    branch: "",
  });
  const { vendors, branches } = useReports();

  const handleExport = () => {
    exportToExcel(grns, "grn_register", [
      { header: "GRN Number", key: "grn_number" },
      { header: "GRN Date", key: "grn_date" },
      { header: "Invoice Number", key: "invoice_number" },
      {
        header: "Vendor",
        key: "vendor_id",
        formatter: (id: number) => vendors.find((v) => v.id === id)?.name || "",
      },
      {
        header: "Branch",
        key: "branch_id",
        formatter: (id: number) =>
          branches.find((b) => b.id === id)?.name || "",
      },
      { header: "Total Amount", key: "total_amount", formatter: () => "N/A" }, // Placeholder
    ]);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Date Range"
          value={filters.dateRange}
          onChange={(e) =>
            setFilters({ ...filters, dateRange: e.target.value })
          }
          className="p-2 border rounded"
        />
        <select
          value={filters.vendor}
          onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Vendors</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <select
          value={filters.branch}
          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export to Excel
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
            <th className="p-2 text-left">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {grns.map((grn) => (
            <tr key={grn.id}>
              <td className="p-2">{grn.grn_number}</td>
              <td className="p-2">
                {new Date(grn.grn_date).toLocaleDateString()}
              </td>
              <td className="p-2">{grn.invoice_number}</td>
              <td className="p-2">
                {vendors.find((v) => v.id === grn.vendor_id)?.name}
              </td>
              <td className="p-2">
                {branches.find((b) => b.id === grn.branch_id)?.name}
              </td>
              <td className="p-2">N/A</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrnRegisterReport;
