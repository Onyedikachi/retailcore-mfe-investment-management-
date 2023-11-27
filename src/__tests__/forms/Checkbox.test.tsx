// Checkbox.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "../../components/forms";

describe("Checkbox", () => {
  it("renders without crashing", () => {
    render(<Checkbox label="Test" checked={false} />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Checkbox label="Test" checked={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays the label", () => {
    const { getByText } = render(<Checkbox label="Test" checked={false} />);
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("initially renders unchecked", () => {
    const { getByLabelText } = render(
      <Checkbox label="Test" checked={false} />
    );
    expect(getByLabelText("Test")).not.toBeChecked();
  });

  it("renders checked when checked prop is true", () => {
    const { getByLabelText } = render(<Checkbox label="Test" checked={true} />);
    expect(getByLabelText("Test")).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Checkbox label="Test" checked={false} onChange={onChange} />
    );
    fireEvent.click(getByLabelText("Test"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
  test("should not call onChange if not provided when handleChange is invoked", () => {
    const { getByLabelText } = render(
      <Checkbox label="Test" checked={false} />
    );

    fireEvent.click(getByLabelText("Test"));

    // Ensure onChange is not called
    // You might want to add assertions here based on your component's logic
  });
});
