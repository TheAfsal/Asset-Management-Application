import { useFormContext } from "react-hook-form";
import AutoCompleteSelect from "../common/AutoCompleteSelect";
import type { Vendor, Branch } from "../../types";
import React from "react";

interface HeaderFormProps {
  vendors: Vendor[];
  branches: Branch[];
}

const HeaderForm: React.FC<HeaderFormProps> = ({ vendors, branches }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  React.useEffect(() => {
    setValue(
      "header.grn_number",
      `GRN-${new Date()
        .toISOString()
        .slice(0, 7)
        .replace("-", "")}-${Math.floor(100 + Math.random() * 900)}`
    );
    setValue("header.grn_date", new Date().toISOString().slice(0, 10));
  }, [setValue]);

  console.log(vendors);
  console.log(branches);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="grn_number">
          GRN Number
        </label>
        <input
          {...register("header.grn_number")}
          readOnly
          className="w-full p-2 border rounded"
          aria-readonly
        />
        {errors.header?.grn_number && (
          <p className="text-red-500 text-sm">
            {errors.header.grn_number.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="grn_date">
          GRN Date
        </label>
        <input
          type="date"
          {...register("header.grn_date")}
          className="w-full p-2 border rounded"
        />
        {errors.header?.grn_date && (
          <p className="text-red-500 text-sm">
            {errors.header.grn_date.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="invoice_number">
          Invoice Number
        </label>
        <input
          {...register("header.invoice_number")}
          className="w-full p-2 border rounded"
          maxLength={30}
        />
        {errors.header?.invoice_number && (
          <p className="text-red-500 text-sm">
            {errors.header.invoice_number.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="vendor_id">
          Vendor
        </label>
        <AutoCompleteSelect
          name="header.vendor_id"
          options={vendors.map((v) => ({ value: v.id, label: v.name }))}
        />
        {errors.header?.vendor_id && (
          <p className="text-red-500 text-sm">
            {errors.header.vendor_id.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="branch_id">
          Branch
        </label>
        <AutoCompleteSelect
          name="header.branch_id"
          options={branches.map((b) => ({ value: b.id, label: b.name }))}
        />
        {errors.header?.branch_id && (
          <p className="text-red-500 text-sm">
            {errors.header.branch_id.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderForm;
