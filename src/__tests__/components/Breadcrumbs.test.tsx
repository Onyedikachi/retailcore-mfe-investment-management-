// Breadcrumbs.test.jsx

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Breadcrumbs } from "../../components";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Branches", url: "/branches" },
];
const navigate = jest.fn();
jest.mock("../../__mocks__/api/mockReactRouterDom");
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
}));
jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(navigate);
describe("Breadcrumbs", () => {
  it("renders without crashing", () => {
    render(<Breadcrumbs links={links} />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Breadcrumbs links={links} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays breadcrumb links", () => {
    const { getByText, getByTestId } = render(<Breadcrumbs links={links} />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Branches")).toBeInTheDocument();
    const back = getByTestId("back button");
    fireEvent.click(back);
    expect(navigate).toHaveBeenCalledWith(-1);
  });
  it("Can click on links", () => {
    const { getByText, getByTestId } = render(<Breadcrumbs links={links} />);

    const home = getByTestId("Home");
    expect(home).toBeInTheDocument();

    fireEvent.click(home);
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
