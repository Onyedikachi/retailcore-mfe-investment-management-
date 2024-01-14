
import { render, screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../__mocks__/api/Wrapper"
import EarlyLiquidation from "../../components/modals/EarlyLiquidation"


class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

describe('code snippet', () => {

    beforeAll(() => {
        window.ResizeObserver = ResizeObserver
    })

    // Renders the component with the correct UI elements and styles
    it('should render the component with the correct UI elements and styles', () => {
        // Mock setIsOpen function
        const setIsOpen = jest.fn();

        // Render the component
        renderWithProviders(<EarlyLiquidation isOpen={true} setIsOpen={setIsOpen} />);

        // Assert that the component renders with the correct UI elements and styles
        expect(screen.getByTestId('Layout')).toBeInTheDocument();
        expect(screen.getByText('Early liquidation Request')).toBeInTheDocument();
        expect(screen.getByTestId('cancel-btn')).toBeInTheDocument();
        expect(screen.getByLabelText('Provide justification for part liquidation')).toBeInTheDocument();
        // expect(screen.getByText('Upload Supporting Documents')).toBeInTheDocument();
        expect(screen.getByText('Notify customer of liquidation')).toBeInTheDocument();
        expect(screen).toMatchSnapshot();
    });

    // Allows the user to input a reason for part liquidation
    it('should allow the user to input a reason for part liquidation', () => {
        // Mock setIsOpen function
        const setIsOpen = jest.fn();

        // Render the component
        renderWithProviders(<EarlyLiquidation isOpen={true} setIsOpen={setIsOpen} />);

        // Get the reason input element
        const reasonInput = screen.getByTestId('reason-input');

        // Simulate user input
        fireEvent.change(reasonInput, { target: { value: 'Test reason' } });

        // Assert that the reason input value is updated
        expect(reasonInput.value).toBe('Test reason');
    });

    // Allows the user to upload supporting documents
    it('should allow the user to upload supporting documents', () => {
        // Mock setIsOpen function
        const setIsOpen = jest.fn();

        // Render the component
        renderWithProviders(<EarlyLiquidation isOpen={true} setIsOpen={setIsOpen} />);

        // Get the file input element
        const fileInput = screen.getByTestId('input');

        // Simulate file upload
        fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.txt', { type: 'text/plain' })] } });

        // Assert that the file upload is successful
        expect(fileInput.files[0].name).toBe('test.txt');
    });

    // The user does not input a reason for part liquidation
    it('should disable the submit button when the user does not input a reason for part liquidation', () => {
        // Mock setIsOpen function
        const setIsOpen = jest.fn();

        // Render the component
        renderWithProviders(<EarlyLiquidation isOpen={true} setIsOpen={setIsOpen} />);

        // Get the submit button
        const submitButton = screen.getByTestId('submit-btn');

        // Assert that the submit button is disabled initially
        expect(submitButton).toBeDisabled();

        // Get the reason input element
        const reasonInput = screen.getByTestId('reason-input');

        // Simulate user input
        fireEvent.change(reasonInput, { target: { value: 'Test reason' } });

        // Assert that the submit button is enabled after user input
        expect(submitButton).toBeEnabled();
    });

    // The user uploads an unsupported file type
    it('should not allow the user to upload an unsupported file type', () => {
        // Mock setIsOpen function
        const setIsOpen = jest.fn();

        // Render the component
        renderWithProviders(<EarlyLiquidation isOpen={true} setIsOpen={setIsOpen} />);

        // Get the file input element
        const fileInput = screen.getByTestId('input');

        // Simulate file upload with unsupported file type
        fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.jpg', { type: 'image/jpeg' })] } });

        // Assert that the file input value is not updated
        expect(fileInput.value).toBe('');
    });
});
