import { Controller, useFormContext } from "react-hook-form";
import TInput from "./types";
import { useId } from "react";

const Input = ({ name, label, type, placeholder, onChange, rules }: TInput) => {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex-1 flex-col w-full h-fit ">
          {label && (
            <label htmlFor={id} className="text-sm">
              {label}
            </label>
          )}
          <input
            {...field}
            id={id}
            type={type}
            className="w-full h-fit outline-none rounded-md p-2 mt-1.5"
            placeholder={placeholder}
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

export default Input;
