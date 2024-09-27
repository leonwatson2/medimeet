"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";

import { CustomFormField } from "@/components/CustomFormField";
import { FileUploader } from "@/components/FileUploader";
import { SubmitButton } from "@/components/SubmitButton";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { createPatient } from "@/lib/actions/patient.action";
import { registrationFormSchema } from "@/lib/validation";


const RegFormField = CustomFormField<RegistrationFormSchema>;

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;

type RegistrationFormProps = {
  user: User;
};
export const RegistrationForm: FC<RegistrationFormProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
  const onSubmit = async (registrationData: RegistrationFormSchema) => {
    setIsLoading(true);
    const formData = new FormData();

    if (
      registrationData.identificationDocument &&
      registrationData.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([registrationData.identificationDocument[0]], {
        type: registrationData.identificationDocument[0].type,
      });
      formData.append("blobFile", blobFile);
      formData.append(
        "fileName",
        registrationData.identificationDocument[0].name,
      );
    }
    try {
      const patientData = {
        ...registrationData,
        birthDate: new Date(registrationData.birthDate),
        userId: user.$id,
        identificationDocument: formData,
      };
      const patient = await createPatient(patientData);
      if(patient) router.push(`/patients/${user.$id}/new-appointments/`)
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
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
                    name="gender"
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
          <TwoColumnGroup>
            <RegFormField
              fieldType="input"
              label="Address"
              name="address"
              control={form.control}
              placeholder="121 Lost Island St."
            />
            <RegFormField
              fieldType="input"
              label="Occupation"
              name="occupation"
              control={form.control}
              placeholder="Lawyer"
            />
          </TwoColumnGroup>
          <TwoColumnGroup>
            <RegFormField
              fieldType="input"
              label="Emergency Contact Name"
              name="emergencyContactName"
              control={form.control}
              placeholder="Emergency Contact"
            />
            <RegFormField
              fieldType="phoneInput"
              label="Emergency Contact Number"
              name="emergencyContactNumber"
              control={form.control}
              placeholder="1234332345"
            />
          </TwoColumnGroup>
          <Header>Medical Information</Header>
          <RegFormField
            name="primaryPhysician"
            label="Primary Care Physician"
            control={form.control}
            fieldType="select"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex items-center cursor-pointer gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </RegFormField>
          <TwoColumnGroup>
            <RegFormField
              fieldType="input"
              label="Insurance Provider"
              name="insuranceProvider"
              control={form.control}
              placeholder="State Health Care"
            />
            <RegFormField
              fieldType="input"
              label="Insurance Policy Number"
              name="insurancePolicyNumber"
              control={form.control}
              placeholder="XYYZ-1283899281"
            />
          </TwoColumnGroup>

          <TwoColumnGroup>
            <RegFormField
              fieldType="textarea"
              label="Allergies"
              name="allergies"
              control={form.control}
              placeholder="Allergies"
            />
            <RegFormField
              fieldType="textarea"
              label="Current Medications"
              name="currentMedication"
              control={form.control}
              placeholder="Current Medications"
            />
          </TwoColumnGroup>
          <TwoColumnGroup>
            <RegFormField
              fieldType="textarea"
              label="Family Medical History"
              name="familyMedicalHistory"
              control={form.control}
              placeholder="Bad Back Pain, High Blood Pressure"
            />
            <RegFormField
              fieldType="textarea"
              label="Past Medical History"
              name="pastMedicalHistory"
              control={form.control}
              placeholder="Broken Leg, Asthma"
            />
          </TwoColumnGroup>
          <Header> Identification and Verification</Header>

          <RegFormField
            fieldType="select"
            label="Identification Type"
            name="identificationType"
            control={form.control}
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </RegFormField>
          <RegFormField
            fieldType="input"
            label="Identification Number"
            name="identificationNumber"
            control={form.control}
            placeholder="Identification Number"
          />
          <RegFormField
            fieldType="skeleton"
            label="Upload Identification"
            name="identificationDocument"
            control={form.control}
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader onChange={field.onChange} files={field.value} />
              </FormControl>
            )}
          />
          <Header> Consent and Privacy</Header>
          <RegFormField
            fieldType="checkbox"
            label="I consent to receive treatment for my health."
            name="treatmentConsent"
            control={form.control}
          />
          <RegFormField
            fieldType="checkbox"
            label="I consent to the use and disclosure of my health information for treatment purposes."
            name="disclosureConsent"
            control={form.control}
          />
          <RegFormField
            fieldType="checkbox"
            label="I acknowledge that I have reviewed and agree to the privacy policy"
            name="privacyConsent"
            control={form.control}
          />
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

function TwoColumnGroup({ children }: { children?: ReactNode }) {
  return children ? (
    <div className="flex flex-col gap-6 xl:flex-row">{children}</div>
  ) : null;
}
