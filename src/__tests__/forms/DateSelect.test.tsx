import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DateSelect } from "../../components/forms";
import { DateFilterOptions } from "../../constants";
import userEvent from "@testing-library/user-event";
import { usePopper } from "../../hooks/use-popper";
import { closeDropdown } from "../../components/forms/ComboSelect";
import { onChange, handleClick } from "../../components/forms/DateSelect";
import { boolean } from "yup";

jest.mock("../../hooks/use-popper", () => ({
  usePopper: jest.fn(() => [{}, {}]), // Mock the return values as needed
}));

describe("DateSelect", () => {
  let props = {
    options: DateFilterOptions,
    children: <div>Date</div>,
    startDate: null,
    setStartDate: jest.fn(),
    endDate: null,
    setEndDate: jest.fn(),
    duration: { id: 1, name: "all", value: 0 },
    setDuration: jest.fn(),
  };

  it("renders without crashing", () => {
    render(
      <DateSelect
        options={[]}
        children={undefined}
        startDate={null}
        setStartDate={() => {}}
        endDate={null}
        setEndDate={() => {}}
        duration={null}
        setDuration={() => {}}
      />
    );
  });

  it("renders without crashing", () => {
    render(<DateSelect {...props} />);

    expect(usePopper).toHaveBeenCalled();
  });

  it("opens dropdown when clicked", () => {
    const { queryByText, getByText } = render(<DateSelect {...props} />);

    expect(queryByText("Last 7 days")).not.toBeInTheDocument();
    const button = screen.getByTestId("date-select");
    fireEvent.click(button);
    expect(getByText("Last 7 days")).toBeInTheDocument();
  });

  it("selects option when clicked", async () => {
    const { findByText, getByTestId } = render(<DateSelect {...props} />);

    const button = getByTestId("date-select");
    userEvent.click(button);

    const option = await findByText("Last 7 days");
    userEvent.click(option); // Click the option to select it
  });

  it("resets date filter", async () => {
    const { findByRole } = render(<DateSelect {...props} />);
    const button = screen.getByTestId("date-select");
    userEvent.click(button);
    const reset = await findByRole("button", { name: "Reset" });

    expect(reset).toBeInTheDocument();
    fireEvent.click(reset);
    expect(props.setDuration).toHaveBeenCalled();
    expect(props.setStartDate).toHaveBeenCalled();
    expect(props.setEndDate).toHaveBeenCalled();
  });

  // it("resets date filter", async () => {
  //   const { getByTestId, findByTestId } = render(<DateSelect {...props} />);
  //   const button = getByTestId("date-select");
  //   userEvent.click(button);

  //   const reset = await findByTestId("reset");
  //   userEvent.click(reset);

  //  // expect(props.setDuration).toHaveBeenCalled();
  // });
});

describe("onChange", () => {
  // Tests that the function calls setStartDate with the start date from the dates array
  it("should call setStartDate with the start date from the dates array", () => {
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    const dates = [new Date(2022, 0, 1), new Date(2022, 0, 31)];

    onChange(dates, setStartDate, setEndDate);

    expect(setStartDate).toHaveBeenCalledWith(new Date(2022, 0, 1));
  });

  // Tests that the function calls setEndDate with the end date from the dates array
  it("should call setEndDate with the end date from the dates array", () => {
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    const dates = [new Date(2022, 0, 1), new Date(2022, 0, 31)];

    onChange(dates, setStartDate, setEndDate);

    expect(setEndDate).toHaveBeenCalledWith(new Date(2022, 0, 31));
  });
});

describe("handleClick", () => {
  // Tests that the function calls setDuration with the provided value
  it("should call setDuration with the provided value", () => {
    const setDuration = jest.fn();
    const value = "test";

    handleClick(value, setDuration);

    expect(setDuration).toHaveBeenCalledWith(value);
  });

  // Tests that the function handles a null value parameter
  it("should handle null value parameter", () => {
    const setDuration = jest.fn();
    const value = null;

    handleClick(value, setDuration);

    expect(setDuration).toHaveBeenCalledWith(value);
  });

  // Tests that the function handles an undefined value parameter
  it("should handle undefined value parameter", () => {
    const setDuration = jest.fn();
    const value = undefined;

    handleClick(value, setDuration);

    expect(setDuration).toHaveBeenCalledWith(value);
  });

  // Tests that the function handles an empty string value parameter
  it("should handle empty string value parameter", () => {
    const setDuration = jest.fn();
    const value = "";

    handleClick(value, setDuration);

    expect(setDuration).toHaveBeenCalledWith(value);
  });
});

describe("closeDropdown", () => {
  // Tests that 'closeDropdown' sets isOpen state to false when called with setIsOpen(false)
  it("should set isOpen state to false when called with setIsOpen(false)", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("should set isOpen state to called", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalled();
  });
});
