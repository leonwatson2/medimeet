"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { appointmentFormSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { Form } from "../ui/form";
import { DoctorSelectFormField } from "./FormFields/DoctorSelectFormField";

type AppointmentFormSchema = z.infer<typeof appointmentFormSchema>;
type AppointmentFormProps = {
  userId: string;
  type: AppointmentFormType;
  patientId: string;
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const AppFormField = CustomFormField<AppointmentFormSchema>;
const PROMPT_TEXT = {
  create: "Schedule your first appointment with us.",
  schedule: "Please fill in the form to schedule an appointment.",
  cancel: "Are you sure you want cancel an appointment.",
};

export const AppointmentForm: FC<AppointmentFormProps> = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}) => {
  if (
    type !== "create" &&
    (setOpen === undefined || appointment === undefined)
  ) {
    throw Error(
      "Looks like you're using this component wrong. Must have an appointment and setOpen for cancel and schedule types",
    );
  }
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      primaryPhysician: appointment?.primaryPhysician || "",
      cancellationReason: appointment?.cancellationReason || "",
      schedule: appointment?.schedule
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
    },
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
    if (type === "create") {
      const appointment = await createAppointment({
        userId: userId,
        patient: patientId,
        ...newAppointment,
      });
      router.push(
        `/patients/${userId}/new-appointments/success?appointmentId=${appointment.$id}`,
      );
    } else {
      const updatedAppointment = await updateAppointment({
        userId: userId,
        appointment: newAppointment,
        appointmentId: appointment!.$id,
        type,
      });
      if (updatedAppointment && setOpen) {
        setOpen(false);
        form.reset();
      }
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
              <>
                <h1 className="header">
                  Hey Let&#39; get you on the calendar 🍋
                </h1>
                <p className="text-dark-700">{PROMPT_TEXT[type]}</p>
              </>
            )}
          </section>
          {type !== "cancel" && (
            <>
              <DoctorSelectFormField<AppointmentFormSchema>
                control={form.control}
              />
              <AppFormField
                name="reason"
                label="Reason for Appointment"
                placeholder="ex: Annual montly check-up"
                control={form.control}
                fieldType="textarea"
              />
            </>
          )}
          <div className="flex flex-col gap-6 xl:flex-row">
            {type === "create" && (
              <>
                <AppFormField
                  name="note"
                  label="Additional comments/notes"
                  placeholder="ex: Prefer afternoon appointments, if possible"
                  control={form.control}
                  fieldType="textarea"
                />
              </>
            )}
            {type === "cancel" && (
              <AppFormField
                name="cancellationReason"
                label="Reason for Appointment Cancellation"
                placeholder="ex: Something came up, I'll reschedule"
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
