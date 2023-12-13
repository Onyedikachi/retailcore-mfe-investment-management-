import SubmitSvg from "../../../../assets/images/SubmitSvg"
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SubmitSvg", () => {
    it("Renders without error", () => {
        render(<SubmitSvg/>)
        expect(screen.getByTestId("submit-svg")).toBeInTheDocument();
    })
})