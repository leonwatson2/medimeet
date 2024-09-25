"use client";
import { Form } from "@/components/ui/form";
import { loginFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";

const LoginFormField = CustomFormField<LoginFormSchema>;

export type FormFieldType =
  | "input"
  | "checkbox"
  | "phoneInput"
  | "textarea"
  | "select"
  | "skeleton"
  | "datePicker";

type LoginFormSchema = z.infer<typeof loginFormSchema>;
export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (userData: LoginFormSchema) => {
    setIsLoading(true);
    console.log(userData);
    try {
      const user = await createUser(userData);
      console.log(user);
      if(user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
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
          <LoginFormField
            fieldType={"input"}
            name="name"
            label="Full Name"
            control={form.control}
            placeholder="ChaseName"
            iconSrc="user.svg"
          />
          <LoginFormField
            fieldType="input"
            name="email"
            label="Email"
            control={form.control}
            placeholder="johnlocke@lost.com"
            iconSrc="email.svg"
          />
          <LoginFormField
            fieldType="phoneInput"
            name="phone"
            label="Phone Number"
            control={form.control}
            placeholder="(392) 123-4567"
          />
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};
