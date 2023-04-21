import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TaxiIcon from "@/icons/TaxiIcon";
import { FormSchemaType, formSchema } from "@/schemas";
import { useState } from "react";
import ErrorCard from "@/components/ErrorCard";
import { motion } from "framer-motion";
import hero from "../../public/hero.svg";
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
    <div className="min-h-screen space-y-4 pb-4">
      <nav className="sticky top-0 py-4 filter backdrop-blur-md border-b border-gray-600">
        <div className="mx-4 md:mx-24 cursor-default ">
          <h1 className="text-primary font-bold text-xl flex items-center gap-x-1">
            <TaxiIcon className="w-6 h-6" />
            Taxieria
          </h1>
        </div>
      </nav>
      <motion.div layout className="flex justify-between  bg-black border border-gray-600  w-full md:max-w-4xl md:mx-auto">
        <Image className="hidden lg:block" src={hero} alt="" height={400} width={400} />
        <form
          className="space-y-4 md:space-y-6  w-full lg:max-w-lg  bg-black p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-200 "
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
              className="block mb-2 text-sm font-medium text-gray-200 "
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
              className="block mb-2 text-sm font-medium text-gray-200"
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
          <div className="flex gap-x-1">
            <div className="w-full">
              <label
                htmlFor="datetime"
                className="block mb-2 text-sm font-medium text-gray-200"
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
                className="block mb-2 text-sm font-medium text-gray-200"
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
              className="block mb-2 text-sm font-medium text-gray-200"
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
              className="w-full text-white border border-gray-600 enabled:hover:bg-primary enabled:hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
              disabled={isSubmitting || showButtonLoader}
            >
              <span className="flex justify-center items-center gap-x-1">
                {!showButtonLoader ? (
                  <TaxiIcon className="w-4 h-4" />
                ) : (
                  <div
                    className="w-4 h-4 rounded-full animate-spin
                    border border-solid border-white border-t-transparent"
                  ></div>
                )}
                Get quick quote
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
