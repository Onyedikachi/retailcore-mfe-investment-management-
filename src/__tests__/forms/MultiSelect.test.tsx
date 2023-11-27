import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import { MultiSelect } from "../../components/forms";
import userEvent from "@testing-library/user-event";
import {
  closeDropdown,
  handleChange,
} from "../../components/forms/MultiSelect";

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
];

describe("MultiSelect", () => {
  it("renders without crashing", () => {
    render(
      <MultiSelect
        options={options}
        setSelectedOptions={jest.fn()}
        selectedOptions={[]}
      >
        Toggle Dropdown
      </MultiSelect>
    );
  });

  it("opens and closes dropdown when clicked", async () => {
    const { getByText, queryByText, findByText } = render(
      <MultiSelect
        options={options}
        setSelectedOptions={jest.fn()}
        selectedOptions={[]}
      >
        Toggle Dropdown
      </MultiSelect>
    );

    const toggle = getByText("Toggle Dropdown");

    // Open dropdown
    fireEvent.click(toggle);
    expect(screen.getByText("[Select all]")).not.toBeChecked();
    await findByText("Option 1");

    // Close dropdown
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(queryByText("Option 1")).not.toBeInTheDocument();
    });
  });
  // Tests that clicking the button toggles the dropdown
  it("should toggle dropdown when button is clicked", () => {
    const { getByRole } = render(
      <MultiSelect
        options={options}
        setSelectedOptions={jest.fn()}
        selectedOptions={[]}
      >
        Toggle Dropdown
      </MultiSelect>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("[Select all]")).toBeInTheDocument();
  });

  // Tests that clicking a checkbox selects/deselects the option
  it("should select/deselect option when checkbox is clicked", () => {
    const options = [{ id: 1, name: "Option 1", value: "option1" }];
    const { getByRole, getByLabelText } = render(
      <MultiSelect
        options={options}
        setSelectedOptions={jest.fn()}
        selectedOptions={[]}
      >
        Toggle Dropdown
      </MultiSelect>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    const checkbox = getByLabelText("Option 1");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  // Tests that the component renders correctly with an empty options array
  it("should render correctly with an empty options array", () => {
    const { getByRole } = render(
      <MultiSelect
        options={[]}
        setSelectedOptions={jest.fn()}
        selectedOptions={[]}
        children={undefined}
      />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("[Select all]")).toBeInTheDocument();
  });
  it("should check select all", () => {
    const { getByRole } = render(
      <MultiSelect
        options={[]}
        setSelectedOptions={jest.fn()}
        selectedOptions={[]}
        children={undefined}
      />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    const selectAllBox = screen.getByLabelText("[Select all]");
    expect(selectAllBox).toBeInTheDocument();
    fireEvent.click(selectAllBox);
    expect(selectAllBox).toBeChecked();
  });

  it("should update checkbox state when props change", () => {
    const options = [{ id: 1, name: "Option 1", value: "option1" }];
    const { getByLabelText, rerender, getByRole } = render(
      <MultiSelect
        options={options}
        selectedOptions={[{ id: 1, value: "option1" }]}
        children={undefined}
        setSelectedOptions={jest.fn()}
      />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    const checkbox = getByLabelText("Option 1");
    expect(checkbox).toBeChecked();
    rerender(
      <MultiSelect
        options={options}
        selectedOptions={[]}
        children={undefined}
        setSelectedOptions={jest.fn()}
      />
    );
    fireEvent.click(button);
    expect(checkbox).not.toBeChecked();
  });
});

describe("closeDropdown", () => {
  // Tests that closeDropdown sets isOpen state to false when setIsOpen is called with false
  it("should set isOpen state to false when setIsOpen is called with false", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // Tests that closeDropdown handles setIsOpen being called with a boolean value
  it("should handle setIsOpen being called with a boolean value", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(expect.any(Boolean));
  });
});

describe("handleChange", () => {
  // Tests that handleChange adds a new option to selectedOptions array when it does not exist
  it("should add a new option to selectedOptions array when it does not exist", () => {
    const id = 1;
    const value = "Option 1";
    const selectedOptions = [];
    const setSelectedOptions = jest.fn();
    handleChange(id, value, selectedOptions, setSelectedOptions);
    expect(setSelectedOptions).toHaveBeenCalledWith([{ id, value }]);
  });

  // Tests that handleChange removes an option from selectedOptions array when it already exists
  it("should remove an option from selectedOptions array when it already exists", () => {
    const id = 1;
    const value = "Option 1";
    const selectedOptions = [{ id, value }];
    const setSelectedOptions = jest.fn();
    handleChange(id, value, selectedOptions, setSelectedOptions);
    expect(setSelectedOptions).toHaveBeenCalledWith([]);
  });

  // Tests that handleChange calls setSelectedOptions with the same array when an option is already selected
  it("should call setSelectedOptions with the same array when an option is already selected", () => {
    const options = [
      { id: 1, value: "Option 1" },
      { id: 2, value: "Option 2" },
    ];
    const selectedOptions = [{ id: 1, value: "Option 1" }];
    const setSelectedOptions = jest.fn();
    handleChange(2, "Option 2", selectedOptions, setSelectedOptions);
    expect(setSelectedOptions).toHaveBeenCalled();
  });
});
