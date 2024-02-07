import { DropDownOptions, creationMap } from "@app/constants";

export function handleDropdown(
  status: string,
  type: string,
  permissions?: any,
  created_By_Id?: string,
  userId?: string
) {
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

  if (
    ((permissions?.includes("CREATE_INVESTMENT_PRODUCT") ||
      permissions?.includes("BOOK_INVESTMENT")) &&
      created_By_Id === userId) ||
    (permissions?.includes("CREATE_INVESTMENT_PRODUCT") &&
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS")) ||
    (permissions?.includes("BOOK_INVESTMENT") &&
      permissions?.includes("VIEW_ALL_INVESTMENT_REQUESTS"))
  ) {
    return selectedType[status];
  } else {
    return selectedType[status].filter((i) => i.text.toLowerCase() === "view");
  }
}
