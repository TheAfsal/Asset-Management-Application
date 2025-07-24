import { useFormContext, useWatch } from "react-hook-form";
import AutoCompleteSelect from "../common/AutoCompleteSelect";
import { useState, useEffect } from "react";
import type { AssetSubcategory } from "../../types";

interface LineItemTableProps {
  subcategories: AssetSubcategory[];
}

const LineItemTable: React.FC<LineItemTableProps> = ({ subcategories }) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [rows, setRows] = useState([{ id: Date.now() }]);

  const lineItems =
    useWatch({
      name: "lineItems",
      control,
    }) || [];

  useEffect(() => {
  lineItems.forEach((item: any, index: number) => {
    const quantity = item?.quantity || 0;
    const unit_price = item?.unit_price || 0;
    const tax_percent = item?.tax_percent || 0;

    const taxable_value = Number((quantity * unit_price).toFixed(2));
    const total_amount = Number((taxable_value * (1 + tax_percent / 100)).toFixed(2));

    // Only update if value actually changed to prevent infinite loop
    if (item.taxable_value !== taxable_value) {
      setValue(`lineItems[${index}].taxable_value`, taxable_value);
    }
    if (item.total_amount !== total_amount) {
      setValue(`lineItems[${index}].total_amount`, total_amount);
    }
  });
}, [lineItems, setValue]);


  const addRow = () => {
    setRows([...rows, { id: Date.now() }]);
  };

  const removeRow = (id: number) => {
    const indexToRemove = rows.findIndex((row) => row.id === id);
    setRows(rows.filter((row) => row.id !== id));

    const updatedItems = lineItems.filter((_, i) => i !== indexToRemove);
    setValue("lineItems", updatedItems);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-2">
        <button
          type="button"
          onClick={addRow}
          className="px-4 py-2 bg-green-500 text-white rounded"
          aria-label="Add Row"
        >
          Add Row
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Sub-Category</th>
            <th className="p-2 text-left">Item Description</th>
            <th className="p-2 text-left">Qty</th>
            <th className="p-2 text-left">Unit Price</th>
            <th className="p-2 text-left">Tax %</th>
            <th className="p-2 text-left">Taxable Value</th>
            <th className="p-2 text-left">Total Amount</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <AutoCompleteSelect
                  name={`lineItems[${index}].subcategory_id`}
                  options={subcategories.map((s) => ({
                    value: s.id,
                    label: s.name,
                  }))}
                />
                {errors.lineItems?.[index]?.subcategory_id && (
                  <p className="text-red-500 text-sm">
                    {errors.lineItems[index].subcategory_id.message}
                  </p>
                )}
              </td>
              <td className="p-2">
                <input
                  {...register(`lineItems[${index}].item_description`)}
                  className="w-full p-2 border rounded"
                  maxLength={100}
                />
                {errors.lineItems?.[index]?.item_description && (
                  <p className="text-red-500 text-sm">
                    {errors.lineItems[index].item_description.message}
                  </p>
                )}
              </td>
              <td className="p-2">
                <input
                  type="number"
                  {...register(`lineItems[${index}].quantity`, {
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.lineItems?.[index]?.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.lineItems[index].quantity.message}
                  </p>
                )}
              </td>
              <td className="p-2">
                <input
                  type="number"
                  {...register(`lineItems[${index}].unit_price`, {
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.lineItems?.[index]?.unit_price && (
                  <p className="text-red-500 text-sm">
                    {errors.lineItems[index].unit_price.message}
                  </p>
                )}
              </td>
              <td className="p-2">
                <input
                  type="number"
                  {...register(`lineItems[${index}].tax_percent`, {
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.lineItems?.[index]?.tax_percent && (
                  <p className="text-red-500 text-sm">
                    {errors.lineItems[index].tax_percent.message}
                  </p>
                )}
              </td>
              <td className="p-2">
                <input
                  {...register(`lineItems[${index}].taxable_value`)}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                  aria-readonly
                />
              </td>
              <td className="p-2">
                <input
                  {...register(`lineItems[${index}].total_amount`)}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                  aria-readonly
                />
              </td>
              <td className="p-2">
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="text-red-500"
                  aria-label="Delete Row"
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

export default LineItemTable;
