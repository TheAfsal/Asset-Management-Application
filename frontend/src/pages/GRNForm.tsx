import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGRN } from "../hooks/useGRN";
import HeaderForm from "../components/grn/HeaderForm";
import LineItemTable from "../components/grn/LineItemTable";
import TotalsPanel from "../components/grn/TotalsPanel";
import type { GrnFormData } from "../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = yup.object({
  header: yup.object({
    grn_number: yup.string().required("GRN Number is required"),
    grn_date: yup.string().required("GRN Date is required"),
    invoice_number: yup.string().max(30).required("Invoice Number is required"),
    vendor_id: yup.number().required("Vendor is required"),
    branch_id: yup.number().required("Branch is required"),
    status: yup.string().oneOf(["draft", "submitted"]).required(),
  }),
  lineItems: yup.array().of(
    yup.object({
      subcategory_id: yup.number().required("Subcategory is required"),
      item_description: yup.string().max(100).required("Description is required"),
      quantity: yup.number().min(1).required("Quantity is required"),
      unit_price: yup.number().min(0).required("Unit Price is required"),
      tax_percent: yup.number().min(0).max(100).required("Tax % is required"),
      taxable_value: yup.number(),
      total_amount: yup.number(),
    })
  ).min(1, "At least one line item is required"),
});

const GRNForm: React.FC = () => {
  const methods = useForm<GrnFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      header: {
        status: "draft",
      },
      lineItems: [],
    },
  });

  const { vendors, branches, subcategories, submitGrn } = useGRN();
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);

  const onSubmit = async (data: GrnFormData) => {
    await submitGrn(data);
    methods.reset();
    navigate("/grns");
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/grns");
      }
    } else {
      navigate("/grns");
    }
  };

  const handleSaveDraft = () => {
    methods.setValue("header.status", "draft");
    methods.handleSubmit(onSubmit)();
  };

  const handleSubmitFinal = () => {
    methods.setValue("header.status", "submitted");
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <div className="p-4 max-w-7xl mx-auto">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Create GRN</h1>
          <nav className="text-sm text-gray-500">
            Home &gt; Transactions &gt; GRN
          </nav>
        </header>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4"
          onChange={() => setIsDirty(true)}
        >
          <HeaderForm vendors={vendors} branches={branches} />
          <LineItemTable subcategories={subcategories} />
          <TotalsPanel />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleSubmitFinal}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default GRNForm;
