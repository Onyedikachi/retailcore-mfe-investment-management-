export function handleUserView(value: any, checker) {
  switch (value) {
    case 1:
      return !checker ? "in-review" : "pending";
    case 0:
      return "draft";
    case 2:
      return "approved";
    case 3:
      return !checker ? "in-issue" : "rejected";
    case 3:
      return !checker ? "in-issue" : "rejected";
    default:
      return value;
  }
}
