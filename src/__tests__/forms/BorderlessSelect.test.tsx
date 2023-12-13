import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet } from "react-router-dom";
import BorderlessSelect from "../../components/forms/BorderlessSelect"
import { act } from "react-dom/test-utils";

export const options = [
    {
        id: 1,
        text: "Individual",
        value: 0,
    },
    {
        id: 2,
        text: "Corporate",
        value: 1,
    },
];

describe("BorderlessSelect", () => {
    it("Renders without error", () => {
        render(<BorderlessSelect labelName="My input" inputName="my_input" options={options} placeholder="Select" />)
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.queryAllByTestId("select-option").length).toBe(0);
    })
    it("Shows options when input is clicked", () => {
        render(<BorderlessSelect labelName="My input" inputName="my_input" options={options} placeholder="Select" />)
        expect(screen.getByText("Select")).toBeInTheDocument();
        act(() => {
            fireEvent.click(screen.getByText("Select"))
        })
        const inputOptions = screen.getAllByTestId("select-option");
        expect(inputOptions.map(o => o.textContent)).toEqual(["Individual", "Corporate"]);
        
    })
    
    it("indicates that input is required", () => {
        render(<BorderlessSelect requiredField={true} labelName="My input" inputName="my_input" options={options} placeholder="Select" />)
        expect(screen.getByTestId("red-dot")).toBeInTheDocument();
    })

    it("indicates error", () => {
        const errors = {my_input : {message: "invalid value"}};
        render(<BorderlessSelect errors={errors} requiredField={true} labelName="My input" inputName="my_input" options={options} placeholder="Select" />)
        expect(screen.getByText("invalid value")).toBeInTheDocument();
    })

    it("changes value when clicked and hides options", () => {
        const setValue = jest.fn()
        render(<BorderlessSelect clearErrors={jest.fn()} setValue={setValue} labelName="My input" inputName="my_input" options={options} placeholder="Select" />)
        expect(screen.getByText("Select")).toBeInTheDocument();
        act(() => {
            fireEvent.click(screen.getByText("Select"))
        })
        act(() => {
            fireEvent.click(screen.getByText("Corporate"))
        })
        // Confirm change in value
        expect(setValue).toHaveBeenCalledWith('my_input', 1);
        expect(screen.queryByText("Corporate"));

        // Confirm that options are hidden
        const inputOptions = screen.queryAllByTestId("select-option");
        expect(inputOptions.length).toBe(0);
    })
})