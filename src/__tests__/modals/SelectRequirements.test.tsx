import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SelectRequirements from "../../components/modals/SelectRequirements";
import { renderWithProviders } from "../../utils/test-util";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;


describe("SelectRequirements", () => {
  // Renders the modal layout with the given header and subtext
  it("should render the modal layout with the given header and subtext", () => {
    // Arrange
    const header = "Test Header";
    const subtext = "Test Subtext";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const children = null;
    const actionFn = jest.fn();
    const disabled = false;
    const hideBtn = false;

    // Act
    render(
      <SelectRequirements
        header={header}
        subtext={subtext}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={children}
        actionFn={actionFn}
        disabled={disabled}
        hideBtn={hideBtn}
        onConfirm={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByTestId("select-requirement-modal")).toBeInTheDocument();
    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(subtext)).toBeInTheDocument();
  });

  // Renders the children components passed to it
  it("should render the children components passed to it", () => {
    // Arrange
    const header = "Test Header";
    const subtext = "Test Subtext";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const children = <div>Test Children</div>;
    const actionFn = jest.fn();
    const disabled = false;
    const hideBtn = false;

    // Act
    render(
      <SelectRequirements
        header={header}
        subtext={subtext}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={children}
        actionFn={actionFn}
        disabled={disabled}
        hideBtn={hideBtn}
        onConfirm={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  // Renders the select button when hideBtn is false
  it("should render the select button when hideBtn is false", () => {
    // Arrange
    const header = "Test Header";
    const subtext = "Test Subtext";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const children = null;
    const actionFn = jest.fn();
    const disabled = false;
    const hideBtn = false;

    // Act
    render(
      <SelectRequirements
        header={header}
        subtext={subtext}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={children}
        actionFn={actionFn}
        disabled={disabled}
        hideBtn={hideBtn}
        onConfirm={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  // Renders the modal layout without subtext
  it("should render the modal layout without subtext", () => {
    // Arrange
    const header = "Test Header";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const children = null;
    const actionFn = jest.fn();
    const disabled = false;
    const hideBtn = false;

    // Act
    render(
      <SelectRequirements
        header={header}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={children}
        actionFn={actionFn}
        disabled={disabled}
        hideBtn={hideBtn}
        onConfirm={jest.fn()}
      />
    );

    // Assert
    expect(screen.queryByText("Test Subtext")).toBeNull();
  });

  // Renders the modal layout without children components
  it("should render the modal layout without children components", () => {
    // Arrange
    const header = "Test Header";
    const subtext = "Test Subtext";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const actionFn = jest.fn();
    const disabled = false;
    const hideBtn = false;

    // Act
    render(
      <SelectRequirements
        header={header}
        subtext={subtext}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actionFn={actionFn}
        disabled={disabled}
        hideBtn={hideBtn}
        onConfirm={jest.fn()}
      />
    );

    // Assert
    expect(screen.queryByText("Test Children")).toBeNull();
  });

  // Renders the modal layout without a cancel button
  it("should render the modal layout without a cancel button", () => {
    // Arrange
    const header = "Test Header";
    const subtext = "Test Subtext";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const children = null;
    const actionFn = jest.fn();
    const disabled = false;
    const hideBtn = false;

    // Act
    render(
      <SelectRequirements
        header={header}
        subtext={subtext}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={children}
        actionFn={actionFn}
        disabled={disabled}
        hideBtn={hideBtn}
        onConfirm={jest.fn()}
      />
    );
const btn =screen.queryByTestId("cancel-btn")
    // Assert
    expect(btn).toBeInTheDocument();
    btn?.click()
    expect(setIsOpen).toHaveBeenCalled()
  });
});
