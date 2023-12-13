import Excel from "../../../../assets/images/excel"
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {shallow} from "enzyme"
import { act } from "react-dom/test-utils";

describe("ModifySvg", () => {
    it("Renders without error", () => {
        render(<Excel/>)
        expect(screen.getByTestId("excel")).toBeInTheDocument();
    })
})