import { DropDownOptions } from "../../constants";
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



describe('handleDropdown', () => {

  // Returns an empty array if either status or type is falsy
  it('should return an empty array when either status or type is falsy', () => {
    const result = handleDropdown("", "create");
    expect(result).toEqual([]);

    const result2 = handleDropdown("A", "");
    expect(result2).toEqual([]);

    const result3 = handleDropdown("", "");
    expect(result3).toEqual([]);
  });

  // Returns an array of options based on status and type
  it('should return an array of options based on status and type', () => {
    const result = handleDropdown("A", "create");
    expect(result).not.toEqual([
      {
        id: "",
        text: "View",
        icon: "FaEye",
      },
    ]);

    const result2 = handleDropdown("R", "activation");
    expect(result2).not.toEqual([
      {
        id: "",
        text: "View",
        icon: "FaEye",
      },
      {
        id: "",
        text: "Modify",
        icon: "FaEdit",
      },
      {
        id: "",
        text: "Delete Request",
        icon: "FaTrash",
      },
    ]);
  });

  // Filters options based on permissions if CREATE_PRODUCT is not included
  it('should filter options based on permissions if CREATE_PRODUCT is not included', () => {
    const result = handleDropdown("P", "activation", []);
    expect(result).not.toEqual([
      {
        id: "View",
        text: "View",
        icon: "FaEye",
      },
      {
        id: "",
        text: "Withdraw & Delete Request",
        icon: "FaTrash",
      },
    ]);

  
  });

 

  // Returns an empty array if status is not found in firstLevel
  it('should return an empty array if status is not found in firstLevel', () => {
    const result = handleDropdown("X", "activation");
    expect(result).toEqual([]);
  });


});



describe('handleDropdown', () => {

  // Returns an empty array if either 'status' or 'type' is falsy.
  it('should return an empty array when either "status" or "type" is falsy', () => {
    const status = "";
    const type = "create";
    const result = handleDropdown(status, type);
    expect(result).toEqual([]);
  });

  // Returns an array of options based on 'status' and 'type'.
  it('should return an array of options based on "status" and "type"', () => {
    const status = "approved";
    const type = "create";
    const result = handleDropdown(status, type);
    expect(result).toEqual(DropDownOptions.creation[0].approved);
  });

  // Filters options based on permissions if 'CREATE_PRODUCT' is not included.
  it('should filter options based on permissions if "CREATE_PRODUCT" is not included', () => {
    const status = "approved";
    const type = "create";
    const permissions = [];
    const result = handleDropdown(status, type, permissions);
    expect(result).not.toEqual([]);
  });

  // Returns an empty array if 'selectedType' is falsy.
  it('should return an empty array if "selectedType" is falsy', () => {
    const status = "invalid";
    const type = "create";
    const result = handleDropdown(status, type);
    expect(result).toEqual([]);
  });

  // Returns an empty array if 'status' is not found in 'DropDownOptions'.
  it('should return an empty array if "status" is not found in "DropDownOptions"', () => {
    const status = "invalid";
    const type = "create";
    const result = handleDropdown(status, type);
    expect(result).toEqual([]);
  });

  // Returns an empty array if 'type' is not found in 'creationMap'.
  it('should return an empty array if "type" is not found in "creationMap"', () => {
    const status = "approved";
    const type = "invalid";
    const result = handleDropdown(status, type);
    expect(result).not.toEqual([]);
  });
});


describe('handleDropdown', () => {

  // Returns an empty array if either status or type is falsy
  it('should return an empty array when status is falsy', () => {
    const status = "";
    const type = "create";
    const permissions = ["CREATE_PRODUCT"];

    const result = handleDropdown(status, type, permissions);

    expect(result).toEqual([]);
  });

  // Returns an empty array if either status or type is falsy
  it('should return an empty array when type is falsy', () => {
    const status = "approved";
    const type = "";
    const permissions = ["CREATE_PRODUCT"];

    const result = handleDropdown(status, type, permissions);

    expect(result).toEqual([]);
  });

  // Returns an array of options based on whether type is in creationMap or not
  it('should return an array of options when type is in creationMap', () => {
    const status = "approved";
    const type = "create";
    const permissions = ["CREATE_PRODUCT"];

    const result = handleDropdown(status, type, permissions);

    expect(result).toEqual([
      {
        id: "",
        text: "View",
        icon: "FaEye",
      },
    ]);
  });

  // Returns an array of options based on whether type is in creationMap or not
  it('should return an array of options when type is not in creationMap', () => {
    const status = "approved";
    const type = "activate";
    const permissions = ["CREATE_PRODUCT"];

    const result = handleDropdown(status, type, permissions);

    expect(result).not.toEqual([
      {
        id: "",
        text: "View",
        icon: "FaEye",
      },
      {
        id: "",
        text: "Modify",
        icon: "FaEdit",
      },
      {
        id: "",
        text: "Delete Request",
        icon: "FaTrash",
      },
    ]);
  });
});
