import FormComponent from "../../../../pages/management/book-investment/FormComponent"
import {render, screen, fireEvent} from "@testing-library/react"
import {renderWithProviders} from "../../../../__mocks__/api/Wrapper"
describe('code snippet', () => {

    // Renders the correct form based on the current step
    it('should render the customer information form when step is 1', () => {
      const step = 1;
      const handleNav = jest.fn();
      const { getByTestId } = renderWithProviders(<FormComponent step={step} handleNav={handleNav} />);
      expect(getByTestId('customerInformation')).toBeInTheDocument();
    });
    it('should render the customer information form when step is 2', () => {
      const step = 2;
      const handleNav = jest.fn();
      const { getByTestId } = renderWithProviders(<FormComponent step={step} handleNav={handleNav} />);
      expect(getByTestId('facility-details')).toBeInTheDocument();
    });
    
    // Passes the 'proceed' function to the 'CustomerInformation' component
    it("should pass the 'proceed' function to the 'CustomerInformation' component", () => {
        const step = 1;
        const handleNav = jest.fn();
        const { getByTestId } = renderWithProviders(<FormComponent step={step} handleNav={handleNav} />);
      const submitButton = getByTestId('submit-button');
      fireEvent.submit(submitButton);
      expect(handleNav).toHaveBeenCalled();
    });

    // Allows the user to input customer information
    it('should allow the user to input customer information', () => {
      const step = 1;
      const handleNav = jest.fn();
      const { getByPlaceholderText } = renderWithProviders(<FormComponent step={step} handleNav={handleNav} />);
      const accountNumberInput = getByPlaceholderText('Search by account number');
      fireEvent.change(accountNumberInput, { target: { value: '1234567890' } });
      expect(accountNumberInput.value).toBe('1234567890');
    });

    // Handles invalid input data correctly
    it('should handle invalid input data correctly', () => {
      const step = 1;
      const handleNav = jest.fn();
      const { getByTestId, getByPlaceholderText } = renderWithProviders(<FormComponent step={step} handleNav={handleNav} />);
      const submitButton = getByTestId('submit-button');
      const accountNumberInput = getByPlaceholderText('Search by account number');
      fireEvent.change(accountNumberInput, { target: { value: '' } });
      fireEvent.submit(submitButton);
      expect(handleNav).toHaveBeenCalledWith();
    });
});
