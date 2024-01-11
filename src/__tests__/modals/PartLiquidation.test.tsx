import { render, screen, fireEvent } from "@testing-library/react";
import PartLiquidation from "../../components/modals/PartLiquidation"
import { renderWithProviders } from "../../__mocks__/api/Wrapper";


describe('PartLiquidation', () => {

    // Renders the component with default props
    it('should render the component with default props', () => {
        // Arrange
        const isOpen = true;
        const setIsOpen = jest.fn();
        const onConfirm = jest.fn();
        const detail = {};

        // Act
        renderWithProviders(<PartLiquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} />);

        // Assert
        // Add assertions here
    });

    // Clicks the cancel button and verifies that the modal is closed
    it('should close the modal when the cancel button is clicked', () => {
        // Arrange
        const isOpen = true;
        const setIsOpen = jest.fn();
        const onConfirm = jest.fn();
        const detail = {};
        renderWithProviders(<PartLiquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} />);

        // Act
        fireEvent.click(screen.getByTestId('cancel-btn'));

        // Assert
        expect(setIsOpen).toHaveBeenCalledWith(false);
    });

    // Enters a value in the amount input and verifies that it is displayed
    it('should display the entered value in the amount input', () => {
        // Arrange
        const isOpen = true;
        const setIsOpen = jest.fn();
        const onConfirm = jest.fn();
        const detail = {};
        renderWithProviders(<PartLiquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} />);
        const amountInput = screen.getByPlaceholderText('Enter value');

        // Act
        fireEvent.change(amountInput, { target: { value: '1000' } });

        // Assert
        expect(amountInput.value).toBe('1000');
    });
});
