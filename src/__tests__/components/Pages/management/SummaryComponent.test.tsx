import Summary from "../../../../pages/management/SummaryComponent"
import { render, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../../__mocks__/api/Wrapper"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", category: "investments", tab: "" })]),
    useParams: jest.fn().mockReturnValue({ tab: "" }),
    useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));

// jest.mock("../../../../api", () => ({
//     useGetInvestmentDetailQuery: jest.fn().mockReturnValue({ data: "" }),
//     useGetProductDetailQuery: jest.fn().mockReturnValue({ data: "" }),
//     useGetInvestmentActivityLogQuery: jest.fn().mockReturnValue({ data: "" }),
//     useGetInvestmentRequestDetailQuery: jest.fn().mockReturnValue({ data: "" }),
//     useGetInvestmentRequestActivityLogQuery: jest.fn().mockReturnValue({ data: "" }),
// }));

describe('Summary', () => {

    // Renders the component without crashing
    it('should render the component without crashing', () => {
        renderWithProviders(<Summary />);
        screen.debug();
        expect(screen).toMatchSnapshot();
    });
});
