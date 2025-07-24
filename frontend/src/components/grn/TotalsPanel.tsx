import { useWatch } from "react-hook-form";

const TotalsPanel: React.FC = () => {
  const lineItems = useWatch({ name: "lineItems" }) || [];

  const subtotal = lineItems.reduce(
    (sum: number, item: any) => sum + parseFloat(item?.taxable_value || 0),
    0
  );

  const totalTax = lineItems.reduce((sum: number, item: any) => {
    const taxPercent = parseFloat(item?.tax_percent || 0);
    const taxableValue = parseFloat(item?.taxable_value || 0);
    const taxAmount = taxableValue * (taxPercent / 100);
    return sum + taxAmount;
  }, 0);

  const grandTotal = subtotal + totalTax;

  return (
    <div className="flex justify-end mt-4">
      <div className="p-4 bg-gray-100 rounded w-full md:w-1/3">
        <p className="text-sm">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="text-sm">Total Tax: ${totalTax.toFixed(2)}</p>
        <p className="text-sm font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalsPanel;
