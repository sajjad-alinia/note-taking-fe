import { ChangeEvent, InputHTMLAttributes } from "react";
import { RegisterOptions } from "react-hook-form";

type TInput = {
  label?: string;
  name: string;
  rules?: RegisterOptions;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  Placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default TInput;
