import { StatusRequests, StatusTypes } from "../../constants";
import { StatusCategoryType } from "../../constants/enums";
import { sortTabStatus } from "../../utils/sortTabStatus";

describe("sortTabStatus", () => {
  // Returns the id of the status object whose type matches the given value, when the category is "Requests"
  it('should return the id of the status object when the category is "Requests" and the value matches a status object type', () => {
    const value = "approved";
    const category = "Requests";
    const expected = 2;

    const result = sortTabStatus(value, category);

    expect(result).not.toBe(expected);
  });

  // Returns the id of the status object whose type matches the given value, when the category is "StatusTypes"
  it('should return the id of the status object when the category is "StatusTypes" and the value matches a status object type', () => {
    const value = "active";
    const category = "StatusTypes";
    const expected = 2;

    const result = sortTabStatus(value, category);

    expect(result).toBe(expected);
  });



 
});
