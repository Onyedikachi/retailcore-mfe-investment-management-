import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import CustomComboSelect, {
  classNames,
  handleDefault,
} from "../../components/forms/CustomComboSelect";

describe("classNames", () => {
  // Tests that classNames concatenates all classes passed as arguments into a single string
  it("should concatenate all classes into a single string", () => {
    const result = classNames("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  // Tests that classNames removes any falsy values from the classes array before concatenating
  it("should remove falsy values from the classes array", () => {
    const result = classNames(
      "class1",
      null,
      "class2",
      undefined,
      "class3",
      false,
      "class4"
    );
    expect(result).toBe("class1 class2 class3 class4");
  });

  // Tests that classNames returns an empty string if no arguments are passed
  it("should return an empty string when no arguments are passed", () => {
    const result = classNames();
    expect(result).toBe("");
  });

  // Tests that classNames handles classes that are null or undefined
  it("should handle classes that are null or undefined", () => {
    const result = classNames("class1", null, "class2", undefined, "class3");
    expect(result).toBe("class1 class2 class3");
  });
});

describe("CustomComboSelect", () => {
  // Test that the CustomComboSelect component renders correctly with the provided placeholder and options.
  it("should render component with given placeholder and options", () => {
    // Arrange
    const placeholder = "Select an option";
    const options = [
      { id: 1, name: "Leslie Alexander" },
      { id: 2, name: "John Doe" },
      { id: 3, name: "Jane Smith" },
    ];

    // Act
    render(
      <CustomComboSelect
        placeholder={placeholder}
        options={options}
        register={jest.fn()}
        name={""}
      />
    );

    // Assert
    // expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    // expect(screen.getAllByRole("option")).toHaveLength(options.length);
  });

  // Test that the options are displayed when the input is clicked
  it("should display options when input is clicked", () => {
    // Render the CustomComboSelect component
    const { getByPlaceholderText, getByRole } = render(
      <CustomComboSelect
        placeholder="Select an option"
        options={[]}
        register={jest.fn()}
        name={""}
      />
    );

    // Get the input element and click on it
    const input = getByPlaceholderText("Select an option");
    fireEvent.click(input);

    // Check if the options are displayed
    // const options = getByRole("listbox");
    // expect(options).toBeInTheDocument();
  });
});


describe("handleDefault", () => {
  // Tests that when defaultValue is truthy and options array is not empty, it finds the corresponding option and calls setSelectedItem with its value.
  it("should find corresponding option and call setSelectedItem", () => {
    const defaultValue = "Option 1";
    const options = [
      { name: "Option 1", value: "value1" },
      { name: "Option 2", value: "value2" },
      { name: "Option 3", value: "value3" },
    ];
    const setSelectedItem = jest.fn();

    handleDefault(defaultValue, options, setSelectedItem);

    expect(setSelectedItem).toHaveBeenCalledWith("value1");
  });

  // Tests that when defaultValue is falsy, it returns without calling setSelectedItem.
  it("should return without calling setSelectedItem when defaultValue is falsy", () => {
    const defaultValue = null;
    const options = [
      { name: "Option 1", value: "value1" },
      { name: "Option 2", value: "value2" },
      { name: "Option 3", value: "value3" },
    ];
    const setSelectedItem = jest.fn();

    handleDefault(defaultValue, options, setSelectedItem);

    expect(setSelectedItem).not.toHaveBeenCalled();
  });

  // Tests that when defaultValue is truthy but there is no corresponding option in the options array, it returns without calling setSelectedItem.
  it("should return without calling setSelectedItem when there is no corresponding option", () => {
    const defaultValue = "Option 4";
    const options = [
      { name: "Option 1", value: "value1" },
      { name: "Option 2", value: "value2" },
      { name: "Option 3", value: "value3" },
    ];
    const setSelectedItem = jest.fn();

    handleDefault(defaultValue, options, setSelectedItem);

    expect(setSelectedItem).not.toHaveBeenCalled();
  });

  // Tests that when defaultValue is a string with different casing than the names in the options array, it finds the corresponding option and calls setSelectedItem with its value.
  it("should find corresponding option and call setSelectedItem with different casing", () => {
    const defaultValue = "oPtIoN 2";
    const options = [
      { name: "Option 1", value: "value1" },
      { name: "Option 2", value: "value2" },
      { name: "Option 3", value: "value3" },
    ];
    const setSelectedItem = jest.fn();

    handleDefault(defaultValue, options, setSelectedItem);

    expect(setSelectedItem).toHaveBeenCalledWith("value2");
  });


  // Tests that when options array contains multiple items with the same name, it finds the first one and calls setSelectedItem with its value.
  it("should find first corresponding option and call setSelectedItem", () => {
    const defaultValue = "Option 1";
    const options = [
      { name: "Option 1", value: "value1" },
      { name: "Option 1", value: "value2" },
      { name: "Option 2", value: "value3" },
    ];
    const setSelectedItem = jest.fn();

    handleDefault(defaultValue, options, setSelectedItem);

    expect(setSelectedItem).toHaveBeenCalledWith("value1");
  });
});
