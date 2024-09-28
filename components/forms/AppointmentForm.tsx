"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { appointmentFormSchema } from "@/lib/validation";
import { Patient } from "@/types/appwrite.types";

import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { Form } from "../ui/form";
import { DoctorSelectFormField } from "./FormFields/DoctorSelectFormField";
import { useRouter } from "next/navigation";

type AppointmentFormSchema = z.infer<typeof appointmentFormSchema>;
type AppointmentFormProps = {
  user: User;
  type: AppointmentFormType;
  patient: Patient;
};

const AppFormField = CustomFormField<AppointmentFormSchema>;
const PROMPT_TEXT = {
  create: "Schedule your first appointment with us.",
  schedule: "Please fill in the form to schedule an appointment.",
  cancel: "Are you sure you want cancel an appointment.",
};

export const AppointmentForm: FC<AppointmentFormProps> = ({
  user,
  patient,
  type,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {},
  });
  const onSubmit = async (appointmentData: AppointmentFormSchema) => {
    setIsLoading(true);
    const status: Status = (
      {
        create: "pending",
        schedule: "scheduled",
        cancel: "cancelled",
      } as Record<AppointmentFormType, Status>
    )[type];
    const newAppointment = {
      status,
      ...appointmentData,
    };
    const todo: string = patient.appointmentId;
    if (type === "create") {
      const appointment = await createAppointment({
        userId: user.$id,
        patient: patient.$id,
        ...newAppointment,
      });
      router.push(
        `/patients/${patient.$id}/new-appointments/success?appointmentId=${appointment.$id}`,
      );
    } else {
      await updateAppointment({
        userId: user.$id,
        appointment: newAppointment,
        appointmentId: todo,
        type,
      });
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="space-y-4">
            {type === "create" && (
              <h1 className="header"> Hey {user?.name} 🍋</h1>
            )}
            {type === "schedule" && (
              <h1 className="header"> Schedule an Appointment</h1>
            )}
            {type === "cancel" && (
              <h1 className="header"> Cancel Appointment</h1>
            )}
            <p className="text-dark-700">{PROMPT_TEXT[type]}</p>
          </section>
          {type !== "cancel" && (
            <DoctorSelectFormField<AppointmentFormSchema>
              control={form.control}
            />
          )}
          <div className="flex flex-col gap-6 xl:flex-row">
            <AppFormField
              name="reason"
              label="Reason for Appointment"
              placeholder="ex: Annual montly check-up"
              control={form.control}
              fieldType="textarea"
            />
            {type === "create" && (
              <AppFormField
                name="note"
                label="Additional comments/notes"
                placeholder="ex: Prefer afternoon appointments, if possible"
                control={form.control}
                fieldType="textarea"
              />
            )}
          </div>
          {type !== "cancel" && (
            <AppFormField
              name="schedule"
              label="Expected Appointment Date"
              control={form.control}
              fieldType="datePicker"
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          )}

          <SubmitButton
            className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
            isLoading={isLoading}
          >
            Schedule and Continue
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};
