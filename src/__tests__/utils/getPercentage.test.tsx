import { getPercentage } from "../../utils/getPercentage";

describe("getPercentage", () => {
  // Tests that the function returns the correct percentage when total and success are positive integers
  it("should return the correct percentage when total and success are positive integers", () => {
    const total = 10;
    const success = 5;
    const expectedPercentage = 50;

    const result = getPercentage(total, success);

    expect(result).toBe(expectedPercentage);
  });

  // Tests that the function returns 100 when success is equal to total
  it("should return 100 when success is equal to total", () => {
    const total = 10;
    const success = 10;
    const expectedPercentage = 100;

    const result = getPercentage(total, success);

    expect(result).toBe(expectedPercentage);
  });

  // Tests that the function returns 0 when success is equal to 0
  it("should return 0 when success is equal to 0", () => {
    const total = 10;
    const success = 0;
    const expectedPercentage = 0;

    const result = getPercentage(total, success);

    expect(result).toBe(expectedPercentage);
  });

  // Tests that the function returns the correct percentage when success is less than total
  it("should return the correct percentage when success is less than total", () => {
    const total = 10;
    const success = 3;
    const expectedPercentage = 30;

    const result = getPercentage(total, success);

    expect(result).toBe(expectedPercentage);
  });
});
