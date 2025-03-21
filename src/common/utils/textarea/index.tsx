import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TTextarea } from "./types";
import { twMerge } from "tailwind-merge";

export const VARIANTS = {
  default:
    "w-full h-fit outline-none bg-slate-100 rounded-md p-2 mt-1.5 text-xs",
  note: "w-full h-fit outline-none bg-transparent rounded-md p-2 mt-1.5 text-xs",
} as const;

const Textarea = ({
  name,
  label,
  rules,
  rows,
  variant,
  onChange,
  ...props
}: TTextarea) => {
  const { control } = useFormContext();
  const id = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex-1 flex-col w-full h-fit mb-3">
          {label && (
            <label htmlFor={id} className="text-sm">
              {label}
            </label>
          )}
          <textarea
            {...field}
            {...props}
            rows={rows}
            id={id}
            className={twMerge(`${VARIANTS[variant ?? "default"]}`)}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
          />
          {fieldState.error?.message && (
            <span className="text-red-500 text-xs mt-2.5">
              {fieldState.error?.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Textarea;
