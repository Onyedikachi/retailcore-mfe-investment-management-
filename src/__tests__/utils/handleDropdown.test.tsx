import { handleDropdown } from "../../utils/handleDropdown";

describe("handleDropdown", () => {
  // Tests that the function returns an array of dropdown options when valid status and type are provided
  it("should return an array of dropdown options when valid status and type are provided", () => {
    // Arrange
    const status = "A";
    const type = "create";

    // Act
    const result = handleDropdown(status, type, []);

    // Assert
    expect(Array.isArray(result)).toBe(true);
  });

  // Tests that the function returns an empty array when an invalid status is provided
  it("should return an empty array when an invalid status is provided", () => {
    // Act
    const result = handleDropdown("", "", "");

    // Assert
    expect(result).toEqual([]);
  });
});
