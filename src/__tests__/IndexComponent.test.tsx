import { render, screen } from "@testing-library/react";
import IndexComponent from "../pages/investment/term-deposit/create-term-deposit/IndexComponent"
import { renderWithProviders } from "../utils/test-util";

describe("IndexComponent", () => {
    it("Renders without error", () => {
        renderWithProviders(<IndexComponent/>)
    })
})
