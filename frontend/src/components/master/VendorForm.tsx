import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useVendor } from "../../hooks/useVendor";
import type { Vendor } from "../../types";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    contact_person: yup.string(),
    email: yup.string().email("Invalid email"),
    phone: yup.string(),
    address: yup.string(),
    gst_number: yup.string(),
  })
  .required();

const VendorForm: React.FC = () => {
  //@ts-ignore
  const methods = useForm<Vendor>({ resolver: yupResolver(schema) });
  const { createVendor } = useVendor();

  const onSubmit = async (data: Vendor) => {
    await createVendor(data);
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
          <label className="block text-sm font-medium" htmlFor="contact_person">
            Contact Person
          </label>
          <input
            {...methods.register("contact_person")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            {...methods.register("email")}
            className="w-full p-2 border rounded"
          />
          {methods.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            {...methods.register("phone")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="address">
            Address
          </label>
          <textarea
            {...methods.register("address")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="gst_number">
            GST Number
          </label>
          <input
            {...methods.register("gst_number")}
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

export default VendorForm;
