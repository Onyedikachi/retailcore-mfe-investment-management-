export function handleUserView(value: string, checker) {
  switch (value) {
    case "P":
    case "in-review":
      return !checker ? "in-review" : "pending";
    case "D":
      return "draft";
    case "A":
      return "approved";
    case "I":
    case "in-issue":
      return !checker ? "in-issue" : "rejected";
    case "R":
      return !checker ? "in-issue" : "rejected";
    default:
      return value;
  }
}
