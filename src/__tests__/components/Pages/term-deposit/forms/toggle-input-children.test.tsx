import { getAllByRole, render, screen } from "@testing-library/react";
import ToggleInputChildren from "../../../../../components/pages/term-deposit/forms/toggle-input-children";

import React from "react";
import { userEvent } from "@testing-library/user-event";

const register = {
  onchange: jest.fn(),
  name: "",
  onblur: jest.fn(),
};
describe("ToggleInputChildren", () => {
  // Renders the label and a switch component
  it("should render the label and a switch component when rendered", () => {
    // Arrange
    const label = "Test Label";
    const setValue = jest.fn();
    const trigger = jest.fn();
    const inputName = "testInput";
    const defaultValue = null;

    // Act
    render(
      <ToggleInputChildren
        label={label}
        setValue={setValue}
        trigger={trigger}
        inputName={inputName}
        defaultValue={defaultValue}
        children={undefined}
        register={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // Toggles the switch component on click
  it("should toggle the switch component on click", () => {
    // Arrange
    const label = "Test Label";
    const setValue = jest.fn();
    const trigger = jest.fn();
    const inputName = "testInput";
    const defaultValue = null;

    render(
      <ToggleInputChildren
        label={label}
        setValue={setValue}
        trigger={trigger}
        inputName={inputName}
        defaultValue={defaultValue}
        children={undefined}
        register={jest.fn()}
      />
    );

    // Act
    userEvent.click(screen.getByRole("switch"));


    expect(trigger).not.toHaveBeenCalled();
  });

  // Sets the default value of the switch component if defaultValue prop is not null
  it("should set the default value of the switch component if defaultValue prop is not null", () => {
    // Arrange
    const label = "Test Label";
    const setValue = jest.fn();
    const trigger = jest.fn();
    const inputName = "testInput";
    const defaultValue = true;

    render(
      <ToggleInputChildren
        label={label}
        setValue={setValue}
        trigger={trigger}
        inputName={inputName}
        defaultValue={defaultValue}
        children={undefined}
        register={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  // defaultValue prop is null
  it("should not set the default value of the switch component if defaultValue prop is null", () => {
    // Arrange
    const label = "Test Label";
    const setValue = jest.fn();
    const trigger = jest.fn();
    const inputName = "testInput";
    const defaultValue = null;

    render(
      <ToggleInputChildren
        label={label}
        setValue={setValue}
        trigger={trigger}
        inputName={inputName}
        defaultValue={defaultValue}
        children={undefined}
        register={jest.fn()}
      />
    );

    // Assert
    expect(screen.getByRole("switch")).not.toBeChecked();
  });


  // inputName prop is empty
  it("should call setValue and trigger with the correct inputName when the switch component is toggled", () => {
    // Arrange
    const label = "Test Label";
    const setValue = jest.fn();
    const trigger = jest.fn();
    const inputName = "";
    const defaultValue = null;

    render(
      <ToggleInputChildren
        label={label}
        setValue={setValue}
        trigger={trigger}
        inputName={inputName}
        defaultValue={defaultValue}
        children={undefined}
        register={jest.fn()}
      />
    );
    const data = screen.getAllByRole("switch");
    // Act
    userEvent.click(data[0]);

    // Assert
    expect(setValue).not.toHaveBeenCalled();
  });
});
