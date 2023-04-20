import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaxiIcon from "@/icons/TaxiIcon";

const formSchema = z.object({
  email: z.string().email(),
  pickupLocation: z.string().min(1, "Pickup Location is required"),
  dropLocation: z.string().min(1, "Drop Location is required"),
  datetime: z.coerce.date().refine(
    (value) => {
      return !isNaN(value.getTime());
    },
    { message: "Invalid datetime" }
  ),
  numberOfPassenger: z.string(),
  specialRequirements: z.string().optional(),
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
     Special Requirements: ${data.specialRequirements}
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
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter a email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-800 block mt-2">
              {errors.email?.message}
            </span>
          )}
        </div>
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
            htmlFor="droplocation"
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
        <div className="flex">
          <div className="w-full">
            <label
              htmlFor="datetime"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date/Time
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
          <div className="w-full">
            <label
              htmlFor="specialRequirements"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Number of Passenger
            </label>
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              {...register("numberOfPassenger")}
            />
            {errors.numberOfPassenger && (
              <span className="text-red-800 block mt-2">
                {errors.numberOfPassenger?.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="specialRequirements"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Special Requirements
          </label>
          <input
            type="text"
            placeholder="Fitting wheelchair, Surfboard, bicycle etc."
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            {...register("specialRequirements")}
          />
          {errors.specialRequirements && (
            <span className="text-red-800 block mt-2">
              {errors.specialRequirements?.message}
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-gray-900 bg-primary hover:brightness-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isSubmitting}
          >
            <span className="flex justify-center items-center gap-x-1">
              <TaxiIcon className="w-4 h-4" />
              Get quick quote
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
