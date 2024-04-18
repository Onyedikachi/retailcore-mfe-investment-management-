import PreviewChargesAndTaxes from "../../../components/summary/PreviewChargesAndTaxes"
import { render, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../__mocks__/api/Wrapper"
import React from "react";

const productDetail = {
    "id": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
    "productCode": "b001",
    "state": 2,
    "recentUpdated": false,
    "recentlyUpdatedMeta": null,
    "productInfo": {
        "productName": "Bahrain",
        "slogan": "Bahrain",
        "description": "Bahrain",
        "startDate": "2024-04-03T00:00:00Z",
        "endDate": null,
        "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "currencyCode": "NGN"
    },
    "customerEligibility": {
        "customerCategory": 0,
        "customerType": [],
        "ageGroupMin": 8,
        "ageGroupMax": null,
        "requireDocument": []
    },
    "pricingConfiguration": {
        "applicableTenorMin": 1,
        "applicableTenorMinUnit": 1,
        "applicableTenorMax": 30,
        "applicableTenorMaxUnit": 1,
        "applicablePrincipalMin": 1000,
        "applicablePrincipalMax": 100000,
        "interestRateRangeType": 2,
        "interestRateConfigModels": [
            {
                "index": 0,
                "min": null,
                "max": null,
                "principalMin": null,
                "principalMax": null,
                "tenorMin": null,
                "tenorMinUnit": 1,
                "tenorMax": null,
                "tenorMaxUnit": 1
            }
        ],
        "interestRateMin": 3,
        "interestRateMax": 15,
        "interestComputationMethod": 2
    },
    "liquidation": {
        "part_AllowPartLiquidation": true,
        "part_MaxPartLiquidation": 50,
        "part_RequireNoticeBeforeLiquidation": true,
        "part_NoticePeriod": 1,
        "part_NoticePeriodUnit": 1,
        "part_LiquidationPenalty": 2,
        "part_LiquidationPenaltyPercentage": 50,
        "part_SpecificCharges": [],
        "part_SpecialInterestRate": null,
        "early_AllowEarlyLiquidation": true,
        "early_RequireNoticeBeforeLiquidation": true,
        "early_NoticePeriod": 1,
        "early_NoticePeriodUnit": 1,
        "early_LiquidationPenalty": 3,
        "early_LiquidationPenaltyPercentage": null,
        "early_SpecificCharges": [],
        "eary_SpecialInterestRate": 2
    },
    "productGlMappings": [
        {
            "accountName": "Success Deposit",
            "accountId": "LIALIADLLDLL10051005I002I002",
            "glAccountType": 0
        },
        {
            "accountName": "Interest accrual",
            "accountId": "LIALIADLLDLL10011001I002I002",
            "glAccountType": 1
        },
        {
            "accountName": "Interest expense",
            "accountId": "EXPPEX0004I002",
            "glAccountType": 2
        }
    ],
    "isDraft": false,
    "productType": 0,
    "principalDepositChargesAndTaxes": {
        "applicableCharges": [
            "d193e376-607f-491f-a95b-df27c662038c"
        ],
        "applicableTaxes": [
            "bfdd8628-47b4-4327-9e0b-3843f94dc235"
        ]
    },
    "earlyLiquidationChargesAndTaxes": {
        "applicableCharges": [
            "459ae181-ec3c-488c-85af-cbdb7444eb3a"
        ],
        "applicableTaxes": [
            "fa1b177a-80f1-41bb-8f3c-5e681f703102"
        ]
    },
    "partLiquidationChargesAndTaxes": {
        "applicableCharges": [
            "459ae181-ec3c-488c-85af-cbdb7444eb3a"
        ],
        "applicableTaxes": [
            "fa1b177a-80f1-41bb-8f3c-5e681f703102"
        ]
    },
    "investmentLiquidationChargesAndTaxes": {
        "applicableCharges": [
            "459ae181-ec3c-488c-85af-cbdb7444eb3a"
        ],
        "applicableTaxes": [
            "fa1b177a-80f1-41bb-8f3c-5e681f703102"
        ]
    }
};

describe('default', () => {

    // Renders the component without crashing
    it('should render the component without crashing', () => {
        renderWithProviders(<PreviewChargesAndTaxes detail={productDetail} />);
    });
});
