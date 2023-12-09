import { StatusRequests, StatusTypes } from "@app/constants";
import { StatusCategoryType } from "@app/constants/enums";

export const sortTabStatus = (value: string, category: string) => {
  return (
    category === StatusCategoryType.Requests ? StatusRequests : StatusTypes
  ).find((i) => i.type.toLowerCase() === value.toLowerCase())?.id;
  // StatusRequests
};
