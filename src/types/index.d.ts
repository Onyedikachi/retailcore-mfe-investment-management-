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
  options: array;
  handleSelected: (value) => void;
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
  AllBranches = "all branches",
  Requests = "requests",
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
