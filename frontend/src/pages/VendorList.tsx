import { useEffect } from "react";
import { useVendor } from "../hooks/useVendor";
import type { Vendor } from "../types";

const VendorList: React.FC = () => {
  const { vendors, fetchVendors } = useVendor();

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Contact Person</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor: Vendor) => (
            <tr key={vendor.id}>
              <td className="p-2">{vendor.name}</td>
              <td className="p-2">{vendor.contact_person}</td>
              <td className="p-2">{vendor.email}</td>
              <td className="p-2">{vendor.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
