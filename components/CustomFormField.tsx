"use client";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
type CustomFormProps = {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: unknown) => React.ReactNode;
};

const RenderField = ({
  field,
  ...props
}: { field: ControllerRenderProps } & Omit<
  CustomFormProps,
  "control" | "name" | "label" | "fieldType"
>) => {
  return <Input placeholder="chase321" {...field} {...props} />;
};
export const CustomFormField = ({
  control,
  name,
  label,
  fieldType,
  ...props
}: CustomFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== "checkbox" && label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} {...props} />
          <FormDescription>This is your public username.</FormDescription>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
