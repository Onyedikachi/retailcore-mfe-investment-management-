import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import QuickLinks from "../../../../components/branch-management/dashboard/QuickLinks";
import { InvestmentContext } from "../../../../utils/context";
import { ProviderValue } from "../../../../__mocks__/fileMocks";
import { renderWithProviders } from "../../../../utils/test-util";
import { MemoryRouter } from "react-router-dom";

// Mock the react-router-dom module
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

describe("QuickLinks", () => {
  it("renders correctly", () => {
    // Render the component
    renderWithProviders(
      <MemoryRouter>
        <InvestmentContext.Provider value={{ ...ProviderValue }}>
          <QuickLinks />
        </InvestmentContext.Provider>
      </MemoryRouter>
    );
    // Assert that the component renders without errors
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(
      screen.queryByText("Suggested from your activity")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("close"));
    expect(
      screen.queryByText("Suggested from your activity")
    ).not.toBeInTheDocument();
  });
});
