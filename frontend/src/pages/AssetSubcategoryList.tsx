import { useEffect } from "react";
import { useAssetSubcategory } from "../hooks/useAssetSubcategory";
import type { AssetSubcategory } from "../types";

const AssetSubcategoryList: React.FC = () => {
  const { subcategories, fetchAssetSubcategories } = useAssetSubcategory();

  useEffect(() => {
    fetchAssetSubcategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Asset Subcategories</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Category ID</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory: AssetSubcategory) => (
            <tr key={subcategory.id}>
              <td className="p-2">{subcategory.name}</td>
              <td className="p-2">{subcategory.category_id}</td>
              <td className="p-2">{subcategory.description}</td>
              <td className="p-2">{subcategory.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetSubcategoryList;
