import { act, render, screen } from "@testing-library/react"
import {renderWithProviders} from "../../__mocks__/api/Wrapper"
import ProductDetail from "../../components/modals/ProductDetail"

const details = {
    "id": "0192e82c-3784-4dee-a113-6d113d33eb01",
    "productCode": "d021",
    "state": 2,
    "recentUpdated": false,
    "recentlyUpdatedMeta": null,
    "productInfo": {
      "productName": "Draft Box updated",
      "slogan": "Draft slogan updat",
      "description": "Draft description example update",
      "startDate": "2023-12-15T00:00:00Z",
      "endDate": "2023-12-31T00:00:00Z",
      "currency": "NGN"
    },
    "customerEligibility": {
      "customerCategory": 0,
      "customerType": null,
      "ageGroupMin": 1,
      "ageGroupMax": 10,
      "requireDocument": [
        {
          "id": "dd215083-b9e3-bc60-8e4a-db51fca88b98",
          "name": "Customer Photo"
        },
        {
          "id": "25553641-faef-89f2-2c2f-e570e10a0d9b",
          "name": "Proof of residential address"
        },
        {
          "id": "241f56f9-f0f5-74df-32a0-6358138700d6",
          "name": "Valid Identification document"
        }
      ]
    },
    "pricingConfiguration": {
      "applicableTenorMin": 1,
      "applicableTenorMinUnit": 1,
      "applicableTenorMax": 100,
      "applicableTenorMaxUnit": 1,
      "applicablePrincipalMin": 1000,
      "applicablePrincipalMax": 1200000,
      "interestRateRangeType": 2,
      "interestRateConfigModels": [
        {
          "min": 1,
          "max": 4,
          "principalMin": 1000,
          "principalMax": 12000,
          "tenorMin": 0,
          "tenorMinUnit": 1,
          "tenorMax": 0,
          "tenorMaxUnit": 1
        },
        {
          "min": 5,
          "max": 20,
          "principalMin": 13000,
          "principalMax": 30000,
          "tenorMin": 0,
          "tenorMinUnit": 1,
          "tenorMax": null,
          "tenorMaxUnit": 1
        }
      ],
      "interestRateMin": 0,
      "interestRateMax": 4,
      "interestComputationMethod": 2
    },
    "liquidation": {
      "part_AllowPartLiquidation": true,
      "part_MaxPartLiquidation": 1,
      "part_RequireNoticeBeforeLiquidation": true,
      "part_NoticePeriod": 10,
      "part_NoticePeriodUnit": 1,
      "part_LiquidationPenalty": 4,
      "part_LiquidationPenaltyPercentage": 0,
      "part_SpecificCharges": [],
      "early_AllowEarlyLiquidation": true,
      "early_RequireNoticeBeforeLiquidation": true,
      "early_NoticePeriod": 3,
      "early_NoticePeriodUnit": 1,
      "early_LiquidationPenalty": 4,
      "early_LiquidationPenaltyPercentage": 20,
      "early_SpecificCharges": []
    },
    "productGlMappings": [
      {
        "accountName": "Current Account balances [ASTCAS23421]",
        "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "glAccountType": 0
      },
      {
        "accountName": "subMenu name2",
        "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "glAccountType": 1
      },
      {
        "accountName": "Current Account balances [ASTCAS23424]",
        "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "glAccountType": 2
      }
    ],
    "isDraft": false,
    "productType": 0
  }

describe("ProductDetail", () => {
  global.fetch = jest.fn(() => {
    console.log("heyyyyyyyyy");
    return Promise.resolve({
      json: () => Promise.resolve({ data: { CAD: 1.42 } }),
    })
  }
);
    it("Renders without crashing", () => {
      const val = renderWithProviders(<ProductDetail handleClick={jest.fn()} setIsOpen={jest.fn()} isOpen={true} detail={details}/>)
        act(() => {
        })
        expect(val).toMatchSnapshot();
        screen.debug()
    })
})