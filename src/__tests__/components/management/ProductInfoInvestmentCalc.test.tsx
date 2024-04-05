import { renderWithProviders } from "../../../__mocks__/api/Wrapper";
import ProductInfoInvestmentCalc, { ChargesAndTaxes, handleProductDetailMap } from "../../../components/management/ProductInfoInvestmentCalc"
import { fireEvent, render, screen } from "@testing-library/react"
import { AppContext } from "../../../utils/context"
import React from "react";

const formData = {
    id: "",
    customerId: "",
    customerBookingInfoModel: {
        customerId: "63762c09-3f83-4200-be5c-dcba0ac8fe15",
        customerName: "Ibrahim Adefemi Cole",
        customerAccount: "2000000019",
        investmentformUrl:
            "http://retailcore-investment-management-api.dev.bepeerless.co/uploads/79dc1d11-d3e9-41cd-90ec-4827226d2764.jpg",
    },
    facilityDetailsModel: {
        capitalizationMethod: 0,
        interestRate: 2,
        principal: 3000,
        tenor: 3,
        investmentPurpose: "Purpose",
        investmentProductId: "87e95dfb-f13d-465e-93a9-a214617699f9",
        investmentProductName: "Leke Test Draft withdrawn",
        tenorMin: null,
        tenorMax: null,
        prinMin: null,
        prinMax: null,
        intMin: null,
        intMax: null,
    },
    transactionSettingModel: {
        accountForLiquidation: "",
        notifyCustomerOnMaturity: false,
        rollOverAtMaturity: false,
        rollOverOption: 0,
    },
    isDraft: false,
    recentUpdated: false,
    recentlyUpdatedMeta: "",
}

const productDetail = {
    "id": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
    "productCode": "b001",
    "state": 2,
    "recentUpdated": false,
    "recentlyUpdatedMeta": null,
    "productInfo": {
        "productName": "Bahrainn",
        "slogan": "Bahrain",
        "description": "Bahrainnn",
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


describe('ProductInfoInvestmentCalc', () => {

    // The product information section displays the correct product name and description
    it('should display correct product name and description', async () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />);
        // assertion
        expect(screen.getAllByText(productDetail.productInfo.productName).length).toBeGreaterThan(0);
        expect(screen.getByText(productDetail.productInfo.description)).toBeInTheDocument();
        expect(screen).toMatchSnapshot();
    });

    it('should display correct tab1', async () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />);
        // assertion
        expect(screen.getAllByText(productDetail.productInfo.productName).length).toBeGreaterThan(0);
        expect(screen.getByText(productDetail.productInfo.description)).toBeInTheDocument();
        fireEvent.click(screen.getAllByTestId("btn")[1]);
        expect(screen).toMatchSnapshot();
    });

    it('should display correct tab2', async () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />);
        // assertion
        expect(screen.getAllByText(productDetail.productInfo.productName).length).toBeGreaterThan(0);
        expect(screen.getByText(productDetail.productInfo.description)).toBeInTheDocument();
        fireEvent.click(screen.getAllByTestId("btn")[2]);
        expect(screen).toMatchSnapshot();
    });

    it('should display correct tab3', async () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />);
        // assertion
        expect(screen.getAllByText(productDetail.productInfo.productName).length).toBeGreaterThan(0);
        expect(screen.getByText(productDetail.productInfo.description)).toBeInTheDocument();
        fireEvent.click(screen.getAllByTestId("btn")[3]);
        expect(screen).toMatchSnapshot();
    });

    it('should mot display correct product name and description', async () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={{}} formData={formData} />);
        // assertion
        expect(screen).toMatchSnapshot();
    });
});

