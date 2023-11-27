import { colorState } from "../../constants";
import { handleColorState } from "../../utils/handleColorState";

describe("handleColorState", () => {
  // Tests that the function returns the correct color state for the value "approved"
  it('should return the correct color state for the value "approved"', () => {
    expect(handleColorState("approved")).toBe(colorState["approved"]);
  });

  // Tests that the function returns the correct color state for the value "A"
  it('should return the correct color state for the value "A"', () => {
    expect(handleColorState("A")).toBe(colorState["approved"]);
  });

  // Tests that the function returns the correct color state for the value "in-review"
  it('should return the correct color state for the value "in-review"', () => {
    expect(handleColorState("in-review")).toBe(colorState["in-review"]);
  });

  // Tests that the function returns the correct color state for the value "P"
  it('should return the correct color state for the value "P"', () => {
    expect(handleColorState("P")).toBe(colorState["in-review"]);
  });

  // Tests that the function returns the correct color state for the value "in-issue"
  it('should return the correct color state for the value "in-issue"', () => {
    expect(handleColorState("in-issue")).toBe(colorState["in-issue"]);
  });

  // Tests that the function returns the correct color state for the value "R"
  it('should return the correct color state for the value "R"', () => {
    expect(handleColorState("R")).toBe(colorState["in-issue"]);
  });

  // Tests that the function returns the correct color state for the value "draft"
  it('should return the correct color state for the value "draft"', () => {
    expect(handleColorState("draft")).toBe(colorState["draft"]);
  });

  // Tests that the function returns the correct color state for the value "D"
  it('should return the correct color state for the value "D"', () => {
    expect(handleColorState("D")).toBe(colorState["draft"]);
  });

  // Tests that the function returns the correct color state for the value "I"
  it('should return the correct color state for the value "I"', () => {
    expect(handleColorState("I")).toBe(colorState["draft"]);
  });
});
