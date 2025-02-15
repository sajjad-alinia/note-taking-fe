import { InputHTMLAttributes } from "react";
import { RegisterOptions } from "react-hook-form";

type TInput = {
  label?: string;
  name: string;
  rules?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

export default TInput;
