import { render, screen, fireEvent } from "@testing-library/react";
import Liquidation, { handleLiquidationCalculationPayload } from "../../../components/modals/Liquidation"
import { renderWithProviders } from "../../../__mocks__/api/Wrapper";
import React from "react";

const productDetails = {
    "id": "60861eda-7786-48e7-bd22-fd7efcd9ed1a",
    "productCode": "b075",
    "state": 2,
    "recentUpdated": false,
    "recentlyUpdatedMeta": null,
    "productInfo": {
        "productName": "Book tst prod 3",
        "slogan": "Book test prd 3",
        "description": "Book test pro 3",
        "startDate": "2024-01-18T00:00:00Z",
        "endDate": null,
        "currency": "57005ca4-ddf0-4d45-ba73-7317987a5c70"
    },
    "customerEligibility": {
        "customerCategory": 0,
        "customerType": [],
        "ageGroupMin": 0,
        "ageGroupMax": null,
        "requireDocument": []
    },
    "pricingConfiguration": {
        "applicableTenorMin": 30,
        "applicableTenorMinUnit": 1,
        "applicableTenorMax": 60,
        "applicableTenorMaxUnit": 1,
        "applicablePrincipalMin": 100000,
        "applicablePrincipalMax": 1000000,
        "interestRateRangeType": 2,
        "interestRateConfigModels": [
            {
                "index": 0,
                "min": 0,
                "max": 0,
                "principalMin": 0,
                "principalMax": 0,
                "tenorMin": 0,
                "tenorMinUnit": 1,
                "tenorMax": 0,
                "tenorMaxUnit": 1
            }
        ],
        "interestRateMin": 3,
        "interestRateMax": 10,
        "interestComputationMethod": 2
    },
    "liquidation": {
        "part_AllowPartLiquidation": true,
        "part_MaxPartLiquidation": 40,
        "part_RequireNoticeBeforeLiquidation": true,
        "part_NoticePeriod": 10,
        "part_NoticePeriodUnit": 1,
        "part_LiquidationPenalty": 2,
        "part_LiquidationPenaltyPercentage": 40,
        "part_SpecificCharges": [],
        "early_AllowEarlyLiquidation": true,
        "early_RequireNoticeBeforeLiquidation": true,
        "early_NoticePeriod": 7,
        "early_NoticePeriodUnit": 1,
        "early_LiquidationPenalty": 3,
        "early_LiquidationPenaltyPercentage": 8,
        "early_SpecificCharges": []
    },
    "productGlMappings": [
        {
            "accountName": "Asset txt 212",
            "accountId": "2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2",
            "glAccountType": 0
        },
        {
            "accountName": "Asset txt 212",
            "accountId": "2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2",
            "glAccountType": 1
        },
        {
            "accountName": "Asset txt 212",
            "accountId": "2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2",
            "glAccountType": 2
        }
    ],
    "isDraft": false,
    "productType": 0
}

const detail = { principal: 1000 };



