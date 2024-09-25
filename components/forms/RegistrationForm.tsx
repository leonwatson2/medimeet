"use client";
import { FC, ReactNode } from "react";
import { Form, FormControl } from "@/components/ui/form";
import { loginFormSchema, registrationFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomFormField } from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";

const RegFormField = CustomFormField<RegistrationFormSchema>;

type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;

type RegistrationFormProps = {
  user: User;
};
export const RegistrationForm: FC<RegistrationFormProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegistrationFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (registrationData: RegistrationFormSchema) => {
    setIsLoading(true);
    console.log(registrationData, user);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="space-y-4">
            <h1 className="header"> Welcome 🍋</h1>
            <p className="text-dark-700">
              {" "}
              Let us know what&lsquo;s going with you.
            </p>
          </section>
          <Header>Personal Information</Header>
          <RegFormField
            fieldType="input"
            label="Full Name"
            name="name"
            control={form.control}
            placeholder="ChaseName"
            iconSrc="user.svg"
          />
          <TwoColumnGroup>
            <RegFormField
              fieldType="input"
              label="Email"
              name="email"
              control={form.control}
              placeholder="Email"
              iconSrc="email.svg"
            />
            <RegFormField
              fieldType="phoneInput"
              label="Phone Number"
              name="phone"
              control={form.control}
              placeholder="Phone Number"
            />
          </TwoColumnGroup>
          <TwoColumnGroup>
            <RegFormField
              fieldType="datePicker"
              label="Birth Date"
              name="birthDate"
              control={form.control}
              iconSrc="calendar.svg"
            />
            <RegFormField
              fieldType="skeleton"
              control={form.control}
              label="Gender"
              name="gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex gap-6 h-11 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </TwoColumnGroup>
          <Header>Medical Information</Header>
          
          <SubmitButton isLoading={isLoading}>Submit Info</SubmitButton>
        </form>
      </Form>
    </div>
  );
};
function Header({ children }: { children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="mb-9 space-y-1">
        <h2 className="sub-header">{children}</h2>
      </div>
    </section>
  );
}

function TwoColumnGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-6 xl:flex-row">{children}</div>;
}
