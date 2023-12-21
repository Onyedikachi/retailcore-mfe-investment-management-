import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Outlet } from "react-router-dom";
import AuthGaurd from "../../layouts/AuthGuard";
import Layout, { handleRole } from "../../layouts/Layout";
import { renderWithProviders } from "../../__mocks__/api/Wrapper";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

jest.mock("../../layouts/AuthGuard", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => children),
}));

jest.mock("react-router-dom", () => ({
  Outlet: jest.fn(() => null),
}));

describe("Layout", () => {
  it("renders AuthGuard and Outlet components", () => {
    const { getByTestId } = renderWithProviders(<Layout />);

    const outletElement = getByTestId("outlet");
    expect(outletElement).toBeInTheDocument();
  });
});


describe('handleRole', () => {

  it('should handle cases where is_superuser property is not a boolean', () => {
    const setRole = jest.fn();
    const value = {
      user: {
        is_superuser: true
      }
    };
    handleRole(setRole, value);
    expect(setRole).toHaveBeenCalledWith('superadmin');
  });
  // Tests that the function handles cases where the 'is_superuser' property is not a boolean
  it('should handle cases where is_superuser property is not a boolean', () => {
    const setRole = jest.fn();
    const value = {
      user: {
        is_superuser: "true"
      }
    };
    handleRole(setRole, value);
    expect(setRole).toHaveBeenCalledWith('superadmin');
  });

  // Tests that the function handles cases where the 'is_superuser' property is not present in the 'user' object
  it('should handle cases where is_superuser property is not present in user object', () => {
    const setRole = jest.fn();
    const value = {
      user: {}
    };
    handleRole(setRole, value);
    expect(setRole).toHaveBeenCalledWith('admin');
  });
});
