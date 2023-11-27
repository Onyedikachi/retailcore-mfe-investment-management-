import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For better assertions
import * as components from "../../components"; // Update the path as needed
import { ProviderValue } from "../../__mocks__/fileMocks";
import { InvestmentContext } from "../../utils/context";
import { renderWithProviders } from "../../utils/test-util";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

describe("Components", () => {
  it.each(Object.entries(components))(
    "%s renders without errors",
    (name, Component) => {
      renderWithProviders(
        <MemoryRouter>
          <InvestmentContext.Provider
            value={{
              ...ProviderValue,
              setSelected: jest.fn(),
              setStatus: jest.fn(),
            }}
          >
            <Component
              links={[]}
              options={undefined}
              children={undefined}
              handleClick={jest.fn()}
              type={"submit"}
              isOpen={false}
              setIsOpen={jest.fn()}
              text={""}
              rangeLabels={[]}
              status={""}
              reason={""}
              setFormData={jest.fn()}
            />
          </InvestmentContext.Provider>
        </MemoryRouter>
      );
    }
  );
});
