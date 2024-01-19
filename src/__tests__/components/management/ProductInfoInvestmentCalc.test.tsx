import { renderWithProviders } from "../../../__mocks__/api/Wrapper";
import ProductInfoInvestmentCalc, { handleProductDetailMap } from "../../../components/management/ProductInfoInvestmentCalc"
import { render, screen } from "@testing-library/react"
import { AppContext } from "../../../utils/context"

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


describe('ProductInfoInvestmentCalc', () => {
    
    // The product information section displays the correct product name and description
    it('should display correct product name and description', async () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />);
        // assertion
        expect(screen.getAllByText(productDetail.productInfo.productName).length).toBeGreaterThan(0);
        expect(screen.getByText(productDetail.productInfo.description)).toBeInTheDocument();
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