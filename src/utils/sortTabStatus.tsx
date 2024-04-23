import {
  StatusRequests,
  StatusTypes,
  IndividualStatusTypes,
  SecurityStatusTypes,
} from "@app/constants";
import { StatusCategoryType } from "@app/constants/enums";

export const sortTabStatus = (
  value: string,
  category: string,
  tab?: string
) => {
  // IndividualStatusTypes
  return (
    category === StatusCategoryType.Requests
      ? StatusRequests
      : category === StatusCategoryType.Investments
      ? tab === "security-purchase"
        ? SecurityStatusTypes
        : IndividualStatusTypes
      : StatusTypes
  ).find((i) => i.type.toLowerCase() === value.toLowerCase())?.id;
  // StatusRequests
};
