import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useManufacturer } from "../../hooks/useManufacturer";
import type { Manufacturer } from "../../types";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string(),
  })
  .required();

const ManufacturerForm: React.FC = () => {
  //@ts-ignore
  const methods = useForm<Manufacturer>({ resolver: yupResolver(schema) });
  const { createManufacturer } = useManufacturer();

  const onSubmit = async (data: Manufacturer) => {
    await createManufacturer(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        //@ts-ignore
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
          <label className="block text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            {...methods.register("description")}
            className="w-full p-2 border rounded"
          />
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

export default ManufacturerForm;
