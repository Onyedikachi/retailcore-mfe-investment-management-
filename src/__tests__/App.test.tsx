import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Navigate: ({ children }) => <div>{children}</div>,
}));

jest.mock("../layouts/Layout", () => {
  return ({ children }) => <div data-testid="app-outlet">{children}</div>;
});

jest.mock("../components/AppWrapper.tsx", () => {
  return ({ children }) => <div data-testid="app-wrapper">{children}</div>;
});

describe("Test App Component", () => {
  it("If App is rendered wihout issues", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);

    await waitFor(() => {
      expect(getAllByTestId("app-outlet")[0]).toBeInTheDocument();
      expect(getByTestId("app-wrapper")).toBeInTheDocument();
    });
  });
});
