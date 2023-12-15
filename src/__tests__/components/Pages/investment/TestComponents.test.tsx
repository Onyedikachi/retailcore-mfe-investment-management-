import { render, screen } from "@testing-library/react";
import TestComponent from "../../../../pages/investment/TestComponents"

describe("TestComponents", () => {
    // Renders the FormStepComponent with the correct step and formStepItems.
    it('should render FormStepComponent with correct step and formStepItems', () => {
        render(<TestComponent />);
        const formStepItems = screen.getAllByTestId('form-step-item-index');
        expect(formStepItems).toHaveLength(4);
        expect(formStepItems[0]).toHaveTextContent('1');
        expect(formStepItems[1]).toHaveTextContent('2');
        expect(formStepItems[2]).toHaveTextContent('3');
        expect(formStepItems[3]).toHaveTextContent('4');
    });
})