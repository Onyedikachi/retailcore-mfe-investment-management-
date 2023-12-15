import React from 'react'
import { fireEvent, render, screen, } from "@testing-library/react";
import AccountingEntriesAndEvents, { InputDivs } from '../../../../../components/pages/term-deposit/forms/accounting-entries-and-events'
import { act } from 'react-dom/test-utils'

describe('AccountingEntriesAndEvents', () => {
    const formD =  {
        productName: "",
        slogan: "",
        description: "",
        startDate: new Date(),
        endDate: null,
        currency: "NGN",
        customerCategory: null,
      }
    it("Renders without error", () => {
        act(() => {
            render(<AccountingEntriesAndEvents proceed={jest.fn} formData={formD} setFormData={jest.fn()} setDisabled={jest.fn()} />)
        })
        expect(screen.getByTestId("entriesandevents")).toBeInTheDocument();
        expect(screen.getAllByTestId("input-div").length).toBe(3);
        const openButton = screen.getAllByTestId("open-button")[0];
        fireEvent.click(openButton);
        expect(screen.getAllByTestId("gli-input").length).toBeGreaterThan(0);
    })
});
