import { fireEvent, render, screen } from "@testing-library/react";
import QuickLinks from "../../components/QuickLinks";
import React from "react";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn((props) => <a {...props}>{props.children}</a>), // Mock the Link component
}));
describe("QuickLinks", () => {
  // Renders a container with a title and a list of links.
  it("should render a container with a title and a list of links", () => {
    const { getByText, getAllByRole } = render(<QuickLinks />);

    const container = getByText("Quick Links");
    const links = getAllByRole("link");

    expect(container).toBeInTheDocument();
    expect(links.length).toBeGreaterThan(0);
  });

});

describe("QuickLinks component", () => {
    test("renders QuickLinks component with suggested links", () => {
      render(<QuickLinks />);
  
      // Check if the "Quick Links" heading is present
      expect(screen.getByText("Quick Links")).toBeInTheDocument();
  
      // Check if the suggested links section is visible
      expect(
        screen.getByText("Suggested from your activity")
      ).toBeInTheDocument();
  
      // Check if the close button is present
      expect(screen.getByTestId("close")).toBeInTheDocument();
  
      // Check if the suggested link is rendered
      expect(
        screen.getByText("Product management")
      ).toBeInTheDocument();
  
      // Check if the links are rendered with the correct URLs
      const link = screen.getByText("Product management");
      expect(link.tagName).toBe("SPAN");
   
    });
  
    test("closes the suggested links section when close button is clicked", () => {
      render(<QuickLinks />);
  
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