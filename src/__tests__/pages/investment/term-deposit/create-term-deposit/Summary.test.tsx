import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import Summary, {
  Container,
} from "../../../../../pages/investment/term-deposit/Summary";
import React from "react";

import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { useGetProductDetailQuery } from "../../../../../api";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));
describe("Container", () => {
  // Renders a div element with a class of 'rounded-[10px] border border-[#EEE] px-12 py-10'
  it("should render a div element with the correct class", () => {
    render(<Container children={undefined} />);
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass(
      "rounded-[10px] border border-[#EEE] px-12 py-10"
    );
  });

  // Renders the children passed to it
  it("should render the children passed to it", () => {
    render(
      <Container>
        <div data-testid="child">Child Component</div>
      </Container>
    );
    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Child Component");
  });

  // Children prop is not passed
  it("should render without any children", () => {
    render(<Container children={undefined} />);
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeEmptyDOMElement();
  });

  // Children prop is null
  it("should render without any children", () => {
    render(<Container>{null}</Container>);
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeEmptyDOMElement();
  });

  // Children prop is undefined


  // Children prop is not a valid React element
  it("should render without any children", () => {
    render(<Container>"Invalid Child"</Container>);
    const containerElement = screen.getByTestId("container");
  });
});


beforeEach(() => {
  jest
    .spyOn(require("react-router-dom"), "useSearchParams")
    .mockReturnValue([new URLSearchParams({ category: "" })]);

  jest.spyOn(require("react-router-dom"), "useParams")
    .mockReturnValue({ tab: "", type: "", id: "", process: "create" })
});
describe("Summary", () => {
  it("should render the component without crashing", () => {
    renderWithProviders(<Summary />);
  });
  it("should display the correct title and breadcrumbs", () => {
    renderWithProviders(<Summary />);

    expect(screen.getByText("Pending submission")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

});
