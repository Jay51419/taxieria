import { z } from "zod";

export const formSchema = z.object({
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
  
 export type FormSchemaType = z.infer<typeof formSchema>;