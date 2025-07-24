import { exportToExcel } from "../../utils/excelUtils";

interface AssetSummary {
  category_name: string;
  branch_name: string;
  asset_count: number;
}

interface AssetSummaryReportProps {
  summaries: AssetSummary[];
}

const AssetSummaryReport: React.FC<AssetSummaryReportProps> = ({
  summaries,
}) => {
  const handleExport = () => {
    exportToExcel(summaries, "asset_summary", [
      { header: "Category Name", key: "category_name" },
      { header: "Branch Name", key: "branch_name" },
      { header: "Asset Count", key: "asset_count" },
    ]);
  };

  return (
    <div>
      <div className="mb-4">
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
            <th className="p-2 text-left">Category Name</th>
            <th className="p-2 text-left">Branch Name</th>
            <th className="p-2 text-left">Asset Count</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary, index) => (
            <tr key={index}>
              <td className="p-2">{summary.category_name}</td>
              <td className="p-2">{summary.branch_name}</td>
              <td className="p-2">{summary.asset_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetSummaryReport;
