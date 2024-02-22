import FormComponent from "../../../../pages/management/book-investment/FormComponent"
import { render, screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../../../../__mocks__/api/Wrapper"
import React from "react";

const mockFormData = {
  id: "",
  customerBookingInfoModel: {
    customerId: "63762c09-3f83-4200-be5c-dcba0ac8fe15",
    customerName: "Ibrahim Adefemi Cole",
    customerAccount: "2000000019",
    investmentformUrl: "http://retailcore-investment-management-api.dev.bepeerless.co/uploads/79dc1d11-d3e9-41cd-90ec-4827226d2764.jpg",
  },
  facilityDetailsModel: {
    investmentProductId: "",
    investmentPurpose: "",
    tenor: null,
    principal: null,
    interestRate: null,
    capitalizationMethod: 0,
  },
  transactionSettingModel: {
    accountForLiquidation: "",
    notifyCustomerOnMaturity: false,
    rollOverAtMaturity: false,
    rollOverOption: 0,
  },
  isDraft: false,
  recentUpdated: false,
  recentlyUpdatedMeta: "",
}

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: jest.fn(),
  useParams: jest.fn().mockReturnValue({ process: "continue", investmentType: "term-deposit"}),
}));

describe('code snippet', () => {
  const setDisabled = jest.fn();
  it('should render the customer information form when step is 1', () => {
    const step = 1;
    const handleNav = jest.fn();
    const { getByText } = renderWithProviders(<FormComponent isSavingDraft={false} setFormData={jest.fn()} step={step} handleNav={handleNav} setDisabled={setDisabled} formData={mockFormData} />);
    expect(getByText('Customer account')).toBeInTheDocument();
  });
  it('should render the customer information form when step is 2', () => {
    const step = 2;
    const handleNav = jest.fn();
    const { getByTestId } = renderWithProviders(<FormComponent setFormData={jest.fn()} step={step} handleNav={handleNav} setDisabled={setDisabled} formData={mockFormData} setCalcDetail={jest.fn()} setProductDetail={jest.fn()} />);
    expect(getByTestId('facility-details')).toBeInTheDocument();
  });

  // Allows the user to input customer information
  it('should allow the user to input customer information', () => {
    const step = 1;
    const handleNav = jest.fn();
    const { getByPlaceholderText } = renderWithProviders(<FormComponent setFormData={jest.fn()} step={step} setDisabled={setDisabled} handleNav={handleNav} formData={mockFormData} />);
    const accountNumberInput = getByPlaceholderText('Search by account number');
    fireEvent.change(accountNumberInput, { target: { value: '1234567890' } });
    expect(accountNumberInput.value).toBe('1234567890');
  });

  // Handles invalid input data correctly
  it('should handle invalid input data correctly', () => {
    const step = 1;
    const handleNav = jest.fn();
    const { getByTestId, getByPlaceholderText } = renderWithProviders(<FormComponent setFormData={jest.fn()} setDisabled={setDisabled} step={step} handleNav={handleNav} formData={mockFormData} />);
    const submitButton = getByTestId('submit-button');
    const accountNumberInput = getByPlaceholderText('Search by account number');
    fireEvent.change(accountNumberInput, { target: { value: '' } });
    fireEvent.submit(submitButton);
    expect(handleNav).not.toHaveBeenCalled();
  });
});
