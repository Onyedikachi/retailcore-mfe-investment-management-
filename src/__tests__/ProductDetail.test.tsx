import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation from "../components/pages/term-deposit/forms/customer-eligibilty-criteria";
import {renderWithProviders} from "../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import ProductDetail from "../components/summary/ProductDetail";
import { Provider } from "react-redux";
import { store } from "../config/store";

describe("ProductDetail", () => {
    const details = {
        productInfo: {
          productName: "",
          slogan: "",
          description: "",
          startDate: new Date(),
          endDate: null,
          currency: "NGN",
          customerCategory: null,
        },
        customerEligibility: {
          ageGroupMin: 0,
          ageGroupMax: 0,
          requireDocument: [],
          customerType: [],
          customerCategory: null,
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          applicableTenorMin: 0,
          applicableTenorMinUnit: 1,
          applicableTenorMax: 0,
          applicableTenorMaxUnit: 1,
          applicablePrincipalMin: 0,
          applicablePrincipalMax: 0,
          interestComputationMethod: 2,
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
          interestRateMax: 0,
        },
        liquidation: {
          part_AllowPartLiquidation: false,
          part_MaxPartLiquidation: 0,
          part_RequireNoticeBeforeLiquidation: false,
          part_NoticePeriod: 0,
          part_NoticePeriodUnit: 1,
          part_LiquidationPenalty: 0,
          part_LiquidationPenaltyPercentage: 0,
          part_SpecificCharges: [],
          part_specialInterestRate: 0,
          early_AllowEarlyLiquidation: false,
          early_RequireNoticeBeforeLiquidation: false,
          early_NoticePeriod: 0,
          early_NoticePeriodUnit: 1,
          early_LiquidationPenalty: 0,
          early_LiquidationPenaltyPercentage: 0,
          early_specialInterestRate: 0,
          early_SpecificCharges: [],
        },
        productGlMappings: [],
        interestComputationMethod: 2,
        TermDepositLiabilityAccount: "",
        InterestAccrualAccount: "",
        InterestExpenseAccount: "",
        isDraft: false,
        productType: 0,
      }

    it("Works", () => {
        // renderWithProviders(<ProductDetail detail={{id: "continue"}}/>)
        const form = renderWithProviders(<ProductDetail i detail={details}/>)
        expect(screen.getByText("Term Deposit Product Details")).toBeInTheDocument();
        expect(screen.getByText("Slogan")).toBeInTheDocument();
    })
})