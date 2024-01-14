import { colorState } from "@app/constants";

export function handleColorState(value: string) {
  switch (value) {
    case "approved":
    case "A":
    case "active":
      return colorState["approved"];

    case "in-review":
    case "P":
    case "pending":
      return colorState["in-review"];

    case "in-issue":
    case "R":
      return colorState["in-issue"];

    case "draft":
    case "D":
    case "inactive":
    case "liquidated":
    case "I":
      return colorState["draft"];

    default:
      // Handle the default case if value doesn't match any of the above
      return colorState["default"];
  }
}
