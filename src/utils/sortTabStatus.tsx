import { StatusTypes } from "@app/constants";

export const sortTabStatus = (value: string) => {
  return StatusTypes.find((i) => i.type.toLowerCase() === value.toLowerCase())
    .id;
};
