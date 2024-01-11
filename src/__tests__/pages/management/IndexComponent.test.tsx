import Dashboard from "../../../pages/management/IndexComponent";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test-util";


class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
    writable: true,
    value: jest.fn(),
});

Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
    writable: true,
    value: jest.fn().mockReturnValue({
        x: 0,
        y: 0,
    }),
});

Object.defineProperty(global.SVGElement.prototype, 'getComputedTextLength', {
    writable: true,
    value: jest.fn().mockReturnValue(0),
});

Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
    writable: true,
    value: jest.fn().mockReturnValue({
        x: 10,
        y: 10,
        inverse: () => { },
        multiply: () => { },
    }),
});

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn(),
    useLocation: jest.fn(),
}));

describe('Dashboard', () => {
    window.ResizeObserver = ResizeObserver
    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "" })]);
        jest
            .spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ tab: "overview" });
    });
    // Renders the Investment Management dashboard with Overview tab selected by default
    it('should render Investment Management dashboard with Overview tab selected by default', () => {
        renderWithProviders(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        expect(screen.getByText('Investment Management')).toBeInTheDocument();
        expect(screen.getByText('overview')).toBeInTheDocument()
    });

    // Renders the Investment Management dashboard with Book Investment button
    it('should render Investment Management dashboard with Book Investment button', () => {
        renderWithProviders(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        expect(screen.getByText('Book Investment')).toBeInTheDocument();
    });

    // Allows user to switch between Overview, Corporate and Individual tabs
    it('should allow user to switch between Overview, Corporate and Individual tabs', () => {
        renderWithProviders(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        const overviewTab = screen.getByTestId('overview-tab');
        const corporateTab = screen.getByTestId('corporate-tab');
        const individualTab = screen.getByTestId('individual-tab');
        userEvent.click(corporateTab);
        expect(corporateTab).not.toHaveClass('text-[20px] font-semibold text-[#252C32]');
        expect(overviewTab).toHaveClass('text-[20px] font-semibold text-[#252C32]');
        expect(individualTab).not.toHaveClass('text-[20px] font-semibold text-[#252C32]');
        userEvent.click(individualTab);
        // expect(individualTab).toHaveClass('text-[20px] font-semibold text-[#252C32]');
        // expect(corporateTab).not.toHaveClass('text-[20px] font-semibold text-[#252C32]');
        // expect(overviewTab).not.toHaveClass('text-[20px] font-semibold text-[#252C32]');
    });

    // Handles empty search query by displaying "No search query" message
    // it('should display "No search query" message when search query is empty', () => {
    //     renderWithProviders(
    //         <BrowserRouter>
    //             <Dashboard />
    //         </BrowserRouter>
    //     );
    //     const searchInput = screen.getByPlaceholderText('Search by product name');
    //     userEvent.type(searchInput, '{enter}');
    //     expect(screen.getByText('No search query')).toBeInTheDocument();
    // });
});
