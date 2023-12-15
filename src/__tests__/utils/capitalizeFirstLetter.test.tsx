import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  // Tests that capitalizeFirstLetter capitalizes the first letter of a string with one word
  it("should capitalize the first letter of a string with one word", () => {
    const inputString = "hello";
    const expectedOutput = "Hello";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter capitalizes the first letter of the first word in a string with multiple words
  it("should capitalize the first letter of the first word in a string with multiple words", () => {
    const inputString = "hello world";
    const expectedOutput = "Hello world";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter returns an empty string if the input is an empty string
  it("should return an empty string if the input is an empty string", () => {
    const inputString = "";
    const expectedOutput = "";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter returns the input if it's not a string
  it("should return the input if its not a string", () => {
    const inputString = 123;
    const expectedOutput = 123;
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter capitalizes the first letter of a string with only one letter
  it("should capitalize the first letter of a string with only one letter", () => {
    const inputString = "a";
    const expectedOutput = "A";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter handles strings with non-alphabetic characters after the first letter
  it("should capitalize the first letter of a string with non-alphabetic characters after the first letter", () => {
    const inputString = "h#ello";
    const expectedOutput = "H#ello";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter handles strings with numbers as the first letter
  it("should capitalize the first letter of a string with numbers as the first letter", () => {
    const inputString = "123hello";
    const expectedOutput = "123hello";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter handles strings with non-ASCII characters as the first letter
  it("should capitalize the first letter of a string with a non-ASCII character as the first letter", () => {
    const inputString = "éello";
    const expectedOutput = "Éello";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter handles strings with non-ASCII characters after the first letter
  it("should capitalize the first letter of a string with a non-ASCII character after the first letter", () => {
    const inputString = "héllo";
    const expectedOutput = "Héllo";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  // Tests that capitalizeFirstLetter handles strings with multiple spaces between words
  it("should capitalize the first letter of a string with multiple spaces between words", () => {
    const inputString = "hello   world";
    const expectedOutput = "Hello   world";
    const result = capitalizeFirstLetter(inputString);
    expect(result).toBe(expectedOutput);
  });

  it("should capitalize the first letter of a non-empty string", () => {
    const input = "hello";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("Hello");
  });

  it("should not modify an empty string", () => {
    const input = "";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("");
  });

  it("should return the input if it's not a string", () => {
    const input = 123;
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(input);
  });

  it("should capitalize the first letter of a single-word string", () => {
    const input = "world";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("World");
  });

  it("should capitalize the first letter of each word in a sentence", () => {
    const input = "hello world";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("Hello world");
  });

  it("should not modify a string with only non-alphabetic characters", () => {
    const input = "!@#$%^";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("!@#$%^");
  });

  it("should handle mixed case strings", () => {
    const input = "mIXeD CaSe";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe("MIXeD CaSe");
  });
});




describe('capitalizeFirstLetter', () => {

  // Returns a string with the first letter capitalized if input is a non-empty string
  it('should return a string with the first letter capitalized when input is a non-empty string', () => {
    const input = "hello";
    const expectedOutput = "Hello";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expectedOutput);
  });

  // Returns an empty string if input is an empty string
  it('should return an empty string when input is an empty string', () => {
    const input = "";
    const expectedOutput = "";
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expectedOutput);
  });

  // Returns the input if it is not a string
  it('should return the input when it is not a string', () => {
    const input = 123;
    const expectedOutput = 123;
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expectedOutput);
  });

  // Returns the input if it is null
  it('should return the input when it is null', () => {
    const input = null;
    const expectedOutput = null;
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expectedOutput);
  });

  // Returns the input if it is undefined
  it('should return the input when it is undefined', () => {
    const input = undefined;
    const expectedOutput = undefined;
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expectedOutput);
  });

  // Returns the input if it is a number
  it('should return the input when it is a number', () => {
    const input = 123;
    const expectedOutput = 123;
    const result = capitalizeFirstLetter(input);
    expect(result).toBe(expectedOutput);
  });
});
