
import { getByText, screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import IndexComponent from "../../../../../pages/investment/term-deposit/create-term-deposit/IndexComponent"
import { act } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from "react";

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn(),
}));

const user = userEvent.setup()

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

describe("IndexComponent", () => {
    window.ResizeObserver = ResizeObserver;
    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

        jest.spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ process: "continue" })
    });
    it("renders", () => {
        const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
        expect(getByText("New Term Deposit Product")).toBeInTheDocument();
        expect(getAllByTestId("form-step").length).toBeGreaterThan(1);
        expect(getByText("Product Name")).toBeInTheDocument();
        expect(getByTestId('investment-slogan')).toBeInTheDocument();
        expect(getByTestId('product-description')).toBeInTheDocument();
        screen.debug();
    })



    it("Show modal when clicking save to Draft", async () => {
        const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
        const saveButton = getByText("Save As Draft");
        expect(saveButton).toBeInTheDocument();
        await user.click(saveButton);
        expect(getByTestId("confirm-modal")).toBeInTheDocument();
    })

})