import { ChangeEvent, InputHTMLAttributes } from "react";
import { RegisterOptions } from "react-hook-form";
import { VARIANTS } from ".";

export type TTextarea = {
  label?: string;
  name: string;
  rules?: RegisterOptions;
  rows: number;
  variant?: keyof typeof VARIANTS;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & InputHTMLAttributes<HTMLTextAreaElement>;