// describe("handleProductDetailMap", () => {
//     const setProductDetailMap = jest.fn()
//     it("should run without errors", () => {
//         handleProductDetailMap({productDetail, currencies: [], setProductDetailMap})
//     })
//     expect(setProductDetailMap).toHaveBeenCalled();
// })
const taxData = [
    {
        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_by": "Admin KPMG",
        "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "last_modified_by": "Admin KPMG",
        "deleted_at": null,
        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
        "branch": null,
        "tax_id": "d86f03b3-f8ff-4a8d-9fa6-ab39ce6b4920",
        "tax": null,
        "tax_request_id": "3de2c289-6244-4875-8248-1c0e9268bb94",
        "name": "Sterling Tax",
        "code": "STL001",
        "abbreviation": "STL",
        "currency": "NGN",
        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "recently_updated_column": null,
        "description": "for tax",
        "state": "Active",
        "hasPendingRequest": false,
        "justification": null,
        "supporting_document_key": null,
        "team_name": null,
        "team_id": null,
        "approver_name": "Admin KPMG",
        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_at": "2024-04-03T13:25:44.328Z",
        "updated_at": "2024-04-03T13:27:01.689Z",
        "tax_values": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "last_modified_by": "Admin KPMG",
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "tax_value_id": "2af9eb91-6c37-4556-a0b1-f9f75342b52f",
                "tax_id": "d86f03b3-f8ff-4a8d-9fa6-ab39ce6b4920",
                "tax_type": "Variable Tax",
                "tax_amount": "1800",
                "tax_interval": false,
                "tax_interval_value": "0",
                "tax_amount_type": "Currency",
                "compare_tax_parameter": null,
                "minimum_transaction_value": "1",
                "maximum_transaction_value": "50000",
                "compare_tax_percentage_value": null,
                "compare_tax_currency_value": null,
                "created_at": "2024-04-03T13:26:48.842Z",
                "updated_at": "2024-04-03T13:26:48.842Z"
            }
        ],
        "tax_impacted_ledgers": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "last_modified_by": "Admin KPMG",
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "tax_impacted_ledger_id": "a05df03c-f12d-4ed5-a294-d1bd43ac6b82",
                "tax_id": "d86f03b3-f8ff-4a8d-9fa6-ab39ce6b4920",
                "gl_class": "Revenue",
                "ledger_id": "7dca0d56-e84a-411c-b872-9e4e32f4d82b",
                "ledger_name": "Ledger for Tax",
                "ledger_code": "REVRVN1003I002",
                "balance_impact": "High",
                "allocation": "100",
                "created_at": "2024-04-03T13:26:57.468Z",
                "updated_at": "2024-04-03T13:26:57.468Z"
            }
        ]
    },
    {
        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_by": "Admin KPMG",
        "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "last_modified_by": "Admin KPMG",
        "deleted_at": null,
        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
        "branch": null,
        "tax_id": "9b648111-5e80-4b7c-b394-0e0248020815",
        "tax": null,
        "tax_request_id": "e6ca7fc2-173d-4d16-bf1a-d4f9fd2be543",
        "name": "Applicable tax",
        "code": "APL001",
        "abbreviation": "APL",
        "currency": "NGN",
        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "recently_updated_column": null,
        "description": "For tax",
        "state": "Active",
        "hasPendingRequest": false,
        "justification": null,
        "supporting_document_key": null,
        "team_name": null,
        "team_id": null,
        "approver_name": "Admin KPMG",
        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_at": "2024-04-03T13:23:53.817Z",
        "updated_at": "2024-04-03T13:24:18.011Z",
        "tax_values": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "last_modified_by": "Admin KPMG",
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "tax_value_id": "c414d457-b325-4974-b2ee-41acb1a59e4a",
                "tax_id": "9b648111-5e80-4b7c-b394-0e0248020815",
                "tax_type": "Fixed Tax",
                "tax_amount": "1400",
                "tax_interval": false,
                "tax_interval_value": "0",
                "tax_amount_type": "Currency",
                "compare_tax_parameter": null,
                "minimum_transaction_value": null,
                "maximum_transaction_value": null,
                "compare_tax_percentage_value": null,
                "compare_tax_currency_value": null,
                "created_at": "2024-04-03T13:24:04.305Z",
                "updated_at": "2024-04-03T13:24:04.305Z"
            }
        ],
        "tax_impacted_ledgers": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "last_modified_by": "Admin KPMG",
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "tax_impacted_ledger_id": "c3e0ff69-668f-4c13-a370-3100da27958c",
                "tax_id": "9b648111-5e80-4b7c-b394-0e0248020815",
                "gl_class": "Revenue",
                "ledger_id": "7dca0d56-e84a-411c-b872-9e4e32f4d82b",
                "ledger_name": "Ledger for Tax",
                "ledger_code": "REVRVN1003I002",
                "balance_impact": "High",
                "allocation": "100",
                "created_at": "2024-04-03T13:24:13.012Z",
                "updated_at": "2024-04-03T13:24:13.012Z"
            }
        ]
    },
]; // valid tax data
const chargeData = [
    {
        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_by": "Admin KPMG",
        "last_modified_by_id": null,
        "last_modified_by": null,
        "deleted_at": null,
        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
        "branch": null,
        "charge_id": "4938ed6c-b873-4ce8-bd0f-518b5a2a5d6b",
        "name": "Sukuk",
        "code": "SUK000",
        "justification": null,
        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "currency": "NGN",
        "recently_updated_column": null,
        "description": "For charge",
        "state": "active",
        "hasPendingRequest": false,
        "approver": "Admin KPMG",
        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_at": "2024-04-03T12:37:22.096Z",
        "updated_at": "2024-04-03T12:38:23.379Z",
        "request_id": "7d3a2b32-bf30-4fe0-babe-6eb782285723",
        "charge_value": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": null,
                "last_modified_by": null,
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "charge_value_id": "ee78d75f-d384-4eee-ba96-b97e9dd9ea2a",
                "charge_type": "Fixed Charge",
                "charge_amount": "1100",
                "charge_interval": true,
                "charge_interval_value": "50000",
                "charge_amount_type": "Currency",
                "compare_charge_parameter": null,
                "minimum_transaction_value": null,
                "maximum_transaction_value": null,
                "compare_charge_percentage_value": null,
                "compare_charge_currency_value": null,
                "created_at": "2024-04-03T12:37:38.396Z",
                "updated_at": "2024-04-03T12:37:38.396Z",
                "charge_id": "4938ed6c-b873-4ce8-bd0f-518b5a2a5d6b"
            }
        ]
    },
    {
        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_by": "Admin KPMG",
        "last_modified_by_id": null,
        "last_modified_by": null,
        "deleted_at": null,
        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
        "branch": null,
        "charge_id": "6b7e71f5-cc3e-4c00-a108-b917b813b05a",
        "name": "Bank charge",
        "code": "BAN000",
        "justification": null,
        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "currency": "NGN",
        "recently_updated_column": null,
        "description": "For charges",
        "state": "active",
        "hasPendingRequest": false,
        "approver": "Admin KPMG",
        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_at": "2024-04-03T10:44:02.471Z",
        "updated_at": "2024-04-03T10:45:09.088Z",
        "request_id": "fb1a7820-374c-4ac4-9c84-361395a46776",
        "charge_value": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": null,
                "last_modified_by": null,
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "charge_value_id": "677de62f-2010-4889-a2a7-ce99d9b0a26e",
                "charge_type": "Variable Charge",
                "charge_amount": "1800",
                "charge_interval": false,
                "charge_interval_value": "0",
                "charge_amount_type": "Currency",
                "compare_charge_parameter": null,
                "minimum_transaction_value": "1",
                "maximum_transaction_value": "30000",
                "compare_charge_percentage_value": null,
                "compare_charge_currency_value": null,
                "created_at": "2024-04-03T10:44:26.346Z",
                "updated_at": "2024-04-03T10:44:26.346Z",
                "charge_id": "6b7e71f5-cc3e-4c00-a108-b917b813b05a"
            }
        ]
    },
    {
        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_by": "Admin KPMG",
        "last_modified_by_id": null,
        "last_modified_by": null,
        "deleted_at": null,
        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
        "branch": null,
        "charge_id": "32299bd6-b03a-4698-9ee9-1208080550ac",
        "name": "FIRS Charge",
        "code": "FIR000",
        "justification": null,
        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "currency": "NGN",
        "recently_updated_column": null,
        "description": "For charge",
        "state": "active",
        "hasPendingRequest": false,
        "approver": "Admin KPMG",
        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_at": "2024-04-03T10:42:06.777Z",
        "updated_at": "2024-04-03T10:43:06.918Z",
        "request_id": "20311d0a-6b75-43c3-93c9-7304b3beed4a",
        "charge_value": [
            {
                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "created_by": "Admin KPMG",
                "last_modified_by_id": null,
                "last_modified_by": null,
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "charge_value_id": "962c0fd6-8d2c-4c38-ae67-f5ac9c3f9da3",
                "charge_type": "Fixed Charge",
                "charge_amount": "1200",
                "charge_interval": true,
                "charge_interval_value": "60000",
                "charge_amount_type": "Currency",
                "compare_charge_parameter": null,
                "minimum_transaction_value": null,
                "maximum_transaction_value": null,
                "compare_charge_percentage_value": null,
                "compare_charge_currency_value": null,
                "created_at": "2024-04-03T10:42:18.329Z",
                "updated_at": "2024-04-03T10:42:18.329Z",
                "charge_id": "32299bd6-b03a-4698-9ee9-1208080550ac"
            }
        ]
    },
    {
        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_by": "Admin KPMG",
        "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "last_modified_by": "Admin KPMG",
        "deleted_at": null,
        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
        "branch": null,
        "charge_id": "d193e376-607f-491f-a95b-df27c662038c",
        "name": "Investment Charges",
        "code": "INV000",
        "justification": null,
        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
        "currency": "NGN",
        "recently_updated_column": "state",
        "description": "For charge",
        "state": "active",
        "hasPendingRequest": false,
        "approver": "Admin KPMG",
        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
        "created_at": "2024-04-03T08:48:51.267Z",
        "updated_at": "2024-04-03T08:54:13.903Z",
        "request_id": "26f1610c-e9e9-41f6-84ee-204805aed432",
        "charge_value": [
            {
                "created_by_id": null,
                "created_by": null,
                "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                "last_modified_by": "Admin KPMG",
                "deleted_at": null,
                "tenant_id": null,
                "branch": null,
                "charge_value_id": "7d4f4087-8191-4bc4-b281-dabd7cbefdab",
                "charge_type": "Variable Charge",
                "charge_amount": "2500",
                "charge_interval": false,
                "charge_interval_value": "0",
                "charge_amount_type": "Currency",
                "compare_charge_parameter": null,
                "minimum_transaction_value": "1",
                "maximum_transaction_value": "10000",
                "compare_charge_percentage_value": null,
                "compare_charge_currency_value": null,
                "created_at": "2024-04-03T08:54:13.889Z",
                "updated_at": "2024-04-03T08:54:13.889Z",
                "charge_id": "d193e376-607f-491f-a95b-df27c662038c"
            }
        ]
    },
]; // valid charge data

describe('ChargesAndTaxes', () => {

    // Renders the component without errors when given valid props.
    it('should render the component without errors when given valid props', () => {
        // Arrange

        // Act
        render(<ChargesAndTaxes taxData={taxData} chargeData={chargeData} productDetail={productDetail} />);
        expect(screen).toMatchSnapshot()
        // Assert
        // expect(screen.queryByText(/Charges & Taxes/)).toBeInTheDocument();
        // add more assertions as needed
    });
    
    // Displays a dash when there are no applicable charges for an option.
    it('should display a dash when there are no applicable charges for an option', () => {
        render(<ChargesAndTaxes taxData={[]} chargeData={[]} productDetail={productDetail} />);
        expect(screen).toMatchSnapshot()
        // add more assertions as needed
    });
});
