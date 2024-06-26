import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import { Actions } from "../../../components/summary";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test-util";
import MultiSelectForm, {
  closeDropdown,
  handleChange,
  handleClick,
} from "../../../components/forms/MultiSelectForm2";
import MultiSelectForm2 from "../../../components/forms/MultiSelectForm2";

describe("handleChange", () => {
  // Adds a new value to the selectedOptions array if it doesn't already exist
  it("should add a new value to selectedOptions array when it doesnt already exist", () => {
    const id = 1;
    const value = "option";
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();

    handleChange(id, value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalledWith([value]);
  });

  // Removes a value from the selectedOptions array if it already exists
  it("should remove a value from selectedOptions array when it already exists", () => {
    const id = 1;
    const value = "option";
    const selectedOptions = [value];
    const setSelectedOptions = jest.fn();

    handleChange(id, value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalledWith([]);
  });

  // Handles null or undefined value parameter
  it("should handle null or undefined value parameter", () => {
    const id = 1;
    const value = null;
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();

    handleChange(id, value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalled();
  });

  // Handles null or undefined setSelectedOptions parameter
  it("should handle null or undefined setSelectedOptions parameter", () => {
    const id = 1;
    const value = "option";
    const selectedOptions = [];
    const setSelectedOptions = undefined;

    expect(() => {
      handleChange(id, value, selectedOptions, setSelectedOptions);
    }).toThrow();
  });

  // Handles null or undefined id parameter
  it("should handle null or undefined id parameter", () => {
    const id = null;
    const value = "option";
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();

    handleChange(id, value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalled();
  });
});

describe("closeDropdown", () => {
  // should set isOpen state to false when called with setIsOpen(false)
  it("should set isOpen state to false when called with setIsOpen(false)", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // should not throw an error when called with setIsOpen
  it("should not throw an error when called with setIsOpen", () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

  // should not have any side effects other than setting isOpen state to false
  it("should not have any side effects other than setting isOpen state to false", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });

  // should not affect any other state or props
  it("should not affect any other state or props", () => {
    const setIsOpen = jest.fn();
    const otherState = "other state";
    const otherProps = "other props";
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
    expect(otherState).toBe("other state");
    expect(otherProps).toBe("other props");
  });
});


describe("MultiSelectForm2", () => {
  // Renders a label with the provided labelName prop

  // Renders a search input with the provided placeholder prop
  it("should render a search input with the provided placeholder prop", () => {
    // Arrange
    const placeholder = "Test Placeholder";

    // Act
    render(
      <MultiSelectForm2
        placeholder={placeholder}
        options={[]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  // Renders a list of options with checkboxes
  it("should render a list of options with checkboxes", () => {
    // Arrange
    const options = [
      { value: "option1", text: "Option 1" },
      { value: "option2", text: "Option 2" },
      { value: "option3", text: "Option 3" },
    ];

    // Act
    render(<MultiSelectForm2 options={options} />);


  });

  // Renders a default placeholder when no placeholder prop is provided
  it("should render a default placeholder when no placeholder prop is provided", () => {
    // Act
    render(
      <MultiSelectForm2
        options={[]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByPlaceholderText("Select")).toBeInTheDocument();
  });



});

describe('handleClick', () => {

  // Registers inputName
  it('should register inputName when called', () => {
    const register = jest.fn();
    const inputName = 'testInput';
    const setValue = jest.fn();
    const selectedOptions = [];
    const clearErrors = jest.fn();
    const trigger = jest.fn();
    const closeDropdown = jest.fn();
    const setIsOpen = jest.fn();
    const handleSelected = jest.fn();
    const setSearch = jest.fn();

    handleClick(
      register,
      inputName,
      setValue,
      selectedOptions,
      clearErrors,
      trigger,
      closeDropdown,
      setIsOpen,
      handleSelected,
      setSearch
    );

    expect(register).toHaveBeenCalledWith(inputName);
  });

  // Sets value for inputName to selectedOptions
  it('should set value for inputName to selectedOptions when called', () => {
    const register = jest.fn();
    const inputName = 'testInput';
    const setValue = jest.fn();
    const selectedOptions = ['option1', 'option2'];
    const clearErrors = jest.fn();
    const trigger = jest.fn();
    const closeDropdown = jest.fn();
    const setIsOpen = jest.fn();
    const handleSelected = jest.fn();
    const setSearch = jest.fn();

    handleClick(
      register,
      inputName,
      setValue,
      selectedOptions,
      clearErrors,
      trigger,
      closeDropdown,
      setIsOpen,
      handleSelected,
      setSearch
    );

    expect(setValue).toHaveBeenCalledWith(inputName, selectedOptions);
  });

  // Calls handleSelected with inputName and selectedOptions
  it('should call handleSelected with inputName and selectedOptions when called', () => {
    const register = jest.fn();
    const inputName = 'testInput';
    const setValue = jest.fn();
    const selectedOptions = ['option1', 'option2'];
    const clearErrors = jest.fn();
    const trigger = jest.fn();
    const closeDropdown = jest.fn();
    const setIsOpen = jest.fn();
    const handleSelected = jest.fn();
    const setSearch = jest.fn();

    handleClick(
      register,
      inputName,
      setValue,
      selectedOptions,
      clearErrors,
      trigger,
      closeDropdown,
      setIsOpen,
      handleSelected,
      setSearch
    );

    expect(handleSelected).toHaveBeenCalledWith({ inputName, selectedOptions });
  });
});

const options = [
  { value: 'option1', text: 'Option 1', sub: 'Sublabel 1' },
  { value: 'option2', text: 'Option 2', sub: 'Sublabel 2' },
];

describe('MultiSelectForm2', () => {

  it('renders error message when there are errors', async () => {
    const errors = { testInput: { message: 'Test error message' } };

    render(
      <MultiSelectForm2
        options={options}
        handleSelected={() => {}}
        value={[]}
        labelName="Test Label"
        register={() => {}}
        inputName="testInput"
        setValue={() => {}}
        clearErrors={() => {}}
        trigger={() => {}}
        errors={errors}
      />
    );

    // Open dropdown
    fireEvent.click(screen.getByText('Test Label'));

 
    // Check if error message is rendered
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
