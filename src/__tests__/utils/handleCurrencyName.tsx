import { handleCurrencyName } from "../../utils/handleCurrencyName";
import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { AppContext } from "../../utils/context";

describe("handleCurrencyName", () => {
  it("returns the currency name for a valid id", () => {
    const currencies = [
      { id: "NGN", text: "NGN" },
      { id: "EUR", text: "Euro" },
    ];

    const wrapper = ({ children }) => (
      <AppContext.Provider
        value={{ currencies, role: "", setRole: jest.fn(), permissions: [] }}
      >
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => handleCurrencyName("NGN", currencies), {
      wrapper,
    });

    expect(result.current).toBe("NGN");
  });

  it("returns null for an invalid id", () => {
    const currencies = [
      { id: "USD", text: "US Dollar" },
      { id: "EUR", text: "Euro" },
    ];

    const wrapper = ({ children }) => (
      <AppContext.Provider
        value={{ currencies, role: "", setRole: jest.fn(), permissions: [] }}
      >
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => handleCurrencyName("XXX", currencies), {
      wrapper,
    });

    expect(result.current).toBeNull();
  });
});
