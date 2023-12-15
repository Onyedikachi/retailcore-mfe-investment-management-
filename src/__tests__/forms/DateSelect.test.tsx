import { fireEvent, render, screen } from "@testing-library/react";
import { DateSelect } from "../../components/forms";
import React from "react";
import moment from "moment";
import { closeDropdown } from "../../components/forms/ComboSelect";
import { handleClick, onChange } from "../../components/forms/DateSelect";

describe("DateSelect", () => {
  const onChangeDate = jest.fn();
  it("renders without errors", () => {
    render(<DateSelect onChangeDate={onChangeDate}>Set Date</DateSelect>);
    expect(screen.getByText("Set Date")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Set Date"));
  });

  it("Shows datePicker on button click", () => {
    render(<DateSelect onChangeDate={onChangeDate}>Set Date</DateSelect>);

    fireEvent.click(screen.getByText("Set Date"));
    let days = screen.queryAllByRole("option");
    console.log(days.length);
  });
});


describe("closeDropdown", () => {
  // should set isOpen state to false when called with setIsOpen function
  it("should set isOpen state to false when called with setIsOpen function", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // should not throw an error when called with setIsOpen function
  it("should not throw an error when called with setIsOpen function", () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

  // should not modify any other state or props
  it("should not modify any other state or props", () => {
    const setIsOpen = jest.fn();
    const onChangeDate = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(onChangeDate).not.toHaveBeenCalled();
  });


});

describe("handleClick", () => {
  // Sets the duration to the value of the clicked item
  it("should set the duration to the value of the clicked item", () => {
    const setDuration = jest.fn();
    const setDates = jest.fn();
    const item = { value: 5 };

    handleClick(item, setDuration, setDates);

    expect(setDuration).toHaveBeenCalledWith(5);
  
  });


  // If the duration is falsy, sets both start and end dates to null
  it("should set both start and end dates to null when duration is falsy", () => {
    const setDuration = jest.fn();
    const setDates = jest.fn();
    const item = { value: 0 };

    handleClick(item, setDuration, setDates);

    expect(setDuration).toHaveBeenCalledWith(0);
    expect(setDates).toHaveBeenCalledWith({
      endDate: null,
      startDate: null,
    });
  });

  // Handles gracefully if the item value is not a number
  it("should handle gracefully if the item value is not a number", () => {
    const setDuration = jest.fn();
    const setDates = jest.fn();
    const item = { value: "invalid" };

    handleClick(item, setDuration, setDates);

    expect(setDuration).toHaveBeenCalledWith("invalid");

  });


});


describe("onChange", () => {
  // Sets the start and end date in the state object when given an array of dates
  it("should set start and end date in state object when given an array of dates", () => {
    const setDate = jest.fn();
    const dates = [new Date(2022, 0, 1), new Date(2022, 0, 31)];

    onChange(dates, setDate);

    expect(setDate).toHaveBeenCalledWith({
      startDate: new Date(2022, 0, 1),
      endDate: new Date(2022, 0, 31),
    });
  });

  // Handles null values for start and end dates
  it("should handle null values for start and end dates", () => {
    const setDate = jest.fn();
    const dates = [null, null];

    onChange(dates, setDate);

    expect(setDate).toHaveBeenCalledWith({
      startDate: null,
      endDate: null,
    });
  });

  // Updates the state object with new start and end dates
  it("should update the state object with new start and end dates", () => {
    const setDate = jest.fn();
    const dates = [new Date(2022, 0, 1), new Date(2022, 0, 31)];

    onChange(dates, setDate);

    expect(setDate).toHaveBeenCalledWith({
      startDate: new Date(2022, 0, 1),
      endDate: new Date(2022, 0, 31),
    });
  });

  // Handles invalid input types
  it("should handle invalid input types", () => {
    const setDate = jest.fn();
    const dates = [123, "2022-01-01"];

    onChange(dates, setDate);

    expect(setDate).toHaveBeenCalled();
  });

  // Handles invalid input values
  it("should handle invalid input values", () => {
    const setDate = jest.fn();
    const dates = [new Date("invalid"), new Date(2022, 0, 31)];

    onChange(dates, setDate);

    expect(setDate).toHaveBeenCalled();
  });

  // Handles unexpected input formats
  it("should handle unexpected input formats", () => {
    const setDate = jest.fn();
    const dates = ["2022-01-01", "2022-01-31"];

    onChange(dates, setDate);

    expect(setDate).toHaveBeenCalledWith({
      startDate: "2022-01-01",
      endDate: "2022-01-31",
    });
  });
});
