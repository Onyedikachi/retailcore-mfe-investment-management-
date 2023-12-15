import React from 'react'
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import AccountingEntriesAndEvents, { InputDivs } from '../../../../../components/pages/term-deposit/forms/accounting-entries-and-events'
import { act } from 'react-dom/test-utils';
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
        act(() => {
            renderWithProviders
            (<AccountingEntriesAndEvents proceed={jest.fn} formData={formD} setFormData={jest.fn()} setDisabled={jest.fn()} initiateDraft={undefined} />)
        })
    })
});
