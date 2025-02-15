import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type TForm<T extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
  submitHandler?: (data: T) => void;
};

export default TForm;
