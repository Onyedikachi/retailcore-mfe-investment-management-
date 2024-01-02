import { fireEvent, queryByTestId, render, screen } from "@testing-library/react";
import ProductInformation from "../components/pages/term-deposit/forms/customer-eligibilty-criteria";
import { renderWithProviders } from "../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import ProductDetail, { DebitCreditTable } from "../components/summary/ProductDetail";
import { Provider } from "react-redux";
import { store } from "../config/store";
import responses from "../__mocks__/api/responses.json"
import React from "react";

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
const detailTwo = {
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
    "interestRateRangeType": 1,
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

  it("Renders without crashing", () => {
    // renderWithProviders(<ProductDetail detail={{id: "continue"}}/>)
    const form = renderWithProviders(<ProductDetail isOpen={true} detail={details} />)
    expect(screen.getByText("Term Deposit Product Details")).toBeInTheDocument();
    expect(screen.getByText("Slogan")).toBeInTheDocument();
  })
  it("Renders without crashing", () => {
    // renderWithProviders(<ProductDetail detail={{id: "continue"}}/>)
    const form = renderWithProviders(<ProductDetail isOpen={true} detail={detailTwo} />)
    expect(screen.getByText("Term Deposit Product Details")).toBeInTheDocument();
    expect(screen.getByText("Slogan")).toBeInTheDocument();
  })

  it('should render data rows correctly', () => {
    // Arrange
    const dataTab = [
      {
        creditBalance: 1,
        glAccountType: 0,
        accountName: "Account 1",
      },
      {
        creditBalance: 2,
        glAccountType: 1,
        accountName: "Account 2",
      },
    ];
    const { getByText } = render(<DebitCreditTable dataTab={dataTab} />);

    // Act

    // Assert
    dataTab.forEach((data) => {
      const creditBalanceElement = getByText(data.creditBalance.toString());

      const accountNameElement = getByText(data.accountName);

      expect(creditBalanceElement).toBeInTheDocument();
      expect(accountNameElement).toBeInTheDocument();
    });
  });

  // The function handles cases where there is no previous data available.
  it('should handle no previous data available', () => {
    // Arrange
    const detail = {
      productInfo: {
        productName: 'Test Product',
        slogan: 'Test Slogan',
        description: 'Test Description',
        currency: 'USD',
      },
      pricingConfiguration: {},
      customerEligibility: {},
      liquidation: {},
      productGlMappings: [],
      productCode: '',
    };
    const previousData = null;

    // Act
    render(<ProductDetail detail={details} previousData={previousData} />);

    // Assert
    expect(screen.getByText('Draft Box updated')).toBeInTheDocument();
    expect(screen.queryByText('Draft slogan updat')).toBeInTheDocument();
    expect(screen.queryByText('Draft description example update')).toBeInTheDocument();
    // expect(screen.queryByText('NGN')).toBeInTheDocument();
  });

  // The function renders the product details correctly.
})


describe("DebitCreditable", () => {
  it('should render product details correctly', () => {
    // Arrange
    const previousData = null;

    // Act
    const page = render(<ProductDetail detail={details} previousData={previousData} />);
    // Assert
    expect(screen.getByText('Draft Box updated')).toBeInTheDocument();
    expect(screen.getByText('Draft slogan updat')).toBeInTheDocument();
    // expect(screen.getByText('NGN')).toBeInTheDocument();
    expect(screen.getByText('15 Dec 2023 - 31 Dec 2023')).toBeInTheDocument();
    expect(screen.getByText('Individual')).toBeInTheDocument();
    expect(screen.getByText('NGN 1,000.00 - NGN 1,200,000.00')).toBeInTheDocument();
  });
  it('should display an empty table when dataTab prop is an empty array', () => {
    render(<DebitCreditTable dataTab={[]} />);
    expect(screen.queryAllByTestId("table-data").length).toBe(0)
  });

  it('should display the correct S|N value for each row', () => {
    const dataTab = [
      {
        creditBalance: 1,
        glAccountType: 0,
        accountName: "Account 1",
      },
      {
        creditBalance: 2,
        glAccountType: 1,
        accountName: "Account 2",
      },
      {
        creditBalance: 3,
        glAccountType: 2,
        accountName: "Account 3",
      },
    ];

    render(<DebitCreditTable dataTab={dataTab} />);

    const rows = screen.getAllByTestId('table-data');
    dataTab.forEach(el => {
      screen.getByText(el.accountName);
    })
  });
})