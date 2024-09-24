"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { CustomFormField } from "../CustomFormField";

export type FormFieldType =
  | "input"
  | "checkbox"
  | "phoneInput"
  | "textarea"
  | "select"
  | "skeleton"
  | "datePicker";

const loginFormSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be longer than 4 characters. Sorry 🤷",
  }),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;
export const PatientForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = (values: LoginFormSchema) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section>
            <h1 className="header"> Hi there 🍋</h1>
            <p className="text-dark-700"> Schedule First Appointment</p>
          </section>
          <CustomFormField
            fieldType={"input"}
            name="username"
            control={form.control}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
