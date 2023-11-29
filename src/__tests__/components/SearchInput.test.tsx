import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import SearchInput, { handleInputChange } from "../../components/SearchInput";

describe("handleInputChange", () => {
  // Tests that setInputValue is called with the event target value
  it("should call setInputValue with the event target value", () => {
    jest.useFakeTimers();
    const setInputValue = jest.fn();
    const setSearchTerm = jest.fn();
    const event = { target: { value: "test" } };

    handleInputChange(event, setInputValue, setSearchTerm);

    jest.advanceTimersByTime(800);
    expect(setInputValue).toHaveBeenCalledWith("test");
  });
});

describe("SearchInput", () => {
  beforeEach(() => {
    jest.setTimeout(10000); // Set the timeout to 10000 ms (10 seconds) or any other suitable value
  });
  // Tests that the SearchInput component renders a search input field with default props
  it("should render search input field with default props", () => {
    // Arrange
    const setSearchTerm = jest.fn();

    // Act
    render(<SearchInput setSearchTerm={setSearchTerm} />);

    // Assert
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product name or code")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product name or code")
    ).toHaveValue("");
  });

  it("applies custom CSS classes", () => {
    render(<SearchInput setSearchTerm={jest.fn()} hideBorder fullW />);

    const search = screen.getByTestId("search");
    expect(search).not.toHaveClass("border-b");
    expect(search).toHaveClass("w-full");
  });

  // Tests that the SearchInput component allows the user to input a search term and updates the input field accordingly
  it("should update input field when user inputs a search term", () => {
    // Arrange
    const setSearchTerm = jest.fn();

    // Act
    render(<SearchInput setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search by product name or code");
    fireEvent.change(input, { target: { value: "test" } });

    // Assert
    expect(input).toHaveValue("test");
  });

  // Tests that the SearchInput component allows the user to input a search term and updates the input field accordingly when isTruncated is true
  it("should update input field when user inputs a search term and isTruncated is true", () => {
    // Arrange
    const setSearchTerm = jest.fn();

    // Act
    render(<SearchInput setSearchTerm={setSearchTerm} isTruncated={true} />);

    const input = screen.getByPlaceholderText("Search by product name or code");
    fireEvent.change(input, { target: { value: "test" } });

    // Assert
    expect(input).toHaveValue("test");
  });
});
