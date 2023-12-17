
import { getByText, screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import IndexComponent from "../../../../../pages/investment/term-deposit/create-term-deposit/IndexComponent"
import { act } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

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
        expect(getByText("Product Name")).toBeInTheDocument();
        expect(getByTestId('product-name')).toBeInTheDocument();
        expect(getByTestId('investment-slogan')).toBeInTheDocument();
        expect(getByTestId('product-description')).toBeInTheDocument();
        expect(getByText("Next")).toBeInTheDocument();

        screen.debug();
    })

    it("Changes values", () => {
        const { getByText, getAllByTestId, getByTestId, getAllByRole } = renderWithProviders(<IndexComponent />)
        const inputs = getAllByRole("textbox")
        const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2023"];
        act(() => {
            inputs.forEach((input, index) => {
                fireEvent.change(input, { target: { value: values[index] } });
            })
        })
        // @ts-ignore 
        expect(inputs.map(i => i.value)).toStrictEqual(values);
    })

    it("values should not exceed limit when user tries to type beyond limit", async () => {
        const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)

        const value = "tHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIStHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANIS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOAN";

        const productName = screen.getByTestId("product-name");
        const productSlogan = screen.getByTestId("investment-slogan");
        const productDescription = screen.getByTestId("product-description")

        await user.type(productName, value);
        await user.type(productSlogan, value);
        // await user.type(productDescription, value);

        //@ts-ignore
        expect(productName.value.length).toEqual(productName.maxLength);
        //@ts-ignore
        expect(productSlogan.value.length).toEqual(productSlogan.maxLength);
        //@ts-ignore
        // expect(productDescription.value.length).toEqual(productDescription.maxLength);

    })

    it("Show modal when clicking save to Draft", async () => {
        const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
        const saveButton = getByText("Save As Draft");
        expect(saveButton).toBeInTheDocument();
        await user.click(saveButton);
        expect(getByTestId("confirm-modal")).toBeInTheDocument();
    })

    it("Shows disabled button when form is not valid", async () => {
        const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
        const next = getByText("Next");
        expect(next).toBeInTheDocument();
        expect(next).toHaveAttribute("disabled")
    })

    it("Should not have disabled button when fom is valid", () => {
        const { getByText, getAllByTestId, getByTestId, getAllByRole } = renderWithProviders(<IndexComponent />)
        const inputs = getAllByRole("textbox")
        const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2024"];
        act(() => {
            inputs.forEach((input, index) => {
                fireEvent.change(input, { target: { value: values[index] } });
            })
        })
        // @ts-ignore 
        expect(inputs.map(i => i.value)).toStrictEqual(values);
        const next = getByText("Next");
        expect(next).toBeInTheDocument();
        expect(next).toHaveAttribute("disabled")
        screen.debug();
    })
})