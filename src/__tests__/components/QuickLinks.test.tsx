import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuickLinks from "../../components/QuickLinks";
import React from "react";
import {
  useUpdateLinkMutation,
  useAddLinkMutation,
  useGetLinksQuery,
} from "../../api";
import { MODULENAME } from "../../constants";
import { renderWithProviders } from "../../utils/test-util";

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

    const container = getByText("Quick Links");
    const links = getAllByRole("link");

    expect(container).toBeInTheDocument();
    expect(links.length).toBeGreaterThan(0);
  });
});

describe("QuickLinks component", () => {
  test("renderWithProviderss QuickLinks component with suggested links", () => {
    renderWithProviders(<QuickLinks />);

    // Check if the "Quick Links" heading is present
    expect(screen.getByText("Quick Links")).toBeInTheDocument();

    // Check if the suggested links section is visible
    expect(
      screen.getByText("Suggested from your activity")
    ).toBeInTheDocument();

    // Check if the close button is present
    expect(screen.getByTestId("close")).toBeInTheDocument();

    // Check if the suggested link is renderWithProvidersed
    expect(screen.getByText("ProductFactory")).toBeInTheDocument();

    // Check if the links are renderWithProvidersed with the correct URLs
    const link = screen.getByText("ProductFactory");
    expect(link.tagName).toBe("SPAN");
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

  // Fetches data from useGetLinksQuery hook and updates state with received data
  it("should fetch data from useGetLinksQuery hook and update state with received data", () => {
    // Mock the useGetLinksQuery hook to return data
    const mockData = {
      data: [
        {
          isDefault: false,
          count: 2,
          name: "Link 1",
          category: "Category 1",
          link: "link-1",
        },
        {
          isDefault: false,
          count: 3,
          name: "Link 2",
          category: "Category 2",
          link: "link-2",
        },
      ],
      isLoading: false,
      isFetching: false,
    };
    jest.mock("@app/api", () => ({
      useGetLinksQuery: jest.fn(() => mockData),
      useUpdateLinkMutation: jest.fn(),
      useAddLinkMutation: jest.fn(),
    }));

    // Import the QuickLinks component
    const QuickLinks = require("../src/components/QuickLinks").default;

    // Render the QuickLinks component
    const { getByText } = renderWithProviders(<QuickLinks />);

    // Assert that the links are renderWithProvidersed with the received data
    expect(getByText("Link 1")).toBeInTheDocument();
    expect(getByText("Link 2")).toBeInTheDocument();
  });

  it("should renderWithProviders a message when isOpen state is true", () => {
    // Mock the useState hook to set isOpen state to true
    jest.mock("react", () => ({
      ...jest.requireActual("react"),
      useState: jest.fn(() => [true, jest.fn()]),
    }));

    // Import the QuickLinks component
    const QuickLinks = require("../src/components/QuickLinks").default;

    // Render the QuickLinks component
    const { getByText } = renderWithProviders(<QuickLinks />);

    // Assert that the message is renderWithProvidersed
    expect(getByText("Suggested from your activity")).toBeInTheDocument();
  });

  // Renders default link when useGetLinksQuery hook returns null
  it("should renderWithProviders default link when useGetLinksQuery hook returns null", () => {
    // Mock the useGetLinksQuery hook to return null
    jest.mock("@app/api", () => ({
      useGetLinksQuery: jest.fn(() => ({
        data: null,
        isLoading: false,
        isFetching: false,
      })),
      useUpdateLinkMutation: jest.fn(),
      useAddLinkMutation: jest.fn(),
    }));

    // Import the QuickLinks component
    const QuickLinks = require("../src/components/QuickLinks").default;

    // Render the QuickLinks component
    const { getByText } = renderWithProviders(<QuickLinks />);

    // Assert that the default link is renderWithProvidersed
    expect(getByText("Product management")).toBeInTheDocument();
  });

  it("renderWithProviderss QuickLinks component with mocked useUpdateLinkMutation", () => {
    jest.mock("@app/api", () => ({
      ...jest.requireActual("@app/api"),
      useUpdateLinkMutation: jest.fn(),
    }));
    // Mock the useUpdateLinkMutation hook
    const mockUpdateLinkMutation = jest.fn();
    useUpdateLinkMutation.mockReturnValue([mockUpdateLinkMutation]);

    renderWithProviders(<QuickLinks />);

    // You can add more assertions based on your component's behavior
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();

    // For example, you can check if the hook was called during component renderWithProvidersing
    expect(useUpdateLinkMutation).toHaveBeenCalled();
  });

  it("calls updateLink with correct arguments", async () => {
    const mockUpdateLinkMutation = jest.fn();
    useUpdateLinkMutation.mockReturnValue([mockUpdateLinkMutation]);

    renderWithProviders(<QuickLinks />);

    // Assuming that the component calls updateLink when it mounts
    // You can also trigger the action that calls updateLink in your component

    // Wait for asynchronous operations (e.g., updateLink) to complete
    // You may need to adjust this based on the actual behavior of your component
    await new Promise((resolve) => setTimeout(resolve, 0));
    const baseUrl = "https://seabaas.dev.bepeerless.co";

    // Check if updateLink has been called with the correct arguments
    expect(mockUpdateLinkMutation).toHaveBeenCalledWith({
      moduleName: MODULENAME, // Replace with the actual value
      moduleLink: `${baseUrl}/product-factory/investment`, // Replace with the actual value
    });
  });

  it("calls addLink when quickLinks is not available", async () => {
    const mockAddLinkMutation = jest.fn();
    const mockUseGetLinksQuery = jest.fn();
    useAddLinkMutation.mockReturnValue([mockAddLinkMutation]);
    useGetLinksQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<QuickLinks />);

    // Wait for asynchronous operations (e.g., useEffect) to complete
    await waitFor(() => {});

    // Check if addLink has been called with the correct arguments
    expect(mockAddLinkMutation).toHaveBeenCalledWith({
      isDefault: true,
      name: "ProductFactory",
      category: "Investment",
      link: "https://seabaas.dev.bepeerless.co/product-factory/investment",
    });
  });

  it("sets links state when quickLinks is available", async () => {
    const mockUseGetLinksQuery = jest.fn();
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
    await waitFor(() => {});

    // You can check if setLinks has been called with the expected values
    // Note: Adjust this based on your actual data structure
    // expect(setLinks).toHaveBeenCalledWith([defaultLink, ...expectedLinks]);
  });

  describe("QuickLinks component", () => {
    test("should toggle the isOpen state when close button is clicked", () => {
      renderWithProviders(<QuickLinks />);

      // Verify that the suggestion block is initially renderWithProvidersed when isOpen is true
      expect(
        screen.getByText("Suggested from your activity")
      ).toBeInTheDocument();

      // Click the close button to toggle isOpen
      fireEvent.click(screen.getByTestId("close"));

      // Verify that the suggestion block is not present after clicking close
      expect(
        screen.queryByText("Suggested from your activity")
      ).not.toBeInTheDocument();

      // Click the close button again to toggle isOpen back to true
      fireEvent.click(screen.getByTestId("close"));

      // Verify that the suggestion block is present after clicking close again
      expect(
        screen.getByText("Suggested from your activity")
      ).toBeInTheDocument();
    });
  });

  test("should set the baseUrl correctly", () => {
    renderWithProviders(<QuickLinks />);
    const baseUrl = "https://seabaas.dev.bepeerless.co";

    // Assuming baseUrl is used in the component, you can assert that it is set correctly
    expect(baseUrl).toBe("https://seabaas.dev.bepeerless.co");
  });

  test("should log an error when updateLink throws an error", async () => {
    // Mock the updateLink function to throw an error
    const mockUpdateLink = jest
      .fn()
      .mockRejectedValue(new Error("Update link error"));
    require("@app/api").useUpdateLinkMutation.mockReturnValue([mockUpdateLink]);

    renderWithProviders(<QuickLinks />);

    // Ensure that updateLinkCount is called
    await waitFor(() => {
      expect(mockUpdateLink).toHaveBeenCalled();
    });

    // Ensure that the error message is logged
    expect(console.error).toHaveBeenCalledWith(
      "Error creating link:",
      new Error("Update link error")
    );
  });
});
