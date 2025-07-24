import { useEffect } from "react";
import { useAssetCategory } from "../hooks/useAssetCategory";
import type { AssetCategory } from "../types";
import { exportToExcel, importFromExcel } from "../utils/excelUtils";

const AssetCategoryList: React.FC = () => {
  const { categories, fetchAssetCategories } = useAssetCategory();

  useEffect(() => {
    fetchAssetCategories();
  }, []);

  const handleExport = () => {
    exportToExcel(categories, "asset_categories", [
      { header: "Name", key: "name" },
      { header: "Description", key: "description" },
      { header: "Status", key: "status" },
    ]);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      await importFromExcel(file, "/api/v1/asset-categories");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Asset Categories</h1>
        <div>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleImport}
            className="mr-2"
            aria-label="Upload Excel"
          />
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded"
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
          </tr>
        </thead>
        <tbody>
          {categories.map((category: AssetCategory) => (
            <tr key={category.id}>
              <td className="p-2">{category.name}</td>
              <td className="p-2">{category.description}</td>
              <td className="p-2">{category.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetCategoryList;
