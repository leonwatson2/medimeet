"use client";

import Image from "next/image";
import React, { HTMLInputAutoCompleteAttribute, ReactNode } from "react";
import DatePicker from "react-datepicker";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Icons } from "@/types/types";

import { FormFieldType } from "./forms/PatientForm";

const RenderField = <T extends FieldValues>({
  field,
  fieldType,
  iconSrc,
  iconAlt,
  placeholder,
  showTimeSelect,
  dateFormat,
  renderSkeleton,
  name,
  label,
  children,
  autoComplete,
  disabled,
}: { field: ControllerRenderProps } & Omit<CustomFormProps<T>, "control">) => {
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
              autoComplete={autoComplete} 
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case "phoneInput":
      return (
        <FormControl>
          <PhoneInput
            autoComplete="tel"
            defaultCountry="US"
            placeholder={placeholder}
            international
            value={field.value}
            disabled={disabled}
            onChange={field.onChange}
            withCountryCallingCode
            className="input-phone"
          />
        </FormControl>
      );
    case "datePicker":
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
        />
          <FormControl>
            <DatePicker
              wrapperClassName="date-picker"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showTimeSelect}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              className="date-picker"
            />
          </FormControl>
        </div>
      );
    case "select":
      return (
        <FormControl>
          <Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case "checkbox":
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );
    case "textarea":
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              autoComplete={autoComplete}
              className="shad-textArea"
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
    case "skeleton":
      return renderSkeleton ? renderSkeleton(field) : null;
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
  dateFormat?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  children?: ReactNode;
  renderSkeleton?: (field: ControllerRenderProps) => React.ReactNode;
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
        <FormItem className="flex-1">
          {fieldType !== "checkbox" && label && <FormLabel>{label}</FormLabel>}
          <RenderField<T>
            field={field as ControllerRenderProps}
            fieldType={fieldType}
            name={name}
            label={label}
            {...props}
          />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
