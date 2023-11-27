import React from "react";

import { render } from "@testing-library/react";
import AppWrapper from "../../components/AppWrapper";

jest.mock("react-redux", () => ({
  Provider: ({ children }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
}));

jest.mock("redux-persist/integration/react", () => ({
  PersistGate: ({ children }) => (
    <div data-testid="persist-gate">{children}</div>
  ),
}));

jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toastify-container" />,
}));

describe("AppWrapper Component", () => {
  test("renders children within the Provider component", () => {
    const { getByText, getByTestId } = render(
      <AppWrapper>
        <div>Child Component</div>
      </AppWrapper>
    );
    const childComponent = getByText("Child Component");
    expect(childComponent).toBeInTheDocument();
    expect(getByTestId("redux-provider")).toBeInTheDocument();
    expect(getByTestId("persist-gate")).toBeInTheDocument();
    expect(getByTestId("toastify-container")).toBeInTheDocument();
  });
});
