import { render, screen, waitFor } from "@testing-library/react"
import MessagesComponent from "../components/table/MessagesComponent";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../__mocks__/api/Wrapper"


const user = userEvent

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

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


const navigate = jest.fn();
jest.mock("../__mocks__/api/mockReactRouterDom");
jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useLocation: jest.fn().mockResolvedValue({}),
}));

jest
    .spyOn(require("react-router-dom"), "useNavigate")
    .mockReturnValue(navigate);

describe("MessagesComponent", () => {
    window.ResizeObserver = ResizeObserver;
    const setIsOpen = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const handleConfirm = jest.fn();
    const setIsSuccessOpen = jest.fn();


    it("renders confirm message without error", () => {
        //@ts-ignore
        render(<MessagesComponent isConfirmOpen={true}
            confirmText={"Do you want to do this"} setIsConfirmOpen={setIsConfirmOpen} handleConfirm={handleConfirm} />)
        expect(screen.getByText("Do you want to do this")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Confirm")).toBeInTheDocument();
    })

    it("calls handleConfirm and calls setIsConfirmOpen with false when Confirm button is clicked", async () => {
        //@ts-ignore
        render(<MessagesComponent isConfirmOpen={true}
            confirmText={"Do you want to do this"} setIsConfirmOpen={setIsConfirmOpen} handleConfirm={handleConfirm} />)
        const confirmButton = screen.getByTestId("submit-btn")
        await userEvent.click(confirmButton);
        expect(setIsConfirmOpen).toBeCalledWith(false);
        expect(handleConfirm).toBeCalled();
    })
    it("calls setIsConfirmOpen with false when cancel button is clicked", async () => {
        //@ts-ignore
        render(<MessagesComponent isConfirmOpen={true}
            confirmText={"Do you want to do this"} setIsConfirmOpen={setIsConfirmOpen} handleConfirm={handleConfirm} />)
        const cancelButton = screen.getByTestId("cancel-btn-2")
        await userEvent.click(cancelButton);
        expect(setIsConfirmOpen).toBeCalledWith(false);
    })


    it("Renders success message", async () => {

        const modal = render(
            // @ts-ignore
            <MessagesComponent successText={"Operation successful"} isSuccessOpen={true} setIsSuccessOpen={setIsSuccessOpen} />
        )
        expect(modal).toMatchSnapshot();
    })

    it("returns user to dashboard when user clicks on the dashboard link", async () => {

        const modal = render(
            // @ts-ignore
            <MessagesComponent successText={"Operation successful"} isSuccessOpen={true} setIsSuccessOpen={setIsSuccessOpen} />
        )
        expect(modal).toMatchSnapshot();
        const dashBoardButton = screen.getByTestId("dashboard-link");
        await userEvent.click(dashBoardButton);
        expect(navigate).toBeCalledWith("/product-factory/investment?category=requests")
    })

    it("Renders Failure message", async () => {
        const setFailed = jest.fn();
        // @ts-ignore
        render(<MessagesComponent isFailed={true} failedText={"Operation failed"} failedSubText={"Did not succeed"} setFailed={setFailed} />)
        expect(screen.getByText("Operation failed")).toBeInTheDocument();
        expect(screen.getByText("Did not succeed")).toBeInTheDocument();


        const dashBoardButton = screen.getByTestId("dashboard-link");
        await userEvent.click(dashBoardButton);
        expect(navigate).toBeCalledWith("/product-factory/investment?category=requests")
    })

    it("Renders Detail component", () => {
        const setFailed = jest.fn();
        const handleAction = jest.fn()
        // @ts-ignore
        renderWithProviders(<MessagesComponent detail={details} isDetailOpen={true} setDetailOpen={true} handleAction={handleAction} />)
        waitFor(() => {
            expect(screen.getByText("Term Deposit Product Details")).toBeInTheDocument();
            expect(screen.getByText("Slogan")).toBeInTheDocument();
        })
    })

    it("Renders Deactivation modals", () => {
        const setIsDeactivationOpen = jest.fn()
        // @ts-ignore
        const modal = renderWithProviders(<MessagesComponent detail={details} isDeactivationOpen={true} setIsDeactivationOpen={setIsDeactivationOpen} />);
        expect(screen.getByText("Provide justification for deactivation")).toBeInTheDocument();
        expect(screen.getByText("Upload Supporting Documents")).toBeInTheDocument();
        expect(screen.getByText("Click to upload")).toBeInTheDocument();
        expect(screen.getByText("or drag and drop .extension")).toBeInTheDocument();
        expect(modal).toMatchSnapshot();
    })

    it("Renders loading while deleteLoading == true", () => {
        // @ts-ignore
        render(<MessagesComponent deleteLoading={true} />)
        expect(screen.getByText("Submitting")).toBeInTheDocument();
    })

    it("Renders loading while deleteLoading == true", () => {
        // @ts-ignore
        render(<MessagesComponent activateIsLoading={true} />)
        expect(screen.getByText("Submitting")).toBeInTheDocument();
    })

})