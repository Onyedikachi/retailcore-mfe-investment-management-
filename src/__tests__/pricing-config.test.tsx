import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import PricingConfig from "../components/pages/term-deposit/forms/pricing-config"


jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ process: "continue" }),
}));
const navigate = jest.fn();

describe("PricingConfig", () => {
    const fData = {
        interestRateRangeType: "",
        applicableTenorMax: "",
        applicableTenorMin: "",
        applicablePrincipalMin: "",
        applicablePrincipalMax: "",
        interestRateMin: "",
        interestRateMax: "",
        interestRateConfigModels: [],
    }

    it("renders without errors", () => {
        act(() => {
        })
        const form = renderWithProviders(<PricingConfig proceed={jest.fn()} formData={fData} setFormData={jest.fn()} setDisabled={jest.fn()}/>)
        expect(form).toMatchSnapshot();
    })
})