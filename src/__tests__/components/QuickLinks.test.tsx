import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuickLinks from "../../components/QuickLinks";
import { InvestmentContext } from "../../../src/utils/context";
import { ProviderValue } from "../../__mocks__/fileMocks";
import { MemoryRouter } from "react-router-dom";

import {
  useUpdateLinkMutation,
  useAddLinkMutation,
  useGetLinksQuery,
} from "../../api";
import { MODULENAME } from "../../constants";
import { renderWithProviders } from "../../utils/test-util";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn((props) => <a {...props}>{props.children}</a>), // Mock the Link component
}));

describe("QuickLinks", () => {
  // Renders a container with a title and a list of links.
  it("should renderWithProviders a container with a title and a list of links", () => {
    const { getByText, getAllByRole } = renderWithProviders(<QuickLinks />);

    // const container = getByText(" Quick Links");
    const links = getAllByRole("link");

    // expect(container).toBeInTheDocument();
    expect(links.length).toBeGreaterThan(0);
  });
});

describe("QuickLinks component", () => {
  test("renderWithProviderss QuickLinks component with suggested links", async () => {
    renderWithProviders(<QuickLinks />);

    // Check if the "Quick Links" heading is present
    // expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(
      screen.queryByText("Suggested from your activity")
    ).toBeInTheDocument();

    // Check if the close button is present
    expect(screen.getByTestId("close")).toBeInTheDocument();

    // Check if the suggested link is renderWithProvidersed
    const link = await screen.findByText("Product management");

    // Check if the links are renderWithProvidersed with the correct URLs
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("SPAN");
  });

  test("closes the suggested links section when close button is clicked", async () => {
    renderWithProviders(<QuickLinks />);

    // Check if the suggested links section is initially visible
    expect(
      screen.getByText("Suggested from your activity")
    ).toBeInTheDocument();

    // Click the close button
    fireEvent.click(screen.getByTestId("close"));
    expect(
      screen.queryByText("Suggested from your activity")
    ).not.toBeInTheDocument();
  });

  it("should renderWithProviders a message when isOpen state is true", () => {

    const { getByText } = renderWithProviders(<QuickLinks />);

    // Assert that the message is renderWithProvidersed
    expect(getByText("Suggested from your activity")).toBeInTheDocument();
  });

  //   // Renders default link when useGetLinksQuery hook returns null
  it("should renderWithProviders default link when useGetLinksQuery hook returns null", () => {

    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
        <InvestmentContext.Provider value={{ ...ProviderValue }}>
          <QuickLinks />
        </InvestmentContext.Provider>
      </MemoryRouter>
    );
    expect(getByTestId("link-name")).toBeInTheDocument();
    // Render the QuickLinks component
    const { getByText } = renderWithProviders(<QuickLinks />);
  });

  it("sets links state when quickLinks is available", async () => {
    const useGetLinksQuery = jest.fn();
    useGetLinksQuery.mockReturnValue({
      data: {
        data: [
          // Your data structure here
        ],
      },
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<QuickLinks />);

    // Wait for asynchronous operations (e.g., useEffect) to complete
    await waitFor(() => {
      expect(screen.getByTestId("link-name")).toBeInTheDocument()
    });

    // You can check if setLinks has been called with the expected values
    // Note: Adjust this based on your actual data structure
  });

  test("closes the suggested links section when close button is clicked", () => {
    renderWithProviders(<QuickLinks />);

    // Check if the suggested links section is initially visible
    expect(
      screen.getByText("Suggested from your activity")
    ).toBeInTheDocument();

    // Click the close button
    fireEvent.click(screen.getByTestId("close"));

    // Check if the suggested links section is now hidden
    expect(
      screen.queryByText("Suggested from your activity")
    ).not.toBeInTheDocument();
  });
});
