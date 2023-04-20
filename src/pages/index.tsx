import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup Location is required"),
  dropLocation: z.string().min(1, "Drop Location is required"),
  datetime: z.coerce.date().refine(
    (value) => {
      return !isNaN(value.getTime());
    },
    { message: "Invalid datetime" }
  ),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const output = `
     pickup: ${data.pickupLocation}
     drop: ${data.dropLocation}
     datetime: ${data.datetime}
    `;
    alert(output);
  };
  return (
    <div className="max-w-lg mx-4 md:mx-auto my-4 bg-gray-200 p-4 rounded-lg ">
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="pickuplocation"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Pickup Location
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter a Location"
            {...register("pickupLocation")}
          />
          {errors.pickupLocation && (
            <span className="text-red-800 block mt-2">
              {errors.pickupLocation?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="pickuplocation"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Drop Location
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter a Location"
            {...register("dropLocation")}
          />
          {errors.dropLocation && (
            <span className="text-red-800 block mt-2">
              {errors.dropLocation?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="pickuplocation"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Drop Location
          </label>
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, -8)}
            defaultValue={new Date().toISOString().slice(0, -8)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            {...register("datetime")}
          />
          {errors.datetime && (
            <span className="text-red-800 block mt-2">
              {errors.datetime?.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-gray-900 bg-primary hover:brightness-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={isSubmitting}
        >
          Get quick quote
        </button>
      </form>
    </div>
  );
}
