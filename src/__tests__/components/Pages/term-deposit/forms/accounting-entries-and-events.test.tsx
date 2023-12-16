import React from 'react'
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import AccountingEntriesAndEvents, { InputDivs, handleGlMappingSchema } from '../../../../../components/pages/term-deposit/forms/accounting-entries-and-events'
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

    it("Should change gli inputs value", () => {
        renderWithProviders
            (<AccountingEntriesAndEvents proceed={jest.fn} formData={formD} setFormData={jest.fn()} setDisabled={jest.fn()} initiateDraft={undefined} />)
        const inputs = screen.getAllByTestId("gli-input");
        inputs.forEach((input) => {
            fireEvent.change(input, { target: { value: 'Test value' } });
            expect(input.value).toBe("Test value");
        })
    })
});

describe("handleGLMapping", () => {
    const key = "InterestAccrualAccoun"
    const submenu = {
        name: "subzero", ledger_code: "34567"
    }
    const mapOptions = [
        {
            "accountName": "Test asset primum ledger 100",
            "accountId": "e5f1cfff-b165-40db-9c4f-d05b41cd334a",
            "glAccountType": 0
        },
        {
            "accountName": "Test asset primum ledger 21",
            "accountId": "2e018e63-a752-4667-9b64-1c3c93c76f50",
            "glAccountType": 1
        },
        {
            "accountName": "Test asset primum ledger 11",
            "accountId": "35a69d04-c6bf-43fc-bc78-10342c65e20a",
            "glAccountType": 2
        }
    ]
    const setValue = jest.fn();
    const setMapOptions = jest.fn();
    it("should call setValue", () => {
        handleGlMappingSchema(key, submenu, setValue, mapOptions, setMapOptions)
        expect(setValue).toBeCalledWith(key, submenu?.name)
        expect(setMapOptions).toBeCalledWith([{"accountId": "e5f1cfff-b165-40db-9c4f-d05b41cd334a", "accountName": "Test asset primum ledger 100", "glAccountType": 0}, {"accountId": "2e018e63-a752-4667-9b64-1c3c93c76f50", "accountName": "Test asset primum ledger 21", "glAccountType": 1}, {"accountId": "35a69d04-c6bf-43fc-bc78-10342c65e20a", "accountName": "Test asset primum ledger 11", "glAccountType": 2}, {"accountId": undefined, "accountName": "subzero", "glAccountType": undefined}]);
    })
})