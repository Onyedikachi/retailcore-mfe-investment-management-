import {
  StatusRequests,
  StatusTypes,
  IndividualStatusTypes,
} from "@app/constants";
import { StatusCategoryType } from "@app/constants/enums";

export const sortTabStatus = (value: string, category: string) => {
 
  // IndividualStatusTypes
  return (
    category === StatusCategoryType.Requests
      ? StatusRequests
      : category === StatusCategoryType.Investments
      ? IndividualStatusTypes
      : StatusTypes
  ).find((i) => i.type.toLowerCase() === value.toLowerCase())?.id;
  // StatusRequests
};
