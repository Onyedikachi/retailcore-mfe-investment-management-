import AuthGuard from "../../layouts/AuthGuard";
import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Navigate } from "react-router-dom";
import * as shared from "../../__mocks__/@Sterling/shared";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
}));

describe("AuthGuard", () => {
  // it("redirects to login if not authenticated", () => {
  //   jest.spyOn(shared, "isTokenValid").mockReturnValue(false);

  //   const { getByText } = render(
  //     <MemoryRouter initialEntries={["/dashboard"]}>
  //       <AuthGuard>
  //         <div>Dashboard</div>
  //       </AuthGuard>
  //     </MemoryRouter>
  //   );

  //   expect(getByText("Login")).toBeInTheDocument();
  // });

  it("shows content if authenticated", () => {
    jest.spyOn(shared, "isTokenValid").mockReturnValue(true);

    const { getByText } = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AuthGuard>
          <div>Dashboard</div>
        </AuthGuard>
      </MemoryRouter>
    );

    expect(getByText("Dashboard")).toBeInTheDocument();
  });
});

// Tests that when isAuthenticated is true, it returns the children element.
it("should return children when isAuthenticated is true", () => {
  const children = <div>Test Children</div>;
  const { getByText } = render(<AuthGuard children={children} />);
  expect(getByText("Test Children")).toBeInTheDocument();
});
