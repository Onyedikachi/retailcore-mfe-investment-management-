import { render, screen, fireEvent } from "@testing-library/react";
import Liquidation from "../../../components/modals/Liquidation"
import { renderWithProviders } from "../../../__mocks__/api/Wrapper";
import React from "react";


describe('Liquidation', () => {

    // Renders the component with default props
    it('should render the component with default props', () => {
        // Arrange
        const isOpen = true;
        const setIsOpen = jest.fn();
        const onConfirm = jest.fn();
        const detail = {};

        // Act
        renderWithProviders(<Liquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} title={"part liquidation request"} type={"part"} />);
        expect(screen).toMatchSnapshot();
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
        renderWithProviders(<Liquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} title={"part liquidation request"} type={"part"} />);

        // Act
        fireEvent.click(screen.getByTestId('cancel-btn'));

        // Assert
        expect(setIsOpen).toHaveBeenCalledWith(false);
    });

    // // Enters a value in the amount input and verifies that it is displayed
    // it('should display the entered value in the amount input', () => {
    //     // Arrange
    //     const isOpen = true;
    //     const setIsOpen = jest.fn();
    //     const onConfirm = jest.fn();
    //     const detail = {};
    //     renderWithProviders(<Liquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} title={"part liquidation request"} type={"part"} />);
    //     screen.debug();
    //     expect(2-1).toBe(3)
    //     // const amountInput = screen.getByPlaceholderText('Enter value');

    //     // // Act
    //     // fireEvent.change(amountInput, { target: { value: '1000' } });

    //     // // Assert
    //     // expect(amountInput?.value).toBe('1000');
    // });
});
