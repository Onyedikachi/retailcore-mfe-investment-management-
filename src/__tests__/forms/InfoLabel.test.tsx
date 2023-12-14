import { render, screen } from "@testing-library/react"
import { InfoLabel } from "../../components/forms"
import React from "react"

describe("InfoLabel",() => {
    it("Renders without errors", () => {
        render(<InfoLabel label={"First name"} info={"String"}/>)
        expect(screen.getByText("First name")).toBeInTheDocument();
        expect(screen.getByText("First name")).toHaveClass("capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium");

    })
})
