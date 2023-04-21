import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TaxiIcon from "@/icons/TaxiIcon";
import { FormSchemaType, formSchema } from "@/schemas";
import { useState } from "react";
import ErrorCard from "@/components/ErrorCard";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setShowButtonLoader(true);
    fetch("api/mail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => setShowButtonLoader(false))
      .catch((err) => setShowButtonLoader(false));
  };

  return (
    <div>
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
            {errors.email && <ErrorCard message={errors.email?.message} />}
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
              <ErrorCard message={errors.pickupLocation?.message} />
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
              <ErrorCard message={errors.dropLocation?.message} />
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
                <ErrorCard message={errors.datetime?.message} />
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
                <ErrorCard message={errors.numberOfPassenger?.message} />
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
              <ErrorCard message={errors.specialRequirements?.message} />
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-gray-900 bg-primary hover:brightness-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
              disabled={isSubmitting}
            >
              <span className="flex justify-center items-center gap-x-1">
                {!showButtonLoader ? (
                  <TaxiIcon className="w-4 h-4" />
                ) : (
                  <div
                    className="w-4 h-4 rounded-full animate-spin
                    border border-solid border-gray-900 border-t-transparent"
                  ></div>
                )}
                Get quick quote
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
