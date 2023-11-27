import { removeNullEmptyKeys } from "../../utils/removeNullFromObj";

describe("removeNullEmptyKeys", () => {
  // Tests that the function returns an empty object if the input object is empty
  it("should return an empty object when the input object is empty", () => {
    const input = {};
    const result = removeNullEmptyKeys(input);
    expect(result).toEqual({});
  });

  // Tests that the function returns the same object if it has no null, undefined, empty string, or empty array values
  it("should return the same object when it has no null, undefined, empty string, or empty array values", () => {
    const input = { a: 1, b: "hello", c: [1, 2, 3] };
    const result = removeNullEmptyKeys(input);
    expect(result).toEqual(input);
  });
});
