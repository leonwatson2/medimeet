import Image from "next/image";
import { Control, FieldValues } from "react-hook-form";

import { SelectItem } from "@/components/ui/select";

import { CustomFormField } from "@/components/CustomFormField";
import { Doctors } from "@/constants";

type DoctorFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
};

export const DoctorSelectFormField = <T extends FieldValues>({
  control,
}: DoctorFormFieldProps<T>) => {
  return (
    <CustomFormField<T>
      name="primaryPhysician"
      label="Primary Care Physician"
      control={control}
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
    </CustomFormField>
  );
};
