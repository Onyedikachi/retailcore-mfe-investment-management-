import IndexComponent from "../../../../pages/management/book-investment/IndexComponent";
import { render, screen, } from "@testing-library/react"
import {renderWithProviders} from "../../../../__mocks__/api/Wrapper"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ process: "continue", investmentType: "term-deposit" }),
    useSearchParams: jest.fn()
}));

describe('IndexComponent', () => {
    beforeEach(() => {
        jest
          .spyOn(require("react-router-dom"), "useSearchParams")
          .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);
    
        jest.spyOn(require("react-router-dom"), "useParams")
          .mockReturnValue({ process: "continue" })
      });

    // Renders the component without crashing
    it('should render the component without crashing', () => {
        renderWithProviders(
            <IndexComponent />
        );
    });

    // Displays the correct title and breadcrumbs based on the investmentType parameter
    it('should display the correct title and breadcrumbs based on the investmentType parameter', () => {
        const investmentType = "example";
        const { getByText} = renderWithProviders(
            <IndexComponent />
        );
        expect(getByText("New Term Deposit Product")).toBeInTheDocument();
    });

    // Renders the correct form step based on the step state
    it('should render the correct form step based on the step state', () => {
        const { getByTestId, getAllByTestId } = renderWithProviders(
            <IndexComponent />
        );
        expect(getAllByTestId("form-step")[0]).toBeInTheDocument();
    });

    // // Handles the case when the step state is less than 1
    // it('should handle the case when the step state is less than 1', () => {
    //     const { getByTestId } = render(
    //         <Router>
    //             <IndexComponent />
    //         </Router>
    //     );
    //     expect(getByTestId("form-step")).toBeInTheDocument();
    // });

    // // Handles the case when the step state is not a number
    // it('should handle the case when the step state is not a number', () => {
    //     const { getByTestId } = render(
    //         <Router>
    //             <IndexComponent />
    //         </Router>
    //     );
    //     expect(getByTestId("form-step")).toBeInTheDocument();
    // });

    // // Handles the case when the formRef state is null
    // it('should handle the case when the formRef state is null', () => {
    //     const { getByTestId } = render(
    //         <Router>
    //             <IndexComponent />
    //         </Router>
    //     );
    //     expect(getByTestId("form-step")).toBeInTheDocument();
    // });
});
