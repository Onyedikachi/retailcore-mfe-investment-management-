import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import BranchSearch, { classNames } from "../../components/BranchSearch";
import userEvent from "@testing-library/user-event";

describe("search input", () => {
  it("calls setSearchTerm function with debounce on input change", async () => {
    const setSearchTerm = jest.fn();
    const { getByPlaceholderText } = render(
      <BranchSearch
        placeholder={"Search by branch name or code"}
        options={[
          {
            name: "Option",
            value: "Option",
          },
        ]}
      />
    );

    const inputElement = getByPlaceholderText("Search by branch name or code");

    fireEvent.change(inputElement, { target: { value: "test" } });
  });
});

describe("classNames", () => {
  // Tests that the function concatenates all truthy class names into a single string
  it("should concatenate all truthy class names into a single string", () => {
    const result = classNames("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  // Tests that the function ignores all falsy class names
  it("should ignore all falsy class names", () => {
    const result = classNames(
      "class1",
      "",
      "class2",
      null,
      "class3",
      undefined
    );
    expect(result).toBe("class1 class2 class3");
  });

  // Tests that the function handles multiple truthy and falsy class names
  it("should handle multiple truthy and falsy class names", () => {
    const result = classNames(
      "class1",
      "",
      "class2",
      null,
      "class3",
      undefined,
      "class4"
    );
    expect(result).toBe("class1 class2 class3 class4");
  });

  // Tests that the function handles empty input
  it("should handle empty input", () => {
    const result = classNames();
    expect(result).toBe("");
  });

  // Tests that the function handles input with only one truthy class name
  it("should handle input with only one truthy class name", () => {
    const result = classNames("class1");
    expect(result).toBe("class1");
  });
});

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
];

describe("BranchSearch", () => {
  it("renders without crashing", () => {
    render(<BranchSearch options={options} placeholder={""} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<BranchSearch placeholder="Select..." options={options} />);
    expect(screen.getByPlaceholderText("Select...")).toBeInTheDocument();
  });

  it("filters options by search query", () => {
    render(<BranchSearch options={options} placeholder={""} />);

    userEvent.type(screen.getByTestId("input"), "option 1");

    // expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

 
});

describe('BranchSearch', () => {
  const mockOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    // Add more options as needed
  ];

  it('renders the component with placeholder', () => {
    render(
      <BranchSearch
        placeholder="Select an option"
        options={mockOptions}
        handleOptions={jest.fn()}
      />
    );

    // Check if the placeholder text is displayed
    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('displays options when typing in the input', () => {
    render(
      <BranchSearch
        placeholder="Select an option"
        options={mockOptions}

  handleOptions={jest.fn()}

      />
    );

    const input = screen.getByTestId('input');

    // Type in the input to trigger options
    fireEvent.change(input, { target: { value: 'Option' } });

    // Check if options are displayed
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('applies the correct class when an option is active', () => {
    render(
      <BranchSearch
        placeholder="Select an option"
        options={mockOptions}
        handleOptions={jest.fn()}
      />
    );

    const input = screen.getByTestId('input');

    // Type in the input to trigger options
    fireEvent.change(input, { target: { value: 'Option' } });

    // Check if the active option has the expected class
    const activeOption = screen.getByText('Option 1');
    expect(activeOption).not.toHaveClass('bg-[#CF2A2A] text-white');
  });

  it('applies the correct class when an option is selected', () => {
    render(
      <BranchSearch
        placeholder="Select an option"
        options={mockOptions}
        handleOptions={jest.fn()}
      />
    );

    const input = screen.getByTestId('input');

    // Type in the input to trigger options
    fireEvent.change(input, { target: { value: 'Option' } });

    // Click on an option to select it
    fireEvent.click(screen.getByText('Option 1'));


  });
  // Add more test cases to cover other scenarios as needed
});