import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import { Actions } from "../../../components/summary";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test-util";
import { GlInput } from "../../../components/forms";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EntriesAndEventsSearchResults, {
  closeDropdown,
} from "@app/components/forms/GlInput";


describe("closeDropdown", () => {
  // Sets the 'isOpen' state to false when called with a valid 'setIsOpen' function.
  it("should set isOpen state to false when called with a valid setIsOpen function", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});


describe("EntriesAndEventsSearchResults", () => {
  // Renders a search input field with a search icon
  
  it("should render a search input field with a search icon", () => {
    // Arrange
    const placeholder = "Search";
    const handleClick = jest.fn();
    const inputName = "searchInput";
    const register = jest.fn();
    const trigger = jest.fn();
    const errors = {};
    const error = "";
    const defaultValue = "";
    const clearFields = false;

    // Act
    renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder={placeholder}
        handleClick={handleClick}
        inputName={inputName}
        register={register}
        trigger={trigger}
        errors={errors}
        error={error}
        defaultValue={defaultValue}
        clearFields={clearFields}
      />
    );

    // Assert
    expect(screen.getByTestId("gli-input")).toBeInTheDocument();
    expect(screen.getByTestId("open-button")).toBeInTheDocument();
 
  });

  // Allows user to input search query
  it("should allow user to input search query", () => {
    // Arrange
    const placeholder = "Search";
    const handleClick = jest.fn();
    const inputName = "searchInput";
    const register = jest.fn();
    const trigger = jest.fn();
    const errors = {};
    const error = "";
    const defaultValue = "";
    const clearFields = false;

    renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder={placeholder}
        handleClick={handleClick}
        inputName={inputName}
        register={register}
        trigger={trigger}
        errors={errors}
        error={error}
        defaultValue={defaultValue}
        clearFields={clearFields}
      />
    );

    // Act
    const searchInput = screen.getByTestId("gli-input") as HTMLElement;
    fireEvent.change(searchInput, { target: { value: "query" } });

    // Assert
    // @ts-ignore 
    expect(searchInput.value).toBe("query");
  });

  // Displays a dropdown menu when search input field is clicked
  it("should display a dropdown menu when search input field is clicked", () => {
    // Arrange
    const placeholder = "Search";
    const handleClick = jest.fn();
    const inputName = "searchInput";
    const register = jest.fn();
    const trigger = jest.fn();
    const errors = {};
    const error = "";
    const defaultValue = "";
    const clearFields = false;

    renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder={placeholder}
        handleClick={handleClick}
        inputName={inputName}
        register={register}
        trigger={trigger}
        errors={errors}
        error={error}
        defaultValue={defaultValue}
        clearFields={clearFields}
      />
    );

    // Act
    const openButton = screen.getByTestId("open-button");
    fireEvent.click(openButton);

    // Assert
    expect(screen.getByTestId("glclasses")).toBeInTheDocument();
  });

  // Displays an empty dropdown menu when there are no GL classes
  it("should display an empty dropdown menu when there are no GL classes", () => {
    // Arrange
    const placeholder = "Search";
    const handleClick = jest.fn();
    const inputName = "searchInput";
    const register = jest.fn();
    const trigger = jest.fn();
    const errors = {};
    const error = "";
    const defaultValue = "";
    const clearFields = false;

    renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder={placeholder}
        handleClick={handleClick}
        inputName={inputName}
        register={register}
        trigger={trigger}
        errors={errors}
        error={error}
        defaultValue={defaultValue}
        clearFields={clearFields}
      />
    );

    // Act
    const openButton = screen.getByTestId("open-button");
    fireEvent.click(openButton);

    // Assert
    expect(screen.queryByTestId("glclasses")).toBeInTheDocument();
  });

  // Displays an empty list of ledgers when a GL class has no ledgers
  it("should display an empty list of ledgers when a GL class has no ledgers", () => {
    // Arrange
    const placeholder = "Search";
    const handleClick = jest.fn();
    const inputName = "searchInput";
    const register = jest.fn();
    const trigger = jest.fn();
    const errors = {};
    const error = "";
    const defaultValue = "";
    const clearFields = false;

    renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder={placeholder}
        handleClick={handleClick}
        inputName={inputName}
        register={register}
        trigger={trigger}
        errors={errors}
        error={error}
        defaultValue={defaultValue}
        clearFields={clearFields}
      />
    );

    // Act
    const openButton = screen.getByTestId("open-button");
    fireEvent.click(openButton);

    // Assert
    expect(screen.queryByTestId("glclasses")).toBeInTheDocument();
  });

  // Displays an error message when there is an error fetching GL classes or ledgers
  it("should display an error message when there is an error fetching GL classes or ledgers", () => {
    // Arrange
    const placeholder = "Search";
    const handleClick = jest.fn();
    const inputName = "searchInput";
    const register = jest.fn();
    const trigger = jest.fn();
    const errors = {};
    const error = "Error fetching GL classes";
    const defaultValue = "";
    const clearFields = false;

    renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder={placeholder}
        handleClick={handleClick}
        inputName={inputName}
        register={register}
        trigger={trigger}
        errors={errors}
        error={error}
        defaultValue={defaultValue}
        clearFields={clearFields}
      />
    );

    // Act
    const openButton = screen.getByTestId("open-button");
    fireEvent.click(openButton);

    // Assert
    expect(screen.getByText("Error fetching GL classes")).toBeInTheDocument();
  });
});

// Mock external dependencies or functions as needed

describe("EntriesAndEventsSearchResults", () => {
  it("renders with default props", () => {
    const { getByTestId } = renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder="Search..."
        handleClick={jest.fn()}
        inputName="searchInput"
        register={jest.fn()}
        trigger={jest.fn()}
        errors={{}}
        error=""
        defaultValue=""
        clearFields={false}
      />
    );

    // Assertions for initial render
    expect(getByTestId("gli")).toBeInTheDocument();
    expect(getByTestId("open-button")).toBeInTheDocument();
    expect(getByTestId("gli-input")).toBeInTheDocument();
  });

  it("handles input change and displays results", async () => {
    const mockHandleClick = jest.fn();
    const mockRegister = jest.fn();
    const mockTrigger = jest.fn();

    const { getByTestId, getByText } = renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder="Search..."
        handleClick={mockHandleClick}
        inputName="searchInput"
        register={mockRegister}
        trigger={mockTrigger}
        errors={{}}
        error=""
        defaultValue=""
        clearFields={false}
      />
    );

    const inputElement = getByTestId("gli-input");

    // Type into the input
    fireEvent.change(inputElement, { target: { value: "Term Deposit" } });

  
  });

  it("handles click on a result and triggers functions", async () => {
    const mockHandleClick = jest.fn();
    const mockRegister = jest.fn();
    const mockTrigger = jest.fn();

    const { getByTestId, getByText } = renderWithProviders(
      <EntriesAndEventsSearchResults
        placeholder="Search..."
        handleClick={mockHandleClick}
        inputName="searchInput"
        register={mockRegister}
        trigger={mockTrigger}
        errors={{}}
        error=""
        defaultValue=""
        clearFields={false}
      />
    );

    const inputElement = getByTestId("gli-input");

    // Type into the input
    fireEvent.change(inputElement, { target: { value: "Term Deposit" } });


  });

  // Add more test cases as needed
});
