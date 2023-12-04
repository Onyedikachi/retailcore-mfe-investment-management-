import { StatusRequests, StatusTypes } from "@app/constants";
import { StatusCategoryType } from "@app/constants/enums";

export const sortTabStatus = (value: string, category: string) => {
  console.log("🚀 ~ file: sortTabStatus.tsx:5 ~ sortTabStatus ~ category:", category)
  console.log("🚀 ~ file: sortTabStatus.tsx:5 ~ sortTabStatus ~ value:", value)
  return (
    category === StatusCategoryType.Requests ? StatusRequests : StatusTypes
  ).find((i) => i.type.toLowerCase() === value.toLowerCase())?.id;
  // StatusRequests
};
