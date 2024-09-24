import { z } from "zod";
import validator from "validator";

export const loginFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Username must be longer than 4 characters. Sorry 🤷",
    })
    .max(20, {
      message: "Username must be shorter than 25 characters. Sorry 🤷",
    }),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone, {message: "Invalid phone number"}),
});
