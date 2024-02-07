import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithProviders } from "../../__mocks__/api/Wrapper";
import ProductDetail from "../../components/modals/ProductDetail";
import { InvestmentContext, AppContext } from "../../utils/context";
import React from "react";
import {userEvent} from "@testing-library/user-event"

const details = {
  id: "4473a62d-5e40-4aa0-8bf4-3c179004c35b",
  productCode: "f041",
  state: 2,
  recentUpdated: false,
  recentlyUpdatedMeta: null,
  productInfo: {
    productName: "Free Loan",
    slogan: "LOADNF",
    description: "tHIS IS A FREE LOAN",
    startDate: "2023-12-15T00:00:00Z",
    endDate: null,
    currency: "NGN",
  },
  customerEligibility: {
    customerCategory: 0,
    customerType: [],
    ageGroupMin: 0,
    ageGroupMax: 40,
    requireDocument: [
      {
        id: "aee02b4b-94eb-574f-1407-73aac2169577",
        name: "Signature",
      },
      {
        id: "1479ef2b-94fd-8445-ed54-f46d91f951f2",
        name: "Valid Identification document",
      },
      {
        id: "8abd6a81-5a40-d049-dbaa-fc43e7afbbfc",
        name: "Proof of residential address",
      },
    ],
  },
  pricingConfiguration: {
    applicableTenorMin: 0,
    applicableTenorMinUnit: 1,
    applicableTenorMax: 1000,
    applicableTenorMaxUnit: 1,
    applicablePrincipalMin: 0,
    applicablePrincipalMax: 20000000,
    interestRateRangeType: 2,
    interestRateConfigModels: [
      {
        min: 0,
        max: 0,
        principalMin: 0,
        principalMax: 0,
        tenorMin: 0,
        tenorMinUnit: 1,
        tenorMax: 0,
        tenorMaxUnit: 1,
      },
    ],
    interestRateMin: 0,
    interestRateMax: 20,
    interestComputationMethod: 2,
  },
  liquidation: {
    part_AllowPartLiquidation: true,
    part_MaxPartLiquidation: 12,
    part_RequireNoticeBeforeLiquidation: true,
    part_NoticePeriod: 0,
    part_NoticePeriodUnit: 1,
    part_LiquidationPenalty: 0,
    part_LiquidationPenaltyPercentage: 0,
    part_SpecificCharges: [],
    early_AllowEarlyLiquidation: false,
    early_RequireNoticeBeforeLiquidation: true,
    early_NoticePeriod: 0,
    early_NoticePeriodUnit: 1,
    early_LiquidationPenalty: 0,
    early_LiquidationPenaltyPercentage: 0,
    early_SpecificCharges: [],
  },
  productGlMappings: [
    {
      accountName: "Test asset primum ledger 100",
      accountId: "e5f1cfff-b165-40db-9c4f-d05b41cd334a",
      glAccountType: 0,
    },
    {
      accountName: "Test asset primum ledger 21",
      accountId: "2e018e63-a752-4667-9b64-1c3c93c76f50",
      glAccountType: 1,
    },
    {
      accountName: "Test asset primum ledger 11",
      accountId: "35a69d04-c6bf-43fc-bc78-10342c65e20a",
      glAccountType: 2,
    },
  ],
  isDraft: false,
  productType: 0,
};

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

describe("ProductDetail", () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  it("Show spinner when loading", async () => {
    const val = renderWithProviders(
      <ProductDetail
        handleClick={jest.fn()}
        setIsOpen={jest.fn()}
        isOpen={true}
        detail={details}
      />
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
  it("Show spinner when loading", async () => {
    const val = renderWithProviders(
      <ProductDetail
        handleClick={jest.fn()}
        setIsOpen={jest.fn()}
        isOpen={true}
        detail={details}
      />
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
  it("Close button calls setIsOpen", async () => {
    let isOpen = true;
    const setIsOpen =jest.fn();
    const val = renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <ProductDetail handleClick={jest.fn()} setIsOpen={setIsOpen} isOpen={true} detail={details} />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    )
    await waitForElementToBeRemoved(screen.getByTestId("loading-spinner"))
    const closeBtn = screen.getByTestId("close-btn");
    expect(setIsOpen).not.toHaveBeenCalled();
    await userEvent.click(closeBtn);
    expect(setIsOpen).toHaveBeenCalledWith(false); 
  })
  
  it("Modify button calls handleClick", async () => {
    let isOpen = true;
    const setIsOpen =jest.fn();
    const handleClick = jest.fn();
    const val = renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS","CREATE_INVESTMENT_PRODUCT"
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <ProductDetail handleClick={handleClick} setIsOpen={setIsOpen} isOpen={true} detail={details} />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    )
    await waitForElementToBeRemoved(screen.getByTestId("loading-spinner"))
    const modifyBtn = screen.getByTestId("modify");
    expect(handleClick).not.toHaveBeenCalled();
    await userEvent.click(modifyBtn);
    expect(handleClick).toHaveBeenCalledWith("modify", undefined); 
  })
  it("deactivate button calls handleClick", async () => {
    let isOpen = true;
    const setIsOpen =jest.fn();
    const handleClick = jest.fn();
    const val = renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <ProductDetail handleClick={handleClick} setIsOpen={setIsOpen} isOpen={true} detail={details} />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    )
    await waitForElementToBeRemoved(screen.getByTestId("loading-spinner"))
    const deactivateBtn = screen.getByTestId("deactivate-btn");
    expect(handleClick).not.toHaveBeenCalled();
    await userEvent.click(deactivateBtn);
    expect(handleClick).toHaveBeenCalledWith("deactivate", undefined); 
  })
  // it("activate button calls handleClick", async () => {
  //   let isOpen = true;
  //   const setIsOpen =jest.fn();
  //   const handleClick = jest.fn();
  //   const val = renderWithProviders(
  //     <InvestmentContext.Provider value={{}}>
  //       <AppContext.Provider
  //         value={{
  //           permissions: [
  //             "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
  //           ],
  //           role: "superadmin",
  //           setRole: jest.fn(),
  //         }}
  //       >
  //         <ProductDetail handleClick={handleClick} setIsOpen={setIsOpen} isOpen={true} detail={details} />
  //       </AppContext.Provider>
  //     </InvestmentContext.Provider>
  //   )
  //   await waitForElementToBeRemoved(screen.getByTestId("loading-spinner"))
  //   const activateBtn = screen.getByTestId("activate-btn");
  //   expect(handleClick).not.toHaveBeenCalled();
  //   await userEvent.click(activateBtn);
  //   expect(handleClick).toHaveBeenCalledWith("activate", undefined); 
  // })

  it("Shows nothng when setOpen is false", () => {
    const val = renderWithProviders(
      <ProductDetail
        handleClick={jest.fn()}
        setIsOpen={jest.fn()}
        isOpen={false}
        detail={details}
      />
    );

    expect(val).toMatchSnapshot();
  });
});
