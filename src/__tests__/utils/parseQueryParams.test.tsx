import { parseQueryParams } from "../../utils/parseQueryParams";

describe("parseQueryParams", () => {
  // Tests that the function returns an instance of URLSearchParams
  it("should return an instance of URLSearchParams when called with valid query params", () => {
    const queryParams = {
      param1: "value1",
      param2: "value2",
    };
    const result = parseQueryParams(queryParams);
    expect(result).toBeInstanceOf(URLSearchParams);
  });

  // Tests that the function appends all non-array query params to the URLSearchParams instance
  it("should append all non-array query params to the URLSearchParams instance", () => {
    const queryParams = {
      param1: "value1",
      param2: "value2",
    };
    const result = parseQueryParams(queryParams);
    expect(result.get("param1")).toBe("value1");
    expect(result.get("param2")).toBe("value2");
  });

  // Tests that the function appends all items in an array query param to the URLSearchParams instance
  it("should append all items in an array query param to the URLSearchParams instance", () => {
    const queryParams = {
      param1: ["value1", "value2"],
    };
    const result = parseQueryParams(queryParams);
    expect(result.get("param1")).toBe("value1");
    expect(result.getAll("param1")).toEqual(["value1", "value2"]);
  });

  // Tests that the function sets boolean query params to their corresponding key in the URLSearchParams instance
  it("should set boolean query params to their corresponding key in the URLSearchParams instance", () => {
    const queryParams = {
      param1: true,
      param2: false,
    };
    const result = parseQueryParams(queryParams);
    expect(result.get("param1")).toBe("true");
    expect(result.get("param2")).toBe("false");
  });

  // Tests that the function handles an empty query params object
  it("should handle an empty query params object", () => {
    const queryParams = {};
    const result = parseQueryParams(queryParams);
    expect(result.toString()).toBe("");
  });

  // Tests that the function handles a query params object with null or undefined values
  it("should handle a query params object with null or undefined values", () => {
    const queryParams = {
      param1: null,
      param2: undefined,
    };
    const result = parseQueryParams(queryParams);
    expect(result.get("param1")).toBeNull();
    expect(result.get("param2")).toBeNull();
  });
});
