import CancelSvg from "../../../../assets/images/CancelSvg"
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("CancelSvg", () => {
    it("Renders without error", () => {
        render(<CancelSvg/>)
        // expect(screen.getBy)
        expect(screen.getByTestId("svg")).toBeInTheDocument();

    })
})