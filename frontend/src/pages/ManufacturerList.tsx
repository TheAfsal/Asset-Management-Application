import { useEffect } from "react";
import { useManufacturer } from "../hooks/useManufacturer";
import type { Manufacturer } from "../types";

const ManufacturerList: React.FC = () => {
  const { manufacturers, fetchManufacturers } = useManufacturer();

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manufacturers</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer: Manufacturer) => (
            <tr key={manufacturer.id}>
              <td className="p-2">{manufacturer.name}</td>
              <td className="p-2">{manufacturer.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturerList;
