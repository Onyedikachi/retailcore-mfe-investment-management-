import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Step from "../../../../assets/images/Step";

describe("Step", () => {
    it("Renders without error", () => {
        render(<Step/>)
        expect(screen.getByTestId("step-svg")).toBeInTheDocument();
    })
})