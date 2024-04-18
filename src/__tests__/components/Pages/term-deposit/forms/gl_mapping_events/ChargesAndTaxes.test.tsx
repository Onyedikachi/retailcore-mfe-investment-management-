import React from "react";
import ChargesAndTaxes, { handleRedirect } from "../../../../../../components/pages/term-deposit/forms/gl_mapping_events/ChargesAndTaxes"
import { fireEvent, render, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../../../../__mocks__/api/Wrapper"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", category: "investments", tab: "" })]),
    useParams: jest.fn().mockReturnValue({ process: "continue" }),
    useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));

describe('code snippet', () => {

    // User can toggle between Charges and Taxes tabs
    it('should toggle between Charges and Taxes tabs when clicked', () => {
        // Arrange
        const setActiveTab = jest.fn();
        const activeTab = [];
        const tab = 'Charges';
        const values = {};
        const event = 'event';
        const setFormData = jest.fn();
        const header = 'Header';
        const charges = {};
        const chargesLoading = false;
        const taxes = {};
        const taxesLoading = false;
        const productData = {};
        const disabled = false;
        const placeholder = 'Placeholder';
        const setValue = jest.fn();

        // Act
        renderWithProviders(
            <ChargesAndTaxes
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                tab={tab}
                values={values}
                event={event}
                setFormData={setFormData}
                header={header}
                charges={charges}
                chargesLoading={chargesLoading}
                taxes={taxes}
                taxesLoading={taxesLoading}
                productData={productData}
                disabled={disabled}
                placeholder={placeholder}
                setValue={setValue}
            />
        );

        screen.debug();

        // fireEvent.click(screen.getByText('Charges & Taxes'));

        // Assert
        // expect(setActiveTab).toHaveBeenCalledWith(['Charges']);
    });

    // No charges or taxes available to select
    it('should not display any charges or taxes when none are available', () => {
        // Arrange
        const setActiveTab = jest.fn();
        const activeTab = [];
        const tab = 'Charges';
        const values = {};
        const event = 'event';
        const setFormData = jest.fn();
        const header = 'Header';
        const charges = {};
        const chargesLoading = false;
        const taxes = {};
        const taxesLoading = false;
        const productData = {};
        const disabled = false;
        const placeholder = 'Placeholder';
        const setValue = jest.fn();

        // Act
        renderWithProviders(
            <ChargesAndTaxes
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                tab={tab}
                values={values}
                event={event}
                setFormData={setFormData}
                header={header}
                charges={charges}
                chargesLoading={chargesLoading}
                taxes={taxes}
                taxesLoading={taxesLoading}
                productData={productData}
                disabled={disabled}
                placeholder={placeholder}
                setValue={setValue}
            />
        );

        // Assert
        expect(screen.queryByText('Applicable Charge(s)')).toBeNull();
        expect(screen.queryByText('Applicable tax(es)')).toBeNull();
    });
});

let windowSpy;



describe('handleRedirect', () => {
    beforeEach(() => {
        windowSpy = jest.spyOn(window, "window", "get");
    });
    
    afterEach(() => {
        windowSpy.mockRestore();
    });
    it('should redirect to create tax page when type is "tax"', () => {
        windowSpy.mockImplementation(() => ({
            location: {
                origin: "https://example.com"
            }
        }));
        expect(handleRedirect("tax")).toBeUndefined();
        expect(handleRedirect("charge")).toBeUndefined();

    });
});
