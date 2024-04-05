import { render } from "@testing-library/react"
import ProductToGLMapping from "../../../../../../components/pages/term-deposit/forms/gl_mapping_events/ProductToGLMapping"
import { renderWithProviders } from "../../../../../../__mocks__/api/Wrapper"


jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", category: "investments", tab: "" })]),
    useParams: jest.fn().mockReturnValue({ process: "continue" }),
    useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));

jest.mock("../../../../../../api", () => ({
    useGetApplicableChargesQuery: jest.fn().mockReturnValue({ data: {}, isLoading: false, isSuccess: true, isError: false }),
    useGetApplicableTaxesQuery: jest.fn().mockReturnValue({ data: {}, isLoading: false, isSuccess: true, isError: false }),
    useGetGlClassQuery: jest.fn().mockReturnValue({ data: {}, isLoading: false, isSuccess: true, isError: false }),
    useGetAccountsQuery: jest.fn().mockReturnValue({ data: {}, isLoading: false, isSuccess: true, isError: false }),
    useGetChargeQuery: jest.fn().mockReturnValue({ data: {}, isLoading: false, isSuccess: true, isError: false }),
    useGetTaxQuery: jest.fn().mockReturnValue({ data: {}, isLoading: false, isSuccess: true, isError: false }),
}))

describe("ProductToGLMapping", () => {
    const formData = {
        id: 123,
        productInfo: {
            productName: "",
            slogan: "",
            description: "",
            startDate: new Date(),
            endDate: null,
            currency: "Nigerian naira",
            currencyCode: "NGN",
        },
        customerEligibility: {
            ageGroupMin: 0,
            ageGroupMax: null,
            requireDocument: [],
            customerType: [],
            customerCategory: null,
        },
        principalDepositChargesAndTaxes: {
            applicableCharges: [],
            applicableTaxes: [],
        },
        partLiquidationChargesAndTaxes: {
            applicableCharges: [],
            applicableTaxes: [],
        },
        earlyLiquidationChargesAndTaxes: {
            applicableCharges: [],
            applicableTaxes: [],
        },
        investmentLiquidationChargesAndTaxes: {
            applicableCharges: [],
            applicableTaxes: [],
        },
        pricingConfiguration: {
            interestRateRangeType: 0,
            applicableTenorMin: null,
            applicableTenorMinUnit: 1,
            applicableTenorMax: null,
            applicableTenorMaxUnit: 1,
            applicablePrincipalMin: null,
            applicablePrincipalMax: null,
            interestComputationMethod: 2,
            interestRateConfigModels: [
                {
                    index: 0,
                    min: null,
                    max: null,
                    principalMin: null,
                    principalMax: null,
                    tenorMin: null,
                    tenorMinUnit: 1,
                    tenorMax: null,
                    tenorMaxUnit: 1,
                },
            ],
            interestRateMin: null,
            interestRateMax: null,
        },
        liquidation: {
            part_AllowPartLiquidation: false,
            part_MaxPartLiquidation: null,
            part_RequireNoticeBeforeLiquidation: false,
            part_NoticePeriod: 1,
            part_NoticePeriodUnit: 1,
            part_LiquidationPenalty: 0,
            part_LiquidationPenaltyPercentage: null,
            part_SpecificCharges: [],
            part_SpecialInterestRate: null,
            early_AllowEarlyLiquidation: false,
            early_RequireNoticeBeforeLiquidation: false,
            early_NoticePeriod: null,
            early_NoticePeriodUnit: 1,
            early_LiquidationPenalty: 0,
            early_LiquidationPenaltyPercentage: null,
            eary_SpecialInterestRate: null,
            early_SpecificCharges: [],
        },
        productGlMappings: [],
        interestComputationMethod: 2,
        TermDepositLiabilityAccount: "",
        InterestAccrualAccount: "",
        InterestExpenseAccount: "",
        isDraft: false,
        productType: 0,
    };
    it("Should render", () => {
        renderWithProviders(<ProductToGLMapping formData={formData} initiateDraft={jest.fn()}
            proceed={jest.fn()} setDisabled={jest.fn()} setFormData={jest.fn()} key={2} />)
    })
})