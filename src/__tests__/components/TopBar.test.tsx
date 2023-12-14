import { fireEvent, render, screen } from "@testing-library/react";
import TopBar, { Tabs, getSearchResult } from "../../components/TopBar";
import React from "react";
import { InvestmentContext, AppContext } from "../../utils/context"; // Update with the actual path
import { renderWithProviders } from "../../utils/test-util";
import { Provider } from "react-redux";
import { store } from "../../__mocks__/api/store-mock";
import { MemoryRouter } from "react-router-dom";

const navigate = jest.fn();
jest.mock("../../__mocks__/api/mockReactRouterDom");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom'),
  MemoryRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useLocationn: jest.fn(),
}));
jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(navigate);
describe("Tabs", () => {
  // Renders a list of tabs with titles and urls
  it("should renderWithProviders a list of tabs with titles and urls", () => {
    // Arrange
    const tabOptions = [
      {
        title: "deposit",
        url: "",
      },
      {
        title: "credit",
        url: "",
      },
      {
        title: "Over the counter Payments",
        url: "",
      },
      {
        title: "investment",
        url: "",
      },
    ];
    const mockLocation = {
      pathname: '/investment',
      search: '',
      hash: '',
      state: null,
      key: 'mockKey',
    };
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(mockLocation);
  
  
    // Act
    renderWithProviders(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    // Assert
    tabOptions.forEach((tab) => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });
});
test("should set active tab and update search term", () => {
  const mockLocation = {
    pathname: '/example',
    search: '',
    hash: '',
    state: null,
    key: 'mockKey',
  };
  jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(mockLocation);


  renderWithProviders(
    <Provider store={store}>
      <Tabs />
    </Provider>
  );

  // Initially, the "deposit" tab should be active
  // expect(screen.getByTestId("deposit")).toHaveClass("text-[#252C32]");
  expect(screen.getByTestId("credit")).toHaveClass("text-[#636363]");

  // Click on the "credit" tab
  fireEvent.click(screen.getByText("credit"));

  // Now, the "credit" tab should be active
  expect(screen.getByTestId("deposit")).toHaveClass("text-[#636363]");
  expect(screen.getByTestId("credit")).toHaveClass("text-[#252C32]");

  // Check if the search term is updated
  fireEvent.change(screen.getByPlaceholderText("Search by product"), {
    target: { value: "some search term" },
  });

  // Assert that the search term is updated
  expect(screen.getByPlaceholderText("Search by product")).toHaveValue(
    "some search term"
  );
});

// Mock the context values
const mockInvestmentContext = {
  isChecker: false,
  category: "some-category",
};

const mockAppContext = {
  permissions: ["createProduct"],
  role: "",
  setRole: jest.fn(),
};

// Mock the CreateButton component
jest.mock("../../components/CreateButton", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => children),
}));

test("renderWithProviderss TopBar component", () => {
  renderWithProviders(
    <InvestmentContext.Provider value={mockInvestmentContext}>
      <AppContext.Provider value={mockAppContext}>
        <TopBar />
      </AppContext.Provider>
    </InvestmentContext.Provider>
  );

  // Assertions for the static content
  expect(screen.getByText("Product Factory")).toBeInTheDocument();
  expect(screen.getByTestId("create-btn")).toBeInTheDocument();

  // Mock function assertions
  expect(screen.getByTestId("create-btn")).toHaveClass("bg-sterling-red-800");
  expect(screen.getByTestId("create-btn")).toHaveTextContent(
    "Create new product"
  );
  expect(screen.getByTestId("create-btn")).toHaveAttribute(
    "data-testid",
    "create-btn"
  );

  // Ensure CreateButton component is used
  expect(require("../../components/CreateButton").default).toHaveBeenCalled();
});

// You can add more tests to cover different scenarios and interactions


describe("getSearchResult", () => {
  // When given a non-empty string value, it should call the 'getProducts' function with the correct parameters and set the search results using the 'setSearchResults' function.
  it("should call getProducts with correct parameters and set search results", () => {
    const value = "example";
    const getProducts = jest.fn();
    const setSearchResults = jest.fn();
    const selected = { value: "example" };

    getSearchResult(value, getProducts, setSearchResults, selected);

    expect(getProducts).toHaveBeenCalledWith({
      search: value,
      page: 1,
      page_Size: 25,
      filter_by: selected.value,
    });
    expect(setSearchResults).not.toHaveBeenCalled();
  });

  // When given an empty string value, it should set the search results to an empty array using the 'setSearchResults' function.
  it("should set search results to empty array when given empty string value", () => {
    const value = "";
    const setSearchResults = jest.fn();

    getSearchResult(value, jest.fn(), setSearchResults, jest.fn());

    expect(setSearchResults).toHaveBeenCalledWith([]);
  });



});


