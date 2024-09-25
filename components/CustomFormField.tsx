"use client";

import { Icons } from "@/types/types";
import Image from "next/image";
import React from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { FormFieldType } from "./forms/PatientForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const RenderField = <T extends FieldValues>({
  field,
  fieldType,
  iconSrc,
  iconAlt,
  placeholder,
}: { field: ControllerRenderProps } & Omit<
  CustomFormProps<T>,
  "control" | "name" | "label"
>) => {
  switch (fieldType) {
    case "input":
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              className="ml-2"
              src={"/assets/icons/" + iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "ICON"}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case "phoneInput":
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            value={field.value}
            onChange={field.onChange}
            withCountryCallingCode
            className="input-phone"
          />
        </FormControl>
      );
    default:
      break;
  }
  return;
};

type CustomFormProps<T extends FieldValues> = {
  control: Control<T, Record<string, string>>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: Icons;
  iconAlt?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: unknown) => React.ReactNode;
};

export const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  fieldType,
  ...props
}: CustomFormProps<T>) => {
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem>
          {fieldType !== "checkbox" && label && <FormLabel>{label}</FormLabel>}
          <RenderField<T>
            field={field as ControllerRenderProps}
            fieldType={fieldType}
            {...props}
          />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
