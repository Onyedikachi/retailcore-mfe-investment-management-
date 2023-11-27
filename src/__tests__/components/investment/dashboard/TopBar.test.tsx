import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TopBar from "../../../../components/branch-management/dashboard/TopBar";
import { MemoryRouter, Router } from "react-router-dom";
import { InvestmentContext } from "../../../../utils/context";
import { ProviderValue } from "../../../../__mocks__/fileMocks";
import { StatusCategoryType } from "../../../../constants/enums";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

describe("TopBar", () => {
  it("renders without crashing", () => {
    render(
      <InvestmentContext.Provider value={{ ...ProviderValue }}>
        <TopBar />
      </InvestmentContext.Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <InvestmentContext.Provider value={{ ...ProviderValue }}>
        <TopBar />
      </InvestmentContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays heading", () => {
    const { getByText } = render(
      <InvestmentContext.Provider value={{ ...ProviderValue }}>
        <TopBar />
      </InvestmentContext.Provider>
    );

    expect(getByText("Branch Management")).toBeInTheDocument();
  });

  it("does not display button if isChecker is true", () => {
    render(
      <InvestmentContext.Provider value={{ ...ProviderValue }}>
        <TopBar />
      </InvestmentContext.Provider>
    );

    expect(screen.queryByText("Create new branch")).not.toBeInTheDocument();
  });

  // Tests that the 'Create new branch' button is not displayed when isChecker is true
  it("should not display the create new branch button when isChecker is true", () => {
    const { queryByText } = render(<TopBar />, {
      wrapper: ({ children }) => (
        <InvestmentContext.Provider
          value={{ isChecker: true, category: StatusCategoryType.AllBranches }}
        >
          {children}
        </InvestmentContext.Provider>
      ),
    });
    expect(queryByText("Create new branch")).not.toBeInTheDocument();
  });

  // Tests that the 'Create new branch' button is not displayed when category is not AllBranches
  it("should not display the create new branch button when category is not AllBranches", () => {
    const { queryByText } = render(<TopBar />, {
      wrapper: ({ children }) => (
        <InvestmentContext.Provider
          value={{ isChecker: false, category: StatusCategoryType.Requests }}
        >
          {children}
        </InvestmentContext.Provider>
      ),
    });
    expect(queryByText("Create new branch")).not.toBeInTheDocument();
  });
});