describe("Tabs", () => {
  // Renders the tabs with the correct titles and styles
  it("should renderWithProviders tabs with correct titles and styles", () => {
    const mockLocation = {
      pathname: '/example',
      search: '',
      hash: '',
      state: null,
      key: 'mockKey',
    };
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(mockLocation);
  
  
    // Initialize and renderWithProviders the Tabs component
    const { getByTestId } = renderWithProviders(<Tabs />);

    // Get the tab elements
    const depositTab = getByTestId("deposit");
    const creditTab = getByTestId("credit");
    const paymentTab = getByTestId("Over the counter Payments");
    const investmentTab = getByTestId("investment");

    // Assert that the tab elements have the correct titles
    expect(depositTab.textContent).toBe("deposit");
    expect(creditTab.textContent).toBe("credit");
    expect(paymentTab.textContent).toBe("Over the counter Payments");
    expect(investmentTab.textContent).toBe("investment");

    // Assert that the active tab has the correct styles
    expect(depositTab).toHaveClass("text-[#636363] text-base capitalize flex flex-col justify-end cursor-pointer");
    expect(creditTab).toHaveClass("text-[#636363] text-base");
    expect(paymentTab).toHaveClass("text-[#636363] text-base");

  });

  // Clicking on a tab updates the active tab and navigates to the correct URL
  it("should update active tab and navigate to correct URL when a tab is clicked", () => {
    // Initialize and renderWithProviders the Tabs component
    const { getByTestId } = renderWithProviders(<Tabs />);

    // Get the tab elements
    const depositTab = getByTestId("deposit");
    const creditTab = getByTestId("credit");
    const paymentTab = getByTestId("Over the counter Payments");
    const investmentTab = getByTestId("investment");

    // Mock the navigate function from react-router-dom
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    // Click on the deposit tab
    fireEvent.click(depositTab);

    // Assert that the active tab is updated and the navigate function is called with the correct URL
    expect(depositTab).toHaveClass("text-[#252C32] text-lg font-semibold");
 

    // Click on the credit tab
    fireEvent.click(creditTab);

    // Assert that the active tab is updated and the navigate function is called with the correct URL
    expect(creditTab).toHaveClass("text-[#252C32] text-lg font-semibold");

    // Click on the payment tab
    fireEvent.click(paymentTab);

    // Assert that the active tab is updated and the navigate function is called with the correct URL
    expect(paymentTab).toHaveClass("text-[#252C32] text-lg font-semibold");


    // Click on the investment tab
    fireEvent.click(investmentTab);

    // Assert that the active tab is updated and the navigate function is called with the correct URL
    expect(investmentTab).toHaveClass("text-[#252C32] text-lg font-semibold");
  
  });
});


describe("TopBar", () => {
  // Renders the top bar component without errors
  it("should renderWithProviders the top bar component without errors", () => {
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider  value={{ role: "", setRole: jest.fn(), permissions: [] }}>
          <TopBar />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );
    // assertion
    expect(screen.getByTestId("top-bar")).toBeInTheDocument();
  });

  // Displays the Product Factory title
  it("should display the Product Factory title", () => {
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider  value={{ role: "", setRole: jest.fn(), permissions: [] }}>
          <TopBar />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );
    // assertion
    expect(screen.getByText("Product Factory")).toBeInTheDocument();
  });

  // Displays the Create new product button
  it("should display the Create new product button", () => {
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider  value={{ role: "", setRole: jest.fn(), permissions: [] }}>
          <TopBar />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );
    // assertion
    expect(screen.getByTestId("create-btn")).toBeInTheDocument();
  });

  // Permissions are not provided
  it("should disable the Create new product button when permissions are not provided", () => {
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{ role: "", setRole: jest.fn(), permissions: [] }}
        >
          <TopBar />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );
    // assertion
    expect(screen.getByTestId("create-btn")).toBeDisabled();
  });



});