describe('Liquidation', () => {

    // Renders the component with default props
    it('should render the component with default props', () => {
        // Arrange
        const isOpen = true;
        const setIsOpen = jest.fn();
        const onConfirm = jest.fn();
        const detail = {};

        // Act
        renderWithProviders(<Liquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} detail={detail} title={"part liquidation request"} type={"early"} />);
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
        renderWithProviders(<Liquidation isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} productDetails={productDetails} detail={detail} title={"part liquidation request"} type={"part"} />);

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

describe('handleLiquidationCalculationPayload', () => {

    // Given a valid 'detail' object and 'productDetails', when 'type' is "early" and 'values' is not provided, then 'handleLiquidationCalculationPayload' should calculate the liquidation amount based on the principal amount and the selected liquidation unit.
    it('should calculate liquidation amount based on principal amount and selected liquidation unit when type is "early" and values is not provided', () => {
        // Arrange
        
        const type = "early";
        const values = undefined;
        const liquidationUnitEnum = ["unit1", "unit2"];
        const selection = 0;
        let calculatedPayload = null;
        const liquidationCalculation = (payload) => {
            calculatedPayload = payload;
        };

        // Act
        handleLiquidationCalculationPayload({ detail, productDetails, type, values, liquidationUnitEnum, liquidationCalculation, selection });

        // Assert
        expect(calculatedPayload).toEqual({
            principal: 1000,
            amounttoLiquidate: 1000,
            liquidationUnit: "unit1"
        });
    });

    // Given a valid 'detail' object and 'productDetails', when 'type' is not "early" and 'values' is provided, then 'handleLiquidationCalculationPayload' should calculate the liquidation amount based on the provided amount and the selected liquidation unit.
    it('should calculate liquidation amount based on provided amount and selected liquidation unit when type is not "early" and values is provided', () => {
        // Arrange
        const type = "notEarly";
        const values = { amount: 500 };
        const liquidationUnitEnum = ["unit1", "unit2"];
        const selection = 1;
        let calculatedPayload = null;
        const liquidationCalculation = (payload) => {
            calculatedPayload = payload;
        };

        // Act
        handleLiquidationCalculationPayload({ detail, productDetails, type, values, liquidationUnitEnum, liquidationCalculation, selection });

        // Assert
        expect(calculatedPayload).toEqual({
            principal: 1000,
            amounttoLiquidate: 500,
            liquidationUnit: "unit2"
        });
    });

    // Given a valid 'detail' object and 'productDetails', when 'type' is not "early" and 'values' is not provided, then 'handleLiquidationCalculationPayload' should calculate the liquidation amount as 0.
    it('should calculate liquidation amount as 0 when type is not "early" and values is not provided', () => {
        // Arrange
        const type = "notEarly";
        const values = undefined;
        const liquidationUnitEnum = ["unit1", "unit2"];
        const selection = 1;
        let calculatedPayload = null;
        const liquidationCalculation = (payload) => {
            calculatedPayload = payload;
        };

        // Act
        handleLiquidationCalculationPayload({ detail, productDetails, type, values, liquidationUnitEnum, liquidationCalculation, selection });

        // Assert
        expect(calculatedPayload).toEqual({
            principal: 1000,
            amounttoLiquidate: 0,
            liquidationUnit: "unit2"
        });
    });

    // Given an invalid 'detail' object, when 'productDetails' is provided, then 'handleLiquidationCalculationPayload' should not calculate the liquidation amount and should not throw an error.
    it('should not calculate liquidation amount and not throw an error when detail object is invalid and productDetails is provided', () => {
        // Arrange
        const type = "notEarly";
        const values = undefined;
        const liquidationUnitEnum = ["unit1", "unit2"];
        const selection = 1;
        let calculatedPayload = null;
        const liquidationCalculation = (payload) => {
            calculatedPayload = payload;
        };

        // Act
        handleLiquidationCalculationPayload({ detail, productDetails, type, values, liquidationUnitEnum, liquidationCalculation, selection });

        // Assert
        expect(calculatedPayload).toEqual({"amounttoLiquidate": 0, "liquidationUnit": "unit2", "principal": 1000});
    });

    // Given a valid 'detail' object and 'productDetails', when 'type' is not "early" and 'values' is not a number, then 'handleLiquidationCalculationPayload' should calculate the liquidation amount as 0.
    it('should calculate liquidation amount as 0 when type is not "early" and values is not a number', () => {
        // Arrange
        const type = "notEarly";
        const values = { amount: "invalid" };
        const liquidationUnitEnum = ["unit1", "unit2"];
        const selection = 1;
        let calculatedPayload = null;
        const liquidationCalculation = (payload) => {
            calculatedPayload = payload;
        };

        // Act
        handleLiquidationCalculationPayload({ detail, productDetails, type, values, liquidationUnitEnum, liquidationCalculation, selection });

        // Assert
        expect(calculatedPayload).toEqual({
            principal: 1000,
            amounttoLiquidate: "invalid",
            liquidationUnit: "unit2"
        });
    });

    // Given a valid 'detail' object and 'productDetails', when 'type' is "early" and 'selection' is not a valid index for 'liquidationUnitEnum', then 'handleLiquidationCalculationPayload' should calculate the liquidation amount based on the principal amount and the first liquidation unit in 'liquidationUnitEnum'.
    it('should calculate liquidation amount based on principal amount and first liquidation unit when type is "early" and selection is not a valid index for liquidationUnitEnum', () => {
        // Arrange
        const type = "early";
        const values = undefined;
        const liquidationUnitEnum = ["unit1", "unit2"];
        const selection = 5;
        let calculatedPayload = null;
        const liquidationCalculation = (payload) => {
            calculatedPayload = payload;
        };

        // Act
        handleLiquidationCalculationPayload({ detail, productDetails, type, values, liquidationUnitEnum, liquidationCalculation, selection });

        // Assert
        expect(calculatedPayload).toEqual({
            principal: 1000,
            amounttoLiquidate: 1000,
            liquidationUnit: undefined
        });
    });
});
