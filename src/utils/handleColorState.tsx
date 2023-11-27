import { colorState } from "@app/constants";

export function handleColorState(value: string) {
  switch (value) {
    case "approved":
      return colorState["approved"];
    case "A":
      return colorState["approved"];

    case "in-review":
      return colorState["in-review"];
    case "P":
      return colorState["in-review"];

    case "in-issue":
      return colorState["in-issue"];
    case "R":
      return colorState["in-issue"];

    case "draft":
      return colorState["draft"];
    case "D":
      return colorState["draft"];
    case "I":
      return colorState["draft"];
  }
}
