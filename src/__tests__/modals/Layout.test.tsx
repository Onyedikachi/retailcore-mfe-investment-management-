import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../../components/modals/Layout";
import { act } from "react-dom/test-utils";

// Mock the ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Layout", () => {
  // Mock the window.ResizeObserver
  beforeAll(() => {
    window.ResizeObserver = ResizeObserverMock;
  });

  it("renders children and opens and closes the modal", async () => {
    const setIsOpen = jest.fn();
  
    render(
      <Layout isOpen={true} setIsOpen={setIsOpen}>
        <div>Test Content</div>
        <button>Close</button>
      </Layout>
    );
  
    // Use `await` with `findByText` to wait for the element to appear
    expect(await screen.findByText("Test Content")).toBeInTheDocument();
  });

  it("should not render children when isOpen is false",async () => {
    const { queryByTestId } = render(
      <Layout isOpen={false} setIsOpen={() => {}}>
        <div data-testid="child-content">Child Content</div>
        <button>Close</button>
      </Layout>
    );

    const childContent = await queryByTestId("child-content");
    expect(childContent).toBeNull();
  });

  it("should render dialog with correct data-testid",async () => {
    const { findByTestId } = render(
      <Layout isOpen={true} setIsOpen={() => {}}>
        <div data-testid="child">Child</div>
        <button>Close</button>
      </Layout>
    );
    expect(await findByTestId("dialog")).toBeInTheDocument();
  });

 
});
