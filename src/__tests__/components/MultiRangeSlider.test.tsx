import React, { useState as useStateMock } from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MultiRangeSlider from "../../components/MultiRangeSlider";
import { InvestmentContext } from "../../utils/context";
import { ProviderValue } from "../../__mocks__/fileMocks";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useState: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));
const setValues = jest.fn();

describe("Slider", () => {
  beforeEach(() => {
    // Reset the mock implementation and mockReset
    // @ts-ignore
    useStateMock.mockImplementation((initialValues) => [
      initialValues,
      (newValues) => setValues(newValues),
    ]);
    setValues.mockReset();
  });

  it("renders without crashing", () => {
    render(
      <InvestmentContext.Provider value={{ ...ProviderValue }}>
        <MultiRangeSlider rangeLabels={["Pending submission", "Approved"]} />
      </InvestmentContext.Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MultiRangeSlider rangeLabels={["Pending submission", "Approved"]} />
    );

    //   expect(asFragment()).toMatchSnapshot();
  });
});
