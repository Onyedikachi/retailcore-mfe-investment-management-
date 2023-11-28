import { fireEvent, render, screen } from "@testing-library/react";
import TopBar, { Tabs } from "../../components/TopBar";
import React from "react";
import { InvestmentContext, AppContext } from "../../utils/context"; // Update with the actual path

describe("Tabs", () => {
  // Renders a list of tabs with titles and urls
  it("should render a list of tabs with titles and urls", () => {
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

    // Act
    render(<Tabs />);

    // Assert
    tabOptions.forEach((tab) => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });
});
test("should set active tab and update search term", () => {
  render(<Tabs />);

  // Initially, the "deposit" tab should be active
  expect(screen.getByTestId("deposit")).toHaveClass("text-[#252C32]");
  expect(screen.getByTestId("credit")).toHaveClass("text-[#636363]");

  // Click on the "credit" tab
  fireEvent.click(screen.getByText("credit"));

  // Now, the "credit" tab should be active
  expect(screen.getByTestId("deposit")).toHaveClass("text-[#636363]");
  expect(screen.getByTestId("credit")).toHaveClass("text-[#252C32]");

  // Check if the search term is updated
  fireEvent.change(screen.getByPlaceholderText("Search for product"), {
    target: { value: "some search term" },
  });

  // Assert that the search term is updated
  expect(screen.getByPlaceholderText("Search for product")).toHaveValue(
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


test("renders TopBar component", () => {
  render(
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
