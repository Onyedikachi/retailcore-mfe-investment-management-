import { getRequestType } from "../../utils/requestType";

describe("getRequestType", () => {
  // Tests that getRequestType returns "bulk creation" when type is "BULK_CREATE"
  it('should return "bulk creation" when type is "BULK_CREATE"', () => {
    expect(getRequestType("BULK_CREATE")).toBe("bulk creation");
  });

  // Tests that getRequestType returns "creation" when type is "CREATE"
  it('should return "creation" when type is "CREATE"', () => {
    expect(getRequestType("CREATE")).toBe("creation");
  });

  // Tests that getRequestType returns "deactivation" when type is "DEACTIVATE"
  it('should return "deactivation" when type is "DEACTIVATE"', () => {
    expect(getRequestType("DEACTIVATE")).toBe("deactivation");
  });

  // Tests that getRequestType returns "reactivation" when type is "REACTIVATE"
  it('should return "reactivation" when type is "REACTIVATE"', () => {
    expect(getRequestType("REACTIVATE")).toBe("reactivation");
  });

  // Tests that getRequestType returns "modification" when type is "CHANGE"
  it('should return "modification" when type is "CHANGE"', () => {
    expect(getRequestType("CHANGE")).toBe("modification");
  });

  // Tests that getRequestType returns "configuration" when type is "CONFIGURATION"
  it('should return "configuration" when type is "CONFIGURATION"', () => {
    expect(getRequestType("CONFIGURATION")).toBe("configuration");
  });
});
