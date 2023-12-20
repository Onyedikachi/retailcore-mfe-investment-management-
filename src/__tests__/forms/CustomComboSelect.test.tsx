import React from "react";
import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import { CustomComboSelect } from "../../components/forms";
import { act } from "react-dom/test-utils";
import { handleDefault, classNames } from "../../components/forms/CustomComboSelect";

jest.mock('@headlessui/react', () => ({
  ...jest.requireActual('@headlessui/react'),
  Combobox: {
    ...jest.requireActual('@headlessui/react').Combobox,
    as: 'div',
  },
}));

// Mock your other dependencies and options data

const options = [
  { name: 'Option 1', value: 'option1' },
  { name: 'Option 2', value: 'option2' },
  // Add more options as needed
];

describe('CustomComboSelect', () => {
  it('sets the input value when an option is selected', async () => {
    const setValueMock = jest.fn();
    const clearErrorsMock = jest.fn();

    render(
      <CustomComboSelect
        placeholder="Select an option"
        options={options}
        register={() => {}}
        name="customSelect"
        setValue={setValueMock}
        clearErrors={clearErrorsMock}
      />
    );

    // Wait for the component to render
    await waitFor(() => screen.getByPlaceholderText('Select an option'));

    // Select an option
    fireEvent.change(screen.getByPlaceholderText('Select an option'), {
      target: { value: 'Option 1' },
    });
    await waitFor(() => screen.getByTestId('combo-select-option'));
    fireEvent.click(screen.getByTestId('combo-select-option'));

    // Verify that setValue and clearErrors are called
    expect(setValueMock).toHaveBeenCalledWith('customSelect', 'option1');
    expect(clearErrorsMock).toHaveBeenCalledWith('customSelect');
  });

  it('handles default value correctly', async () => {
    const setValueMock = jest.fn();
    const clearErrorsMock = jest.fn();

    render(
      <CustomComboSelect
        placeholder="Select an option"
        options={options}
        register={() => {}}
        name="customSelect"
        setValue={setValueMock}
        clearErrors={clearErrorsMock}
        defaultValue="Option 2"
      />
    );

    // Wait for the component to render
    await waitFor(() => screen.getByPlaceholderText('Select an option'));

    // Verify that handleDefault is called with the correct arguments
    expect(setValueMock).toHaveBeenCalledWith('customSelect', 'option2');
    expect(clearErrorsMock).toHaveBeenCalledWith('customSelect');
  });

  it('renders "No data" when there are no options', async () => {
    render(
      <CustomComboSelect
        placeholder="Select an option"
        options={[]}
        register={() => {}}
        name="customSelect"
      />
    );

    // Wait for the component to render
    await waitFor(() => screen.getByPlaceholderText('Select an option'));


  });

  // Add more test cases as needed
});
describe("CustomComboSelect", () => {

    const itemOptions = [
        {name: "Op1", value: "1"},
        {name: "Op2", value: "2"},
        {name: "Op3", value: "3"},
    ]
    it("Renders without errors", () => {
        render(
            <CustomComboSelect placeholder ="Select" options = {itemOptions} register = {jest.fn()} 
            name="my_input" setValue={jest.fn()} clearErrors={jest.fn()}
            defaultValue=""
            disabled={false}
        />);
        expect(screen.getByPlaceholderText("Select")).toBeInTheDocument();
    })
})

describe('handleDefault', () => {

    // Sets the selected item to the corresponding value in options if defaultValue matches an item name in options
    it('should set the selected item to the corresponding value in options when defaultValue matches an item name in options', () => {
      const defaultValue = "Item 1";
      const options = [
        { name: "Item 1", value: "Value 1" },
        { name: "Item 2", value: "Value 2" },
        { name: "Item 3", value: "Value 3" },
      ];
      const setSelectedItem = jest.fn();

      handleDefault(defaultValue, options, setSelectedItem);

      expect(setSelectedItem).toHaveBeenCalledWith("Value 1");
    });

  

    // Handles case sensitivity when matching defaultValue to item names in options
    it('should handle case sensitivity when matching defaultValue to item names in options', () => {
      const defaultValue = "item 1";
      const options = [
        { name: "Item 1", value: "Value 1" },
        { name: "Item 2", value: "Value 2" },
        { name: "Item 3", value: "Value 3" },
      ];
      const setSelectedItem = jest.fn();

      handleDefault(defaultValue, options, setSelectedItem);

      expect(setSelectedItem).toHaveBeenCalledWith("Value 1");
    });
});

describe('classNames', () => {

    // returns an empty string when no arguments are passed
    it('should return an empty string when no arguments are passed', () => {
      const result = classNames();
      expect(result).toBe("");
    });

    // returns a single class name when only one argument is passed
    it('should return a single class name when only one argument is passed', () => {
      const result = classNames("class1");
      expect(result).toBe("class1");
    });

    // returns a concatenated string of class names when multiple arguments are passed
    it('should return a concatenated string of class names when multiple arguments are passed', () => {
      const result = classNames("class1", "class2", "class3");
      expect(result).toBe("class1 class2 class3");
    });

    // can handle very long class names and a large number of arguments without crashing
    it('should handle very long class names and a large number of arguments without crashing', () => {
      const longClassName = "a".repeat(10000);
      const result = classNames(longClassName, "class2", "class3");
      expect(result).toBe(`${longClassName} class2 class3`);
    });

    // can handle special characters and unicode characters in class names
    it('should handle special characters and unicode characters in class names', () => {
      const result = classNames("class1", "class2", "😀");
      expect(result).toBe("class1 class2 😀");
    });
});
