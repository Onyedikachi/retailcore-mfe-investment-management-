import {render, screen, waitFor} from "@testing-library/react";
import Preview, { handleErrorMessage, handleSuccessMessage } from "../../../../../components/pages/term-deposit/forms/preview"
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
}));
jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(jest.fn());

const fData = {
    productInfo: {
      productName: "",
      slogan: "",
      description: "",
      startDate: new Date(),
      endDate: null,
      currency: "NGN",
    },
    customerEligibility: {
      ageGroupMin: 0,
      ageGroupMax: null,
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

describe("Preview", () => {
    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "5678" })]);

        jest.spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ process: "create" })
    });
    it("Renders without crashing", async () => {
        renderWithProviders(<Preview formData={fData} />)
        await waitFor(() => {
          expect(screen.getByTestId("preview")).toBeInTheDocument();
          screen.debug();
        })
    })
})

describe("handleSuccess", () => {
  const setSuccessText = jest.fn();
  const setIsSuccessOpen = jest.fn();

  it("Sets success message if isSuccess and role === superadmin", () => {
    handleSuccessMessage(true, setSuccessText, setIsSuccessOpen, "superadmin");
    expect(setSuccessText).toBeCalledWith("Product created successfully")
    expect(setIsSuccessOpen).toBeCalledWith(true)
  })
  it("Sets success message if isSuccess is false and role === superadmin", () => {
    handleSuccessMessage(false, setSuccessText, setIsSuccessOpen, "superadmin");
    expect(setSuccessText).toBeCalledWith("Product modified successfully")
    expect(setIsSuccessOpen).toBeCalledWith(true)
  })
  it("Sets success message if role !== superadmin", () => {
    handleSuccessMessage(true, setSuccessText, setIsSuccessOpen, "admin");
    expect(setSuccessText).toBeCalledWith("Product creation request submitted for approval")
    expect(setIsSuccessOpen).toBeCalledWith(true)
  })
})

describe("handleErrorMessage", () => {
  const setFailedText = jest.fn();
  const setFailedSubtext = jest.fn();
  const setFailed = jest.fn();

  it ("Sets error message if isError === true", () => {
    handleErrorMessage({message : {message : "Error message"}}, {}, {}, true, setFailedText, setFailedSubtext, setFailed)
    expect(setFailedText).toBeCalledWith("Product creation request failed")
    expect(setFailedSubtext).toBeCalledWith("Error message")
    expect(setFailed).toBeCalledWith(true)
  })

  it ("Sets error message if isError === false", () => {
    handleErrorMessage({message : {message : "Error message"}}, {}, {}, false, setFailedText, setFailedSubtext, setFailed)
    expect(setFailedText).toBeCalledWith("Product modification request failed")
    expect(setFailedSubtext).toBeCalledWith("Error message")
    expect(setFailed).toBeCalledWith(true)
  })

})