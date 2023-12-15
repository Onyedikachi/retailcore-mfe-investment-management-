import MinMaxInput from "../components/forms/MinMaxInput"
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import React from "react";

describe("MinMaxInput", () => {
    it("Renders without error", () => {
        render(
            <MinMaxInput label="MyLabel" hasButton={false} currency="ngn" inputName="my_input"
                placeholder="amount" />
        );
        expect(screen.getByText("MyLabel")).toBeInTheDocument();
        expect(screen.getByPlaceholderText('amount')).toBeInTheDocument();
    })

    it("Renders error", () => {
        render(
            <MinMaxInput label="MyLabel" hasButton={false} currency="ngn" inputName="my_input"
                placeholder="amount" errors={{ my_input: { message: "invalid" } }} />
        );
        expect(screen.getByText("invalid")).toHaveClass("text-sm text-danger-500")
    });


    it("Shows button if 'hasButton' is true", () => {
        render(
            <MinMaxInput label="MyLabel" hasButton={true} currency="ngn" inputName="my_input"
                placeholder="amount" errors={{ my_input: { message: "invalid" } }} />
        )
        expect(screen.getByText("0/50")).toBeInTheDocument();
    })

    it("Shows percent sign (%) if 'isPercent' is true", () => {
        render(
            <MinMaxInput label="MyLabel" isPercent={true} hasButton={false} currency="ngn" inputName="my_input"
                placeholder="amount" errors={{ my_input: { message: "invalid" } }} />
        )
        expect(screen.getByTestId("percent")).toBeInTheDocument();
    })

    it("sets default value", () => {
        const setValue = jest.fn();
            render(
                <MinMaxInput type="number" label="MyLabel" isPercent={true} hasButton={false} currency="ngn" inputName="my_input"
                    setValue={setValue}
                    placeholder="amount" errors={{ my_input: { message: "invalid" } }}  max={20} defaultValue={12} />
            )
        const input = screen.getByPlaceholderText('amount') as HTMLElement;
        expect(input).toBeInTheDocument();

    })

})