import { lowerObjectKeys } from "../../utils/lowerObjectKeys";

describe("lowerObjectKeys", () => {
  // Tests that the function returns an empty array when given an empty array
  it("should return an empty array when given an empty array", () => {
    const input = [];
    const result = lowerObjectKeys(input);
    expect(result).toEqual([]);
  });

  // Tests that the function returns an array of objects with lowerd keys when given an array of objects with lowercase keys
  it("should return an array of objects with lowerd keys when given an array of objects with lowercase keys", () => {
    const input = [
      { name: "john", age: 25 },
      { name: "jane", age: 30 },
    ];
    const result = lowerObjectKeys(input);
    expect(result).toEqual([
      { name: "john", age: 25 },
      { name: "jane", age: 30 },
    ]);
  });

  // Tests that the function throws an error when given a non-array input
  it("should throw an error when given a non-array input", () => {
    const input = "not an array";
    expect(() => lowerObjectKeys(input)).toThrowError(
      "Input must be an array of objects"
    );
  });

  // Tests that the function returns an array of objects with lowerd keys when given an array of objects with mixed case keys
  it("should return an array of objects with lowerd keys when given an array of objects with mixed case keys", () => {
    const input = [
      { Name: "john", Age: 25 },
      { name: "jane", age: 30 },
    ];
    const result = lowerObjectKeys(input);
    expect(result).toEqual([
      { name: "john", age: 25 },
      { name: "jane", age: 30 },
    ]);
  });

  // Tests that the function returns an array of objects with lowerd keys when given an array of objects with only one key
  it("should return an array of objects with lowerd keys when given an array of objects with only one key", () => {
    const input = [{ name: "john" }, { name: "jane" }];
    const result = lowerObjectKeys(input);
    expect(result).toEqual([{ name: "john" }, { name: "jane" }]);
  });

  // Tests that the function returns an array of objects with lowerd keys when given an array of objects with only non-string keys
  it("should return an array of objects with lowerd keys when given an array of objects with only non-string keys", () => {
    const input = [
      { 1: "john", 2: 25 },
      { 1: "jane", 2: 30 },
    ];
    const result = lowerObjectKeys(input);
    expect(result).toEqual([
      { 1: "john", 2: 25 },
      { 1: "jane", 2: 30 },
    ]);
  });

  it("should handle objects without own properties", () => {
    const inputArray = [{}, { id: 1 }, { name: "Alice" }];

    const result = lowerObjectKeys(inputArray);

    expect(result).toEqual([{}, { id: 1 }, { name: "Alice" }]);
  });
});
