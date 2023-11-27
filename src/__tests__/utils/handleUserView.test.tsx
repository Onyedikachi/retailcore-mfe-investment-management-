import { handleUserView } from "../../utils/handleUserView";

describe("handleUserView", () => {
  // Tests that handleUserView returns "in-review" when value is "P" and checker is false
  it('should return "in-review" when value is "P" and checker is false', () => {
    // Arrange
    const value = "P";
    const checker = false;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("in-review");
  });

  // Tests that handleUserView returns "pending" when value is "P" and checker is true
  it('should return "pending" when value is "P" and checker is true', () => {
    // Arrange
    const value = "P";
    const checker = true;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("pending");
  });

  // Tests that handleUserView returns "draft" when value is "D"
  it('should return "draft" when value is "D"', () => {
    // Arrange
    const value = "D";
    const checker = false;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("draft");
  });

  // Tests that handleUserView returns "approved" when value is "A"
  it('should return "approved" when value is "A"', () => {
    // Arrange
    const value = "A";
    const checker = false;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("approved");
  });

  // Tests that handleUserView returns "in-issue" when value is "I" and checker is false
  it('should return "in-issue" when value is "I" and checker is false', () => {
    // Arrange
    const value = "I";
    const checker = false;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("in-issue");
  });

  // Tests that handleUserView returns "rejected" when value is "I" and checker is true
  it('should return "rejected" when value is "I" and checker is true', () => {
    // Arrange
    const value = "I";
    const checker = true;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("rejected");
  });

  // Tests that handleUserView returns "in-issue" when value is "I" and checker is false
  it('should return "in-issue" when value is "R" and checker is false', () => {
    // Arrange
    const value = "R";
    const checker = false;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("in-issue");
  });

  // Tests that handleUserView returns "rejected" when value is "I" and checker is true
  it('should return "rejected" when value is "R" and checker is true', () => {
    // Arrange
    const value = "R";
    const checker = true;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe("rejected");
  });

  it('should return valye when value is "T" and checker is true', () => {
    // Arrange
    const value = "T";
    const checker = true;

    // Act
    const result = handleUserView(value, checker);

    // Assert
    expect(result).toBe(value);
  });
});
