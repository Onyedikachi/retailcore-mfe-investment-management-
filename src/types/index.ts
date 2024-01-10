import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

export type IconType =
  | "filter"
  | "eye"
  | "arrow-right"
  | "open-link"
  | "three-bar"
  | "block";

export interface MenuItemContentsProps {
  label: string;
  href?: string;
}

export interface ButtonProps {
  text: string;
  icon?: any;
  classProps?: string;
}

export interface SelectProps {
  options: any[];
  handleSelected: (value) => void;
  value?: any;
}
export interface BorderlessSelectProps {
  options: any[];
  handleSelected?: (value) => void;
  labelName?: string;
  register?: any;
  inputError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  clearErrors?: any;
  inputName?: string | null | undefined;
  defaultValue?: any;
  placeholder?: any;
  errors?: any;
  setValue?: any;
  allLabel?: any;
  requiredField?: boolean;
  tip?: any;
  error?: any;
  trigger?: any;
  disabled?: boolean
  isCharge?: boolean
  value? : any;
  defaultProperty?: any
}

export interface ActiveFilterProps {}

export interface StatusCategory {
  id: number;
  type: string;
}

export interface StatusItem {
  type: string;
  color: string;
  id: number;
}

export interface StatusCardProps {
  category: string;
  setCategory: (e: string) => void;
}

export enum StatusCategoryType {
  AllProducts = "all products",
  Requests = "requests",
  Investments = "investments"
  // Add other category types here
}

export enum StatusItemType {
  Type = "type",
  Request = "request",
}

export interface formStepItem {
  id: number;
  label: string;
  index: number;
}
