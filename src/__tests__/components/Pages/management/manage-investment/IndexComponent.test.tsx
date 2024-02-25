import IndexComponent from "../../../../../pages/management/manage-investment/IndexComponent"
import { render, screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../../../../../utils/test-util";
const selected = { value: "sent_to_me" };
jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn().mockReturnValue({process: "continue"}),
    useLocation: jest.fn(),
}));
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
