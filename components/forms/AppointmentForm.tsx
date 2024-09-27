"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAppointment } from "@/lib/actions/appointment.actions";
import { appointmentFormSchema } from "@/lib/validation";

import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { Form } from "../ui/form";
import { DoctorSelectFormField } from "./FormFields/DoctorSelectFormField";

type AppointmentFormSchema = z.infer<typeof appointmentFormSchema>;

type AppointmentFormProps = {
  user: User;
};

const AppFormField = CustomFormField<AppointmentFormSchema>;

export const AppointmentForm: FC<AppointmentFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {},
  });
  const onSubmit = async (appointmentData: AppointmentFormSchema) => {
    setIsLoading(true);
    const data = {
      userId: user.$id,
      ...appointmentData,
    };
    await createAppointment(data);
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
            <h1 className="header"> Hey {user.name} 🍋</h1>
            <p className="text-dark-700">
              {" "}
              Let us know what&lsquo;s going with you.
            </p>
          </section>
          <DoctorSelectFormField<AppointmentFormSchema>
            control={form.control}
          />
          <div className="flex flex-col gap-6 xl:flex-row">
            <AppFormField
              name="reason"
              label="Reason for Appointment"
              placeholder="ex: Annual montly check-up"
              control={form.control}
              fieldType="textarea"
            />
            <AppFormField
              name="note"
              label="Additional comments/notes"
              placeholder="ex: Prefer afternoon appointments, if possible"
              control={form.control}
              fieldType="textarea"
            />
          </div>
          <AppFormField
            name="schedule"
            label="Expected Appointment Date"
            control={form.control}
            fieldType="datePicker"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          <SubmitButton isLoading={isLoading}>
            Schedule and Continue
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};
