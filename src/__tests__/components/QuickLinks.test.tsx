import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuickLinks, { defaultLink, handleLinks } from "../../components/QuickLinks";
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


describe("HandleLinks", () => {
  const mockLinks = {
    "status": "success",
    "message": "Quick links fetched successfully",
    "data": [
      {
        "quickLinkId": "913169c5-3108-4ce6-856e-50bde8ce0587",
        "link": "https://seabaas.dev.bepeerless.co/product-factory/investment",
        "name": "ProductFactory",
        "category": "ProductFactory",
        "count": 26,
        "isDefault": true,
        "createdAt": "2023-12-08T07:58:37.781Z",
        "updatedAt": "2023-12-08T13:43:53.519Z"
      },
      {
        "quickLinkId": "7d2b69cc-302a-4eb1-ae0b-b3312b91a14e",
        "link": "https://seabaas.dev.bepeerless.co/payment-management/dashboard/transfers",
        "name": "Payments Module",
        "category": "ProductFactory",
        "count": 1,
        "isDefault": true,
        "createdAt": "2023-08-16T15:56:43.256Z",
        "updatedAt": "2023-08-16T15:56:43.256Z"
      },
      {
        "quickLinkId": "779bd103-c42c-4312-ba11-0418bf28e668",
        "link": "https://seabaas.dev.bepeerless.co/product/inventory",
        "name": "Product Inventory",
        "category": "ProductFactory",
        "count": 1,
        "isDefault": true,
        "createdAt": "2023-08-16T15:56:43.577Z",
        "updatedAt": "2023-08-16T15:56:43.577Z"
      },
      {
        "quickLinkId": "7e4cefe6-ba21-466f-a8b2-62ec32ca5774",
        "link": "https://seabaas.dev.bepeerless.co/configuration/global-product-organisation",
        "name": "Global Product Organisation",
        "category": "ProductFactory",
        "count": 1,
        "isDefault": true,
        "createdAt": "2023-08-16T15:56:43.873Z",
        "updatedAt": "2023-08-16T15:56:43.873Z"
      }
    ]
  }
  const setLinks = jest.fn()
  const addLink = jest.fn()
  const updateLink = jest.fn()
  it("Sets links if links are available", () => {
    handleLinks(mockLinks, true, "https://seabaas.dev.bepeerless.co", setLinks, jest.fn(), jest.fn(), defaultLink);
    // @ts-ignore
    expect(setLinks).toBeCalledWith([defaultLink, ...mockLinks.data])
  })
  
  it("Return default link if links are not available", () => {
    handleLinks({}, true, "https://seabaas.dev.bepeerless.co", setLinks, addLink, jest.fn(), defaultLink);
    expect(addLink).toBeCalledWith([{"category": "ProductFactory", "isDefault": true, "link": "product-factory/investment", "name": "Product Factory"}]);
  })
  it("Updates Links", () => {
    handleLinks(mockLinks, true, "https://seabaas.dev.bepeerless.co", setLinks, addLink, updateLink, defaultLink);
    // @ts-ignore
    expect(updateLink).toBeCalledWith({"moduleLink": "product-factory/investment", "moduleName": "Product Factory"})
  })
})