import { render, screen } from "@testing-library/react"
import IndexComponent from "../../../components/summary/indexComponent"
import { renderWithProviders } from "../../../__mocks__/api/Wrapper";

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
    useParams: jest.fn(),
}));

const links = [
    {
        url: "/",
        title: "link 1",
        idx: 1
    },
    {
        url: "/",
        title: "link 2",
        idx: 2
    },
    {
        url: "/",
        title: "link 4",
        idx: 3
    },
]

describe("IndexComponent", () => {
    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

        jest.spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ process: "continue" })
    });
    it("Renders without crashing", () => {
        renderWithProviders(<IndexComponent links={links} statusLabels={["Pending submission", "Approved"]}/>);
        expect(screen.getByText("Process summary"))
    })
})