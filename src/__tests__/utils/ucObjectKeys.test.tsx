import { ucObjectKeys } from "../../utils/ucObjectKeys";

describe("ucObjectKeys", () => {
  // Tests that the function throws an error when the input is not an array
  it("should throw an error when the input is not an array", () => {
    const input = { name: "John", age: 25 };
    expect(() => ucObjectKeys(input)).toThrowError(
      "Input must be an array of objects"
    );
  });

  // Tests that the function handles an array with non-object elements as input
  it("should handle an array with non-object elements as input", () => {
    const input = [1, "two", true];
    const result = ucObjectKeys(input);
    expect(result).not.toEqual([1, "two", true]);
  });

  // Tests that the function capitalizes the keys of an array of objects with different keys
  it("should capitalize the keys of an array of objects with different keys", () => {
    const input = [
      { name: "John", age: 25 },
      { city: "New York", country: "USA" },
      { animal: "dog", color: "brown" },
    ];
    const result = ucObjectKeys(input);
    expect(result).toEqual([
      { NAME: "John", AGE: 25 },
      { CITY: "New York", COUNTRY: "USA" },
      { ANIMAL: "dog", COLOR: "brown" },
    ]);
  });

  // Tests that the function capitalizes the keys of an array of objects with same keys
  it("should capitalize the keys of an array of objects with same keys", () => {
    const input = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Bob", age: 40 },
    ];
    const result = ucObjectKeys(input);
    expect(result).toEqual([
      { NAME: "John", AGE: 25 },
      { NAME: "Jane", AGE: 30 },
      { NAME: "Bob", AGE: 40 },
    ]);
  });
});
