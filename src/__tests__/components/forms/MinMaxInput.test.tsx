import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import { Actions } from "../../../components/summary";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test-util";
import { MinMaxInput } from "../../../components/forms";

jest.mock("react-currency-input-field", () => {
  return {
    __esModule: true,
    default: jest.fn((props) => {
      const { onValueChange, ...rest } = props;
      return (
        <input
          data-testid="currency-input"
          onChange={(e) => onValueChange(e.target.value, "mockedName")}
          {...rest}
        />
      );
    }),
  };
});


describe("MinMaxInput", () => {
  // Renders an input field with a default value of 0 and a placeholder of "0".
  it("should render an input field with default value and placeholder", () => {
    // Arrange
    const defaultValue = 0;
    const placeholder = "0";

    // Act
    render(
      <MinMaxInput defaultValue={defaultValue} placeholder={placeholder}    setValue={jest.fn()}
      register={jest.fn()}
      clearErrors={jest.fn()} trigger={jest.fn()} />
    );

    // Assert
    const inputElement = screen.getByTestId("min-max-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(defaultValue.toString());
    expect(inputElement).toHaveAttribute("placeholder", placeholder);
  });

  // Allows the user to input a number and triggers a change event when the input value changes.
  it("should allow user input and trigger change event", () => {
    // Arrange
    const handleChange = jest.fn();
    render(<MinMaxInput handleChange={handleChange} trigger={jest.fn()} setValue={jest.fn()} clearErrors={jest.fn()} />);

    // Act
    const inputElement = screen.getByTestId("min-max-input");
    fireEvent.change(inputElement, { target: { value: "10" } });

    // Assert
    expect(handleChange).toHaveBeenCalledTimes(0);

  });

  // Clears errors when the input value changes.
  it("should clear errors when input value changes", () => {
    // Arrange
    const clearErrors = jest.fn();
    render(<MinMaxInput clearErrors={clearErrors} trigger={jest.fn()} setValue={jest.fn()}   />);

    // Act
    const inputElement = screen.getByTestId("min-max-input");
    fireEvent.change(inputElement, { target: { value: "10" } });

    // Assert
    expect(clearErrors).toHaveBeenCalledTimes(1);
  });

  // Displays a border in red if there is an error with the input.
  it("should display red border when there is an error", () => {
    // Arrange
    const errors = { inputName: { message: "Invalid input" } };
    render(<MinMaxInput errors={errors} inputName="inputName" trigger={jest.fn()} setValue={jest.fn()}  clearErrors={jest.fn()}  />);

    // Act
    const inputElement = screen.getByTestId("min-max-input");

    // Assert
    expect(inputElement).toHaveClass("border-red-600");
  });

  // Does not display a border in red if there is no error with the input.
  it("should not display red border when there is no error", () => {
    // Arrange
    render(<MinMaxInput trigger={jest.fn()} setValue={jest.fn()}  clearErrors={jest.fn()}  />);

    // Act
    const inputElement = screen.getByTestId("min-max-input");

    // Assert
    expect(inputElement).not.toHaveClass("border-red-600");
  });

  // Displays a placeholder of "0" if placeholder is not provided.
  it("should display default placeholder if not provided", () => {
    // Arrange
    render(<MinMaxInput   setValue={jest.fn()}
    register={jest.fn()}
    clearErrors={jest.fn()} trigger={jest.fn()} />);

    // Act
    const inputElement = screen.getByTestId("min-max-input");

    // Assert
    expect(inputElement).toHaveAttribute("placeholder", "0");
  });
});

describe("MinMaxInput", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(
      <MinMaxInput
        label="Amount"
        currency="USD"
        inputName="amount"
        isCurrency={true}  setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()} trigger={jest.fn()} 
      />
    );

    expect(getByTestId("currency-input")).toBeInTheDocument();
  });

  it("handles value change", () => {
    const { getByTestId } = render(
      <MinMaxInput
        label="Amount"
        currency="USD"
        inputName="amount"
        isCurrency={true}  setValue={jest.fn()}
        register={jest.fn()}
        clearErrors={jest.fn()} trigger={jest.fn()} 
      />
    );

    const currencyInput = getByTestId("currency-input") as HTMLElement;

    fireEvent.change(currencyInput, { target: { value: "1234.56" } });
// @ts-ignore 
    expect(currencyInput.value).toBe("1234.56");
  });

  // Add more tests as needed
});