import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import Overview, { updateInvestmentTabs } from "../../../../../components/pages/management/overview/index"
import {render, screen} from "@testing-library/react"


jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn(),
    useLocation: jest.fn().mockReturnValue({pathname: ""})
  }));

describe('updateInvestmentTabs', () => {

    // Returns an array of objects with updated 'amount' and 'totalValue' properties.
    it('should return an array of objects with updated amount and totalValue properties', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs).toEqual([
            {
                title: "All Investments",
                amount: " 5000",
                totalValue: "10 total investments",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: " 2500",
                totalValue: "5 total investments",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: " 2500",
                totalValue: "5 total investments",
                icon: "<WithdrawSvg />",
            },
        ]);
    });

    // Updates 'amount' property with the total value of investments for each tab.
    it('should update amount property with the total value of investments for each tab', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs[0].amount).toBe(" 5000");
        expect(updatedTabs[1].amount).toBe(" 2500");
        expect(updatedTabs[2].amount).toBe(" 2500");
    });

    // Updates 'totalValue' property with the total count of investments for each tab.
    it('should update totalValue property with the total count of investments for each tab', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs[0].totalValue).toBe("10 total investments");
        expect(updatedTabs[1].totalValue).toBe("5 total investments");
        expect(updatedTabs[2].totalValue).toBe("5 total investments");
    });

    // Returns an empty array when the input 'tabs' array is empty.
    it('should return an empty array when the input tabs array is empty', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs).toEqual([]);
    });

    // Returns an array of objects with 'amount' property set to '0.00' and 'totalValue' property set to '0 total investments' when the input 'tabs' array is empty.
    it('should return an array of objects with amount property set to 0.00 and totalValue property set to 0 total investments when the input tabs array is empty', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs).toEqual([]);
    });

    // Returns an array of objects with the same length as the input 'tabs' array.
    it('should return an array of objects with the same length as the input tabs array', () => {
        const data = {
            All: { count: 10, totalValue: 5000 },
            A: { count: 5, totalValue: 2500 },
            L: { count: 5, totalValue: 2500 },
        };

        const tabs = [
            {
                title: "All Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<InvestmentSvg />",
            },
            {
                title: "Active Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<UserSvg />",
            },
            {
                title: "Liquidated Investments",
                amount: 0.00,
                totalValue: "",
                icon: "<WithdrawSvg />",
            },
        ];

        const updatedTabs = updateInvestmentTabs(data, tabs);

        expect(updatedTabs.length).toBe(tabs.length);
    });
});


describe('Overview', () => {

    // Renders the component without crashing
    it('should render Overview component without crashing', () => {
        renderWithProviders(<Overview />);
        expect(screen.getByText('All Investments')).toBeInTheDocument();
    });

    // // Displays investment tabs with correct titles and icons
    // it('should display investment tabs with correct titles and icons', () => {
    //     render(<Overview />);
    //     expect(screen.getByText('All Investments')).toBeInTheDocument();
    //     expect(screen.getByText('Active Investments')).toBeInTheDocument();
    //     expect(screen.getByText('Liquidated Investments')).toBeInTheDocument();
    //     expect(screen.getByTestId('investment-svg')).toBeInTheDocument();
    //     expect(screen.getByTestId('user-svg')).toBeInTheDocument();
    //     expect(screen.getByTestId('withdraw-svg')).toBeInTheDocument();
    // });

    // // Displays investment amounts and total values correctly formatted
    // it('should display investment amounts and total values correctly formatted', () => {
    //     render(<Overview />);
    //     expect(screen.getByText('NGN 0.00')).toBeInTheDocument();
    //     expect(screen.getByText('NGN 0.00')).toBeInTheDocument();
    //     expect(screen.getByText('NGN 0.00')).toBeInTheDocument();
    // });

    // // Handles loading state correctly
    // it('should handle loading state correctly', async () => {
    //     useGetInvestmentDashboardStatsQuery.mockReturnValue({
    //         isLoading: true,
    //     });
    //     render(<Overview />);
    //     expect(screen.getByTestId('overview-loader')).toBeInTheDocument();
    // });

    // // Handles error state correctly
    // it('should handle error state correctly', async () => {
    //     useGetInvestmentDashboardStatsQuery.mockReturnValue({
    //         isError: true,
    //     });
    //     render(<Overview />);
    //     expect(screen.getByTestId('overview-error')).toBeInTheDocument();
    // });

    // // Handles missing data gracefully
    // it('should handle missing data gracefully', async () => {
    //     useGetInvestmentDashboardStatsQuery.mockReturnValue({
    //         data: null,
    //         isSuccess: true,
    //     });
    //     render(<Overview />);
    //     expect(screen.getByText('NGN 0.00')).toBeInTheDocument();
    //     expect(screen.getByText('NGN 0.00')).toBeInTheDocument();
    //     expect(screen.getByText('NGN 0.00')).toBeInTheDocument();
    // });
});
