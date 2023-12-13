import ModifySvg from "../../../../assets/images/ModifySvg"
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ModifySvg", () => {
    it("Renders without error", () => {
        render(<ModifySvg/>)
        // expect(screen.getBy)
        expect(screen.getByTestId("modify-svg")).toBeInTheDocument();
    })
})