import { DropDownOptions, creationMap } from "@app/constants";

export function handleDropdown(status: string, type: string, permissions?: any) {
  if (!status || !type) return [];

  //returns table options depending on whether its creation or activation
  const firstLevel =
    DropDownOptions[
      creationMap.includes(type.toLowerCase()) ? "creation" : "activation"
    ];

  const selectedType: any = firstLevel?.find(
    (i: any, index: any) =>
      Object.keys(i).toString().toLowerCase() === status.toLowerCase()
  );

  if (!selectedType) return [];

  if (permissions?.includes("CREATE_PRODUCT")) {
    return selectedType[status];
  } else {
    return selectedType[status].filter((i) => i.text.toLowerCase() === "view");
  }
}
