
import validator from "validator";
import { z } from "zod";

import { GenderOptions } from "@/constants";

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
  phone: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid phone number" }),
});

export const registrationFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Name must be longer than 4 characters.",
    })
    .max(50, {
      message: "Name must be shorter than 50 characters.",
    }),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid phone number" }),
  birthDate: z.coerce.date(),
  gender: z.enum(GenderOptions),
  address: z
    .string()
    .min(4, {
      message: "Address must be longer than 4 characters.",
    })
    .max(500, {
      message: "Address must be shorter than 500 characters.",
    }),
  occupation: z
    .string()
    .min(4, {
      message: "Occupation must be longer than 4 characters.",
    })
    .max(100, {
      message: "Occupation must be shorter than 100 characters.",
    }),
  emergencyContactName: z
    .string()
    .min(4, {
      message: "Emergency Contact Name must be longer than 4 characters.",
    })
    .max(50, {
      message: "Emergency Contact Name must be shorter than 500 characters.",
    }),
  emergencyContactNumber: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid phone number" }),
  primaryPhysician: z.string().min(2, {
    message: "Primary Care Physician must be longer than 4 characters.",
  }),
  insuranceProvider: z
    .string()
    .min(4, {
      message: "Insurance Provider must be longer than 4 characters.",
    })
    .max(100, {
      message: "Insurance Provider must be shorter than 100 characters.",
    }),
  insurancePolicyNumber: z
    .string()
    .min(4, {
      message: "Insurance Policy Number must be longer than 4 characters.",
    })
    .max(100, {
      message: "Insurance Policy Number must be shorter than 100 characters.",
    }),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the treatment consent",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the disclosure consent",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the privacy consent",
    }),
});
export const appointmentFormSchema = z.object({
  schedule: z.coerce.date({ message: "Please choose a preffered date and time." }),
  note: z.string().optional(),
  reason: z
    .string()
    .min(4, "Reason must be longer than 4 characters.")
    .max(500, "Reason must be shorter than 500 characters."),
  primaryPhysician: z
    .string()
    .min(2, "Primary Care Physician must be longer than 4 characters."),
  cancellationReason: z.string().optional(),
});
