
import { getByText, screen } from "@testing-library/dom";
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import IndexComponent from "../../../../../pages/investment/term-deposit/create-term-deposit/IndexComponent"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn(),
}));
describe("IndexComponent", () => {
    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

        jest.spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ process: "continue" })
    });
    it("renders", () => {
        renderWithProviders(<IndexComponent/>)
        expect(screen.getByText("New Term Deposit Product")).toBeInTheDocument();
        expect(screen.getAllByTestId("form-step").length).toBeGreaterThan(1);
    })

    it("")
})