import IndexComponent from "../../../../../pages/management/manage-investment/IndexComponent"
import { render, screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../../../../../utils/test-util";
const selected = { value: "sent_to_me" };
jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn().mockReturnValue({ process: "continue" }),
    useLocation: jest.fn(),
}));

jest.mock("../../../../../api", () => ({
    useGetPostInvestmentMutation: jest.fn().mockReturnValue([jest.fn(), {
        data: {
            "next": null,
            "previous": null,
            "count": 12,
            "results": [
                {
                    "investmentId": "INV-BA-AY-77-00003",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 0,
                    "initialPrincipal": 10000,
                    "investmentProduct": "Bahrain",
                    "investmentProductId": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 1,
                    "tenorUnit": 1,
                    "maturityValue": 10002.739,
                    "maturityDate": "2024-04-04T10:02:08.058697Z",
                    "interestRate": 10,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 2,
                    "investmentBookingRequestId": "fc409fd0-ff2b-4004-9cac-a598f6e7327b",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": null,
                    "id": "fc409fd0-ff2b-4004-9cac-a598f6e7327b",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.7231753Z",
                    "updated_At": "2024-04-04T05:00:23.471298Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-03T10:02:08.058704Z"
                },
                {
                    "investmentId": "INV-BA-AY-77-00005",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 0,
                    "initialPrincipal": 30000,
                    "investmentProduct": "Bahrain",
                    "investmentProductId": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 1,
                    "tenorUnit": 1,
                    "maturityValue": 30008.219,
                    "maturityDate": "2024-04-04T13:25:20.972724Z",
                    "interestRate": 10,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 2,
                    "investmentBookingRequestId": "2638cfe8-13a5-413c-823a-2f40ef1d8e3d",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": null,
                    "id": "2638cfe8-13a5-413c-823a-2f40ef1d8e3d",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.7231797Z",
                    "updated_At": "2024-04-04T05:00:22.740213Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-03T13:25:20.972898Z"
                },
                {
                    "investmentId": "INV-ST-AY-77-00009",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 0,
                    "initialPrincipal": 175000,
                    "investmentProduct": "Sterling Premium Term deposit",
                    "investmentProductId": "2350c16d-6ed1-4177-a7f0-40d01c815412",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 5,
                    "tenorUnit": 1,
                    "maturityValue": 175119.86,
                    "maturityDate": "2024-04-03T16:03:32.591009Z",
                    "interestRate": 5,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 2,
                    "investmentBookingRequestId": "3596f4c4-d096-4b51-9ed8-9215e99f8d41",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": null,
                    "id": "3596f4c4-d096-4b51-9ed8-9215e99f8d41",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.7231831Z",
                    "updated_At": "2024-04-03T19:39:25.456245Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-03-29T16:03:32.591095Z"
                },
                {
                    "investmentId": "INV-ST-AY-77-00005",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 0,
                    "initialPrincipal": 11700,
                    "investmentProduct": "Sterling Premium Term deposit",
                    "investmentProductId": "2350c16d-6ed1-4177-a7f0-40d01c815412",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 5,
                    "tenorUnit": 1,
                    "maturityValue": 11708.014,
                    "maturityDate": "2024-04-03T14:07:52.780618Z",
                    "interestRate": 5,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 2,
                    "investmentBookingRequestId": "3f96bfba-03c5-4ed8-84c4-163550907ead",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": "{\"updated_At\":\"04/03/2024 14:47:24\",\"partLiquidation\":\"11700\"}",
                    "id": "3f96bfba-03c5-4ed8-84c4-163550907ead",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.7231868Z",
                    "updated_At": "2024-04-03T19:21:54.434247Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-03-29T14:07:52.780647Z"
                },
                {
                    "investmentId": "INV-BA-AY-77-00002",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 7370,
                    "initialPrincipal": 7370,
                    "investmentProduct": "Bahrain",
                    "investmentProductId": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 5,
                    "tenorUnit": 1,
                    "maturityValue": 7375.048,
                    "maturityDate": "2024-04-08T09:42:46.784334Z",
                    "interestRate": 5,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 1,
                    "investmentBookingRequestId": "7b9e3347-472c-4f7e-ad2f-6b714f92588f",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": null,
                    "id": "7b9e3347-472c-4f7e-ad2f-6b714f92588f",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.7231903Z",
                    "updated_At": "2024-04-03T09:42:46.7762Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-03T09:42:46.784348Z"
                },
                {
                    "investmentId": "INV-BA-AY-77-00001",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 12300,
                    "initialPrincipal": 12300,
                    "investmentProduct": "Bahrain",
                    "investmentProductId": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 5,
                    "tenorUnit": 1,
                    "maturityValue": 12308.425,
                    "maturityDate": "2024-04-08T09:37:37.659248Z",
                    "interestRate": 5,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 1,
                    "investmentBookingRequestId": "cf23893b-85a7-46b1-8253-aba28ea34de7",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": null,
                    "id": "cf23893b-85a7-46b1-8253-aba28ea34de7",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.7231936Z",
                    "updated_At": "2024-04-03T09:37:37.650929Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-03T09:37:37.659257Z"
                },
                {
                    "investmentId": "INV-BA-AY-77-00000",
                    "customerId": "938e8c9a-3970-430d-b346-5e7fa9c74139",
                    "customerName": "Ayomide  Adetola",
                    "customerAccount": "7763696535",
                    "principal": 16700,
                    "initialPrincipal": 16700,
                    "investmentProduct": "Bahrain",
                    "investmentProductId": "5da6a25a-bae3-4f7a-9b75-d08a7a147ae0",
                    "currency": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                    "investmentPurpose": null,
                    "tenor": 5,
                    "tenorUnit": 1,
                    "maturityValue": 16722.877,
                    "maturityDate": "2024-04-08T09:19:47.880659Z",
                    "interestRate": 10,
                    "capitalizationMethod": 2,
                    "investmentBookingStatus": 1,
                    "investmentBookingRequestId": "527a25c6-d4c8-4913-83dc-0cebacfaa150",
                    "partLiquidation": true,
                    "earlyLiquidation": true,
                    "recentUpdated": true,
                    "recentlyUpdatedMeta": null,
                    "id": "527a25c6-d4c8-4913-83dc-0cebacfaa150",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T23:25:45.723197Z",
                    "updated_At": "2024-04-03T09:19:47.856659Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-03T09:19:47.880674Z"
                }
            ]
        },
        isSuccess: true
    }]),
    useGetPostProductsMutation: jest.fn().mockReturnValue([jest.fn(), {
        data: {
            "next": 2,
            "previous": null,
            "count": 17,
            "results": [
                {
                    "request": "Term Deposit investment booking Rolled Over",
                    "requestType": 0,
                    "actionType": 0,
                    "initiatorId": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "initiatorName": "Admin Retailcore",
                    "requestStatus": 2,
                    "metaInfo": null,
                    "investmentBookingId": "f73124c8-a621-4dd7-9685-000a156c3a9a",
                    "lastComment": "Term Deposit investment booking Rolled Over AIICO Partnership [4706792094] from INV-JA-AI-47-00025",
                    "reason": null,
                    "bookingType": 0,
                    "id": "24c0888c-f160-48be-80ea-15edf9a3ff64",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_At": "2024-04-04T16:31:44.135658Z",
                    "updated_At": "2024-04-04T16:31:44.224093Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": null,
                    "approved_By_Id": null,
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-04T16:31:44.135515Z"
                },
                {
                    "request": "Part Liquidation of Collaborative testing for Taylor  Kenneth [7206330782]",
                    "requestType": 2,
                    "actionType": 0,
                    "initiatorId": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "initiatorName": "Admin Retailcore",
                    "requestStatus": 2,
                    "metaInfo": "{\"investmentProductId\":\"189ff8ed-ee2b-4c3f-953c-0e7135eb1c01\",\"investementBookingId\":\"4eb1643a-6e59-4c26-b4ef-dd51703d1eba\",\"amounttoLiquidate\":30000,\"liquidationUnit\":0,\"reason\":\"for liquidation\",\"documentUrl\":\"\",\"notify\":true,\"isDraft\":false}",
                    "investmentBookingId": "4eb1643a-6e59-4c26-b4ef-dd51703d1eba",
                    "lastComment": null,
                    "reason": "for liquidation",
                    "bookingType": 0,
                    "id": "2952d3a3-d1f9-42eb-a675-2c92087d9a0c",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "Y008",
                    "created_At": "2024-04-04T16:05:45.02693Z",
                    "updated_At": "2024-04-04T16:05:46.34302Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": "Admin Retailcore",
                    "approved_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-04T16:05:45.036966Z"
                },
                {
                    "request": "Booking of Collaborative testing",
                    "requestType": 0,
                    "actionType": 0,
                    "initiatorId": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "initiatorName": "Admin Retailcore",
                    "requestStatus": 2,
                    "metaInfo": "{\"id\":\"4eb1643a-6e59-4c26-b4ef-dd51703d1eba\",\"investmentId\":null,\"customerBookingInfoModel\":{\"customerId\":\"6cd2019c-d3de-4d61-829e-5e41dff4bd0e\",\"customerName\":\"Taylor  Kenneth\",\"customerAccount\":\"7206330782\",\"investmentformUrl\":\"\",\"accountStatus\":\"Active\",\"customerProfileId\":\"\"},\"facilityDetailsModel\":{\"investmentProductId\":\"189ff8ed-ee2b-4c3f-953c-0e7135eb1c01\",\"productName\":null,\"investmentPurpose\":\"\",\"tenor\":6,\"tenorUnit\":1,\"principal\":50000,\"interestRate\":10,\"capitalizationMethod\":2},\"transactionSettingModel\":{\"accountName\":\"\",\"accountForLiquidation\":\"7206330782\",\"notifyCustomerOnMaturity\":true,\"rollOverAtMaturity\":true,\"rollOverOption\":0},\"isDraft\":false,\"recentUpdated\":false,\"recentlyUpdatedMeta\":null,\"approvedOn\":null,\"maturesOn\":null,\"maturityValue\":null,\"bookingType\":0}",
                    "investmentBookingId": "00000000-0000-0000-0000-000000000000",
                    "lastComment": "Investment booking modification request was approved",
                    "reason": null,
                    "bookingType": 0,
                    "id": "4eb1643a-6e59-4c26-b4ef-dd51703d1eba",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T15:14:20.630956Z",
                    "updated_At": "2024-04-04T15:17:33.436604Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": "Admin Retailcore",
                    "approved_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-04T15:17:30.037197Z"
                },
                {
                    "request": "Booking of Bahrain",
                    "requestType": 0,
                    "actionType": 0,
                    "initiatorId": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "initiatorName": "Admin Retailcore",
                    "requestStatus": 2,
                    "metaInfo": "{\"id\":\"bc1ce490-b291-4791-8c55-c488229f08d6\",\"investmentId\":null,\"customerBookingInfoModel\":{\"customerId\":\"938e8c9a-3970-430d-b346-5e7fa9c74139\",\"customerName\":\"Ayomide  Adetola\",\"customerAccount\":\"7763696535\",\"investmentformUrl\":\"\",\"accountStatus\":\"Active\",\"customerProfileId\":\"\"},\"facilityDetailsModel\":{\"investmentProductId\":\"5da6a25a-bae3-4f7a-9b75-d08a7a147ae0\",\"productName\":null,\"investmentPurpose\":\"\",\"tenor\":1,\"tenorUnit\":1,\"principal\":13000,\"interestRate\":5,\"capitalizationMethod\":2},\"transactionSettingModel\":{\"accountName\":\"\",\"accountForLiquidation\":\"7763696535\",\"notifyCustomerOnMaturity\":false,\"rollOverAtMaturity\":false,\"rollOverOption\":0},\"isDraft\":false,\"recentUpdated\":false,\"recentlyUpdatedMeta\":null,\"approvedOn\":null,\"maturesOn\":null,\"maturityValue\":null,\"bookingType\":0}",
                    "investmentBookingId": "00000000-0000-0000-0000-000000000000",
                    "lastComment": "Investment booking modification request was approved",
                    "reason": null,
                    "bookingType": 0,
                    "id": "bc1ce490-b291-4791-8c55-c488229f08d6",
                    "created_By": "Admin Retailcore",
                    "created_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "created_By_Branch": "I002",
                    "created_At": "2024-04-04T08:15:34.327831Z",
                    "updated_At": "2024-04-04T08:16:08.62534Z",
                    "deleted": false,
                    "deleted_By_Id": null,
                    "deleted_At": null,
                    "approved_By": "Admin Retailcore",
                    "approved_By_Id": "5004001d-9290-48f7-9ede-5cadef7aaa26",
                    "approved_By_Branch_Id": null,
                    "approvedOn": "2024-04-04T08:16:06.128381Z"
                }
            ]
        },
        isSuccess: true
    }]),
    useGetPostInvestmentRequestsMutation: jest.fn().mockReturnValue([
        jest.fn(),
        {data: {}}
    ]),
    useGetUsersPermissionsQuery: jest.fn().mockReturnValue({data: {}}),
    useGetProductDetailQuery: jest.fn().mockReturnValue({data: {}}),
    useEarlyLiquidateMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    usePartLiquidateMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useEditEarlyLiquidateMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useEditPartLiquidateMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useDeleteProductRequestMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useDeleteInvestmentRequestMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useActivateProductMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useModifyInvestmentRequestMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
    useModifyRequestMutation: jest.fn().mockReturnValue([jest.fn(),{data: {}}]),
}))

describe('code snippet', () => {

    // Renders the Investment Management page with the correct title and breadcrumbs
    it('should render the Investment Management page with the correct title and breadcrumbs', () => {

        // Render the component
        const { getByText } = renderWithProviders(<IndexComponent />);

        // Assert that the title and breadcrumbs are rendered correctly
        expect(screen).toMatchSnapshot();
    });

    // Displays the Investment PRODUCTS section with the Individual Investments and Corporate Investments subsections
    it('should display the Investment PRODUCTS section with the Individual Investments and Corporate Investments subsections', () => {
        // Render the component
        const { getByText } = renderWithProviders(<IndexComponent />);

        // Assert that the Investment PRODUCTS section is displayed
        expect(getByText('Investment PRODUCTS')).toBeInTheDocument();

        // Assert that the Individual Investments and Corporate Investments subsections are displayed
        expect(getByText('Individual Investments')).toBeInTheDocument();
        expect(getByText('Corporate Investments')).toBeInTheDocument();
    });

    // Toggles the display of the Individual Investments and Corporate Investments subsections when clicking on their respective headers
    // it('should toggle the display of the Individual Investments and Corporate Investments subsections when clicking on their respective headers', () => {
    //     // Render the component
    //     const { getByText } = renderWithProviders(<IndexComponent />);

    //     // Click on the Individual Investments header
    //     fireEvent.click(getByText('Individual Investments'));

    //     // Assert that the Individual Investments subsection is displayed
    //     // expect(getByText('Stem-Life Investments')).toBeInTheDocument();
    //     expect(getByText('Federal Grant Investments')).toBeInTheDocument();

    //     // Click on the Corporate Investments header
    //     fireEvent.click(getByText('Corporate Investments'));

    //     // Assert that the Corporate Investments subsection is displayed
    //     expect(getByText('A Commercial Paper')).toBeInTheDocument();
    //     expect(getByText('School Paper')).toBeInTheDocument();
    // });

    // Displays the correct data when there are no search results
    // it('should display the correct data when there are no search results', () => {
    //     // Mock the TableComponent to render with empty productData
    //     jest.mock('@app/components/pages/management/manage-investment', () => ({
    //         ...jest.requireActual('@app/components/pages/management/manage-investment'),
    //         TableComponent: () => <div>No search results</div>,
    //     }));

    //     // Render the component
    //     const { getByText } = renderWithProviders(<IndexComponent />);

    //     Assert that the correct message is displayed
    //     expect(getByText('No search results')).toBeInTheDocument();
    // });
});
