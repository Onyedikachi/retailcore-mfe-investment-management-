import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomComboSelect } from "../../components/forms";
import { act } from "react-dom/test-utils";

describe("CustomComboSelect", () => {

    const itemOptions = [
        {name: "Op1", value: "1"},
        {name: "Op2", value: "2"},
        {name: "Op3", value: "3"},
    ]
    it("Renders without errors", () => {
        render(
            <CustomComboSelect placeholder ="Select" options = {itemOptions} register = {jest.fn()} 
            name="my_input" setValue={jest.fn()} clearErrors={jest.fn()}
            defaultValue=""
            disabled={false}
        />);
        expect(screen.getByPlaceholderText("Select")).toBeInTheDocument();
    })
    
    // it("Shows options on click", () => {
    //     render(
    //         <CustomComboSelect placeholder ="Select" options = {itemOptions} register = {jest.fn()} 
    //         name="my_input" setValue={jest.fn()} clearErrors={jest.fn()}
    //         defaultValue=""
    //         disabled={false}
    //     />);
    //     const selectElement = screen.getByRole("combobox");
    //     act(() => {
    //         fireEvent.change(selectElement, "Op");
    //     })
    //     console.log(selectElement.value)

    // })
    
})