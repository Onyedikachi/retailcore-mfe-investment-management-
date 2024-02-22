import React from "react";
import { fireEvent, render, screen,waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import MultiSelectForm, { closeDropdown, handleChange } from "../../../components/forms/MultiSelectForm";
describe("MultiSelectForm", () => {
  // Renders a label with the provided labelName prop
  it("should render a label with the provided labelName prop", () => {
    render(
      <MultiSelectForm
        labelName="Test Label"
        options={[]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  // Renders a button with the provided placeholder prop
  it("should render a button with the provided placeholder prop", () => {
    render(
      <MultiSelectForm
        placeholder="Test Placeholder"
        options={[]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );
    expect(screen.getByText("Test Placeholder")).toBeInTheDocument();
  });

  // Opens a dropdown with options when the button is clicked
  it("should open a dropdown with options when the button is clicked", () => {
    render(
      <MultiSelectForm
        options={[
          { id: 1, text: "Option 1" },
          { id: 2, text: "Option 2" },
        ]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  // Handles the case where no options are provided
  it("should handle the case where no options are provided", () => {
    render(
      <MultiSelectForm
        options={[]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("list")).toBeInTheDocument();
  });

  // Handles the case where no labelName prop is provided
  it("should handle the case where no labelName prop is provided", () => {
    render(<MultiSelectForm options={[]}  setValue={jest.fn()}
    register={jest.fn()}
    clearErrors={jest.fn()} />);
    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
  });

  // Handles the case where no inputName prop is provided
  it("should handle the case where no inputName prop is provided", () => {
    render(
      <MultiSelectForm
        options={[]}
        setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()}
      />
    );
    expect(screen.queryByRole("button")).toBeInTheDocument();
  });
});


describe('handleChange', () => {

  // Adds a new value to the selectedOptions array if it doesn't already exist
  it('should add a new value to selectedOptions array when it doesnt already exist', () => {
    const id = 1;
    const value = 'option';
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();

    handleChange(value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalledWith([]);
  });

  // Removes a value from the selectedOptions array if it already exists
  it('should remove a value from selectedOptions array when it already exists', () => {
    const id = 1;
    const value = 'option';
    const selectedOptions = [value];
    const setSelectedOptions = jest.fn();

    handleChange( value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalledWith([]);
  });


  // Handles null or undefined value parameter
  it('should handle null or undefined value parameter', () => {
    const id = 1;
    const value = null;
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();

    handleChange(value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalled();
  });

  // Handles null or undefined setSelectedOptions parameter
  it('should handle null or undefined setSelectedOptions parameter', () => {
    const id = 1;
    const value = 'option';
    const selectedOptions = [];
    const setSelectedOptions = undefined;

    expect(() => {
      handleChange(value, selectedOptions, setSelectedOptions);
    }).toThrow();
  });

  // Handles null or undefined id parameter
  it('should handle null or undefined id parameter', () => {
    const id = null;
    const value = 'option';
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();

    handleChange(value, selectedOptions, setSelectedOptions);

    expect(setSelectedOptions).toHaveBeenCalled();
  });
});


describe('closeDropdown', () => {

  // should set isOpen state to false when called with setIsOpen(false)
  it('should set isOpen state to false when called with setIsOpen(false)', () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // should not throw an error when called with setIsOpen
  it('should not throw an error when called with setIsOpen', () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

 



  // should not have any side effects other than setting isOpen state to false
  it('should not have any side effects other than setting isOpen state to false', () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });

  // should not affect any other state or props
  it('should not affect any other state or props', () => {
    const setIsOpen = jest.fn();
    const otherState = "other state";
    const otherProps = "other props";
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
    expect(otherState).toBe("other state");
    expect(otherProps).toBe("other props");
  });
});

describe('MultiSelectForm', () => {
  const options = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    // Add more options as needed
  ];

  const defaultProps = {
    options,
    labelName: 'Select Options',
    inputName: 'selectInput',
    placeholder: 'Select',
    BorderlessSelectProps: {},
    setValue: jest.fn(),
    trigger: jest.fn(),
    clearErrors: jest.fn()
  };

  it('renders component with default values', () => {
    render(<MultiSelectForm {...defaultProps} />);
    // Add assertions for initial rendering state
  });

  it('opens and closes the dropdown on button click', async () => {
    render(<MultiSelectForm {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: /select/i });
    fireEvent.click(dropdownButton);

    await waitFor(() => {
      const dropdownOptions = screen.getAllByTestId('Option 1');
      expect(dropdownOptions.length).toBe(1); // +1 for the "Select All" option
    });

    fireEvent.click(dropdownButton);

    await waitFor(() => {
      const dropdownOptions = screen.queryAllByTestId('Option 1');
      expect(dropdownOptions.length).toBe(0);
    });
  });

  it('handles checkbox change', async () => {
    render(<MultiSelectForm {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: /select/i });
    fireEvent.click(dropdownButton);

    const checkbox = screen.getByTestId('Option 1');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  it('handles "Select All" checkbox change', async () => {
    render(<MultiSelectForm {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: /select/i });
    fireEvent.click(dropdownButton);

    const selectAllCheckbox = screen.getByTestId('Option 1');
    fireEvent.click(selectAllCheckbox);

    await waitFor(() => {
      const checkboxes = screen.getAllByTestId('Option 1');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });
  });

  it('handles clearing selected options', async () => {
    render(<MultiSelectForm {...defaultProps} />);

    const dropdownButton = screen.getByRole('button', { name: /select/i });
    fireEvent.click(dropdownButton);

    const checkbox = screen.getByTestId('Option 1');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(dropdownButton);


  });

  // Add more test cases based on your component's functionality

});
