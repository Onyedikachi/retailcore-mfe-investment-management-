import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation from "../components/pages/term-deposit/forms/customer-eligibilty-criteria";
import {renderWithProviders} from "../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import CustomerEligibilityCriteria from "../components/pages/term-deposit/forms/customer-eligibilty-criteria";

const fData = {
    customerCategory: "",
    ageGroupMin: "",
    ageGroupMax: "",
    corporateCustomerType: ""
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
        const form = renderWithProviders(<CustomerEligibilityCriteria proceed={jest.fn()} formData={fData} setDisabled={jest.fn()}/>)
        expect(form).toMatchSnapshot()
    })
})