export function getRequestType(type: string) {
  switch (type) {
    case "BULK_CREATE":
      return "bulk creation";

    case "CREATE":
      return "creation";
    case "DEACTIVATE":
      return "deactivation";
    case "REACTIVATE":
      return "reactivation";
    case "CHANGE":
      return "modification";
    case "CONFIGURATION":
      return "configuration";
  }
}
