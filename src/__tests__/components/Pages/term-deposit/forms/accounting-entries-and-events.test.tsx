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
        renderWithProviders(<AccountingEntriesAndEvents proceed={jest.fn} formData={formD} setFormData={jest.fn()} setDisabled={jest.fn()} />)
        waitFor(() => {
            expect(screen.getByTestId("entriesandevents")).toBeInTheDocument();
            expect(screen.getAllByTestId("input-div").length).toBe(3);
            const openButton = screen.getAllByTestId("open-button")[0];
            fireEvent.click(openButton);
            expect(screen.getAllByTestId("gli-input").length).toBeGreaterThan(0);

        })
    })
});
