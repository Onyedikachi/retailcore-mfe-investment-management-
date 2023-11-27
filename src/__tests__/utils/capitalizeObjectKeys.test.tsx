import { capitalizeObjectKeys } from "../../utils/capitalizeObjectKeys";

describe("capitalizeObjectKeys", () => {
  // Tests that the function returns an empty array when given an empty array
  it("should return an empty array when given an empty array", () => {
    const input = [];
    const result = capitalizeObjectKeys(input);
    expect(result).toEqual([]);
  });

  // Tests that the function returns an array of objects with capitalized keys when given an array of objects with lowercase keys
  it("should return an array of objects with capitalized keys when given an array of objects with lowercase keys", () => {
    const input = [
      { name: "john", age: 25 },
      { name: "jane", age: 30 },
    ];
    const result = capitalizeObjectKeys(input);
    expect(result).toEqual([
      { Name: "john", Age: 25 },
      { Name: "jane", Age: 30 },
    ]);
  });

  // Tests that the function throws an error when given a non-array input
  it("should throw an error when given a non-array input", () => {
    const input = "not an array";
    expect(() => capitalizeObjectKeys(input)).toThrowError(
      "Input must be an array of objects"
    );
  });

  // Tests that the function returns an array of objects with capitalized keys when given an array of objects with mixed case keys
  it("should return an array of objects with capitalized keys when given an array of objects with mixed case keys", () => {
    const input = [
      { Name: "john", Age: 25 },
      { Name: "jane", Age: 30 },
    ];
    const result = capitalizeObjectKeys(input);
    expect(result).toEqual([
      { Name: "john", Age: 25 },
      { Name: "jane", Age: 30 },
    ]);
  });

  // Tests that the function returns an array of objects with capitalized keys when given an array of objects with only one key
  it("should return an array of objects with capitalized keys when given an array of objects with only one key", () => {
    const input = [{ name: "john" }, { name: "jane" }];
    const result = capitalizeObjectKeys(input);
    expect(result).toEqual([{ Name: "john" }, { Name: "jane" }]);
  });

  // Tests that the function returns an array of objects with capitalized keys when given an array of objects with only non-string keys
  it("should return an array of objects with capitalized keys when given an array of objects with only non-string keys", () => {
    const input = [
      { 1: "john", 2: 25 },
      { 1: "jane", 2: 30 },
    ];
    const result = capitalizeObjectKeys(input);
    expect(result).toEqual([
      { 1: "john", 2: 25 },
      { 1: "jane", 2: 30 },
    ]);
  });

  it("should handle objects without own properties", () => {
    const inputArray = [{}, { id: 1 }, { name: "Alice" }];

    const result = capitalizeObjectKeys(inputArray);

    expect(result).toEqual([{}, { Id: 1 }, { Name: "Alice" }]);
  });
});
