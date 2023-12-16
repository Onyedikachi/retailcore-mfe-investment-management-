import React from 'react'
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import AccountingEntriesAndEvents, { InputDivs } from '../../../../../components/pages/term-deposit/forms/accounting-entries-and-events'
import { renderWithProviders } from '../../../../../utils/test-util';

describe('AccountingEntriesAndEvents', () => {
    const formD = {
        productName: "",
        slogan: "",
        description: "",
        startDate: new Date(),
        endDate: null,
        currency: "NGN",
        customerCategory: null,
    }
    it("Renders without error", () => {
        renderWithProviders
            (<AccountingEntriesAndEvents proceed={jest.fn} formData={formD} setFormData={jest.fn()} setDisabled={jest.fn()} initiateDraft={undefined} />)
        expect(screen.getByText("Product to GL Mapping")).toBeInTheDocument();
        expect(screen.getByText("Term Deposit Liability account")).toBeInTheDocument();
        expect(screen.getByText("Interest accural account")).toBeInTheDocument();

        expect(screen.getAllByTestId("gli-input").length).toBeGreaterThan(0);
    })
    
    it ("Should change gli inputs value", () => {
        renderWithProviders
        (<AccountingEntriesAndEvents proceed={jest.fn} formData={formD} setFormData={jest.fn()} setDisabled={jest.fn()} initiateDraft={undefined} />)
        const inputs = screen.getAllByTestId("gli-input");
        inputs.forEach((input) => {
            fireEvent.change(input, { target: { value: 'Test value' } });
            expect(input.value).toBe("Test value");
        })
    })
});
