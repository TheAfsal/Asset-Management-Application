import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useBranch } from "../../hooks/useBranch";
import type { Branch } from "../../types";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    location: yup.string(),
    code: yup.string().required("Code is required"),
    status: yup
      .string()
      .oneOf(["active", "inactive"])
      .required("Status is required"),
  })
  .required();

const BranchForm: React.FC = () => {
  const methods = useForm<Branch>({ resolver: yupResolver(schema) });
  const { createBranch } = useBranch();

  const onSubmit = async (data: Branch) => {
    await createBranch(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg"
      >
        <div>
          <label className="block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            {...methods.register("name")}
            className="w-full p-2 border rounded"
          />
          {methods.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="location">
            Location
          </label>
          <input
            {...methods.register("location")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="code">
            Code
          </label>
          <input
            {...methods.register("code")}
            className="w-full p-2 border rounded"
          />
          {methods.formState.errors.code && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.code.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="status">
            Status
          </label>
          <select
            {...methods.register("status")}
            className="w-full p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {methods.formState.errors.status && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.status.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default BranchForm;
