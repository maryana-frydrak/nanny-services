import { z } from "zod";

export const appointmentSchema = z.object({
  address: z.string().min(3, "Address must be at least 3 characters long"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  childAge: z.string().min(1, "Please specify the child's age"),
  email: z.string().email("Please enter a valid email address"),
  parentName: z.string().min(2, "Name must be at least 2 characters long"),
  comment: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
