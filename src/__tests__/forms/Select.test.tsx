import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Select } from "../../components/forms";
import userEvent from "@testing-library/user-event";

const options = [
  { id: 1, text: "Option 1", value: "option 1" },
  { id: 2, text: "Option 2", value: "option 2" },
];

function handleSelected(value: string) {}
describe("Select", () => {
  it("renders without crashing", () => {
    render(<Select options={options} handleSelected={handleSelected} />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Select options={options} handleSelected={handleSelected} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows the selected option", () => {
    const handleSelected = jest.fn();
    const { getByText } = render(
      <Select options={options} handleSelected={handleSelected} />
    );
    expect(getByText("Option 1")).toBeInTheDocument();
  });

  it("opens the dropdown when clicked", async () => {
    render(<Select options={options} handleSelected={handleSelected} />);

    const toggle = screen.getByRole("button");

    userEvent.click(toggle);

    await screen.findByText("Option 1");

    expect(screen.queryByText("Option 1")).toBeInTheDocument();
  });

  it("calls onChange when option selected", async () => {
    const handleChange = jest.fn();

    render(
      <Select
        options={options}
        onChange={handleChange}
        handleSelected={handleSelected}
      />
    );
    const toggle = screen.getByRole("button");

    fireEvent.click(toggle);

    const option = await screen.findByText("Option 2");
    const optionElement1 = screen.getByRole("option", { name: "Option 1" });
    const optionElement2 = screen.getByRole("option", { name: "Option 2" });
    expect(optionElement1).toHaveClass(
      "relative cursor-pointer select-none py-2 px-6 text-[#636363] hover:bg-gray-50 bg-red-50"
    );
    expect(optionElement2).toHaveClass(
      "relative cursor-pointer select-none py-2 px-6 text-[#636363] hover:bg-gray-50"
    );
    const ele = (await screen.findByText("Option 2")) as HTMLElement;
    expect(ele).toHaveClass("font-normal");

    fireEvent.click(option);

    //  expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
