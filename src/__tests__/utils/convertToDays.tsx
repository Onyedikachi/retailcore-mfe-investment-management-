
import { convertToDays } from "@app/utils/convertToDays";
import dayjs from "dayjs";

describe('convertToDays', () => {

  // Returns the input duration when type is 1
  it('should return the input duration when type is 1', () => {
    const duration = 5;
    const type = 1;
    const result = convertToDays(duration, type);
    expect(result).toBe(duration);
  });

  // Returns the duration in days when type is 2, 3 or 4


  // Uses the current date as a starting point for calculations
  it('should use the current date as a starting point for calculations', () => {
    const duration = 5;
    const type = 2;
    const startDate = dayjs();
    const result = convertToDays(duration, type);
    const expected = startDate.add(duration, "week").diff(startDate, "day");
    expect(result).toBe(expected);
  });

  // Throws an error when an invalid duration type is provided
  it('should throw an error when an invalid duration type is provided', () => {
    const duration = 5;
    const type = 5;
    expect(() => {
      convertToDays(duration, type);
    }).toThrowError("Invalid duration type. Supported types: days, weeks, months, years.");
  });

  // Returns 0 when duration is 0 and type is 2, 3 or 4
  it('should return 0 when duration is 0 and type is 2, 3 or 4', () => {
    const duration = 0;
    const types = [2, 3, 4];
    types.forEach((type) => {
      const result = convertToDays(duration, type);
      expect(result).toBe(0);
    });
  });

  // Returns NaN when duration is NaN and type is 2, 3 or 4
  it('should return NaN when duration is NaN and type is 2, 3 or 4', () => {
    const duration = NaN;
    const types = [2, 3, 4];
    types.forEach((type) => {
      const result = convertToDays(duration, type);
      expect(result).toBeNaN();
    });
  });
});
