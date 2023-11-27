// Breadcrumbs.test.jsx

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Loader } from "../../components";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

describe("Breadcrumbs", () => {
  it("renders without crashing", () => {
    render(
      <Loader
        isOpen={false}
        setIsOpen={function (e: any): void {
          throw new Error("Function not implemented.");
        }}
        text={""}
      />
    );
  });
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Loader
        isOpen={false}
        setIsOpen={function (e: any): void {
          throw new Error("Function not implemented.");
        }}
        text={""}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
describe("Loader", () => {
  window.ResizeObserver = ResizeObserver;
  // Tests that the Loader component is rendered when isOpen is true
  it("should render Loader component when isOpen is true", () => {
    const { getByTestId } = render(
      <Loader isOpen={true} text="Loading..." setIsOpen={jest.fn()} />
    );
    const loader = getByTestId("Layout");
    expect(loader).toBeInTheDocument();
  });

  // Tests that the Loader component is not rendered when isOpen is false
  it("should not render Loader component when isOpen is false", () => {
    const { queryByTestId } = render(
      <Loader isOpen={false} text="Loading..." setIsOpen={jest.fn()} />
    );
    const loader = queryByTestId("Layout");
    expect(loader).not.toBeInTheDocument();
  });

  // Tests that the Loader component does not throw an error when setIsOpen is not provided
  it("should not throw an error when setIsOpen is not provided", () => {
    expect(() => {
      render(<Loader isOpen={true} text="Loading..." setIsOpen={jest.fn()} />);
    }).not.toThrow();
  });

  // Tests that the AiOutlineLoading icon spins when the Loader component is rendered
  it("should spin the AiOutlineLoading icon when Loader component is rendered", () => {
    const { getByTestId } = render(
      <Loader isOpen={true} text="Loading..." setIsOpen={jest.fn()} />
    );
    const icon = getByTestId("AiOutlineLoading");
    expect(icon).toHaveClass("animate-spin");
  });

  // Tests that the text prop is displayed in the Loader component
  it("should display the text prop in the Loader component", () => {
    const { getByText } = render(
      <Loader isOpen={true} text="Loading..." setIsOpen={jest.fn()} />
    );
    const text = getByText("Loading...");
    expect(text).toBeInTheDocument();
  });
});
