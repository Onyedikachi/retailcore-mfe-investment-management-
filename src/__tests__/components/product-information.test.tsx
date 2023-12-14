import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation from "../../components/pages/term-deposit/forms/product-information";
import {renderWithProviders} from "../../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";

const fData = {
    productName: "",
    slogan: "",
  description: "",
  startDate: null,
  endDate: null,
  currency: "",
}

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({process: "continue"}),
  }));
  const navigate = jest.fn();

describe("ProductInformation", () => {
    it ("Renders without error", () => {
        const form = renderWithProviders(<ProductInformation proceed={jest.fn()} formData={fData} setDisabled={jest.fn()}/>)
        expect(form).toMatchSnapshot()
    })
    
    it("Changes values", () => {
        renderWithProviders(<ProductInformation proceed={jest.fn()} formData={fData} setDisabled={jest.fn()}/>)
        const input = screen.getByTestId("product-name")
        act(() => {
            fireEvent.change(input, "new Name")
        })
        screen.debug();
    })
})