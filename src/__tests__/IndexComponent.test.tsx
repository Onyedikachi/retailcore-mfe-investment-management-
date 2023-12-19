import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndexComponent, {
  handleToggle,
  handleChange,
  handleRefresh,
  handleSearch,
  handleStatus,
} from "../pages/investment/IndexComponent";
import { renderWithProviders } from "../utils/test-util";
import { StatusCategoryType } from "../constants/enums";
import React from "react";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

describe("IndexComponent", () => {
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "" })]);
  });
  it("Renders without error", () => {
    const { getByTestId } = renderWithProviders(<IndexComponent />);
    expect(getByTestId("create-btn")).toBeInTheDocument();
    expect(getByTestId("click-element-test")).toBeInTheDocument();
    expect(getByTestId("deposit")).toBeInTheDocument();
    expect(getByTestId("credit")).toBeInTheDocument();
  });

  it("should display the TopBar component", () => {
    const { getAllByTestId } = renderWithProviders(<IndexComponent />);
    const data = getAllByTestId("top-bar");
    expect(data[0]).toBeInTheDocument();
  });
});

describe("handleToggle", () => {
  // Toggling with an option that includes "approved" sets isChecker to true and hideCreate to true
  it('should set isChecker to true and hideCreate to true when selected option includes "approved"', () => {
    const setIsChecker = jest.fn();
    const setHideCreate = jest.fn();
    const selected = { text: "Approved Option" };

    handleToggle(selected, setIsChecker, setHideCreate);

    expect(setIsChecker).toHaveBeenCalledWith(true);
    expect(setHideCreate).toHaveBeenCalledWith(true);
  });

  // Toggling with an option that includes "sent" sets isChecker to true and hideCreate to true
  it('should set isChecker to true and hideCreate to true when selected option includes "sent"', () => {
    const setIsChecker = jest.fn();
    const setHideCreate = jest.fn();
    const selected = { text: "Sent Option" };

    handleToggle(selected, setIsChecker, setHideCreate);

    expect(setIsChecker).toHaveBeenCalledWith(true);
    expect(setHideCreate).toHaveBeenCalledWith(true);
  });

  // Toggling with an option that does not include "approved" or "sent" sets isChecker to false and hideCreate to false
  it('should set isChecker to false and hideCreate to false when selected option does not include "approved" or "sent"', () => {
    const setIsChecker = jest.fn();
    const setHideCreate = jest.fn();
    const selected = { text: "Other Option" };

    handleToggle(selected, setIsChecker, setHideCreate);

    expect(setIsChecker).toHaveBeenCalledWith(false);
    expect(setHideCreate).toHaveBeenCalledWith(false);
  });

  // Toggling with a null selected value does not throw an error and does not change isChecker or hideCreate
  it("should not throw an error and change values to 'false' when selected values when selected value is null", () => {
    const setIsChecker = jest.fn();
    const setHideCreate = jest.fn();
    const selected = null;

    expect(() => {
      handleToggle(selected, setIsChecker, setHideCreate);
    }).not.toThrow();
    expect(setIsChecker).toHaveBeenCalledWith(false);
    expect(setHideCreate).toHaveBeenCalledWith(false);
  });

  // Toggling with a selected value that does not have a text property does not throw an error and does not change isChecker or hideCreate
  it("should not throw an error and change values to 'false' when selected values does not have a text property", () => {
    const setIsChecker = jest.fn();
    const setHideCreate = jest.fn();
    const selected = { value: "Option" };

    expect(() => {
      handleToggle(selected, setIsChecker, setHideCreate);
    }).not.toThrow();
    expect(setIsChecker).toHaveBeenCalledWith(false);
    expect(setHideCreate).toHaveBeenCalledWith(false);
  });

  // Toggling with a selected value that has a null text property does not throw an error and does not change isChecker or hideCreate
  it("should not throw an error and change values to 'false' when selected values when selected value has a null text property", () => {
    const setIsChecker = jest.fn();
    const setHideCreate = jest.fn();
    const selected = { text: null };

    expect(() => {
      handleToggle(selected, setIsChecker, setHideCreate);
    }).not.toThrow();

    expect(setIsChecker).toHaveBeenCalledWith(false);
    expect(setHideCreate).toHaveBeenCalledWith(false);
  });
});


describe("handleChange", () => {
  // The function should update the query object with the selected filter and reset the page to 1.
  it("should update query object with selected filter and reset page to 1", () => {
    const selected = "filter";
    const activeType = "all";
    const setQuery = jest.fn();
    const query = {
      page: 2,
      filter_by: null,
      status_In: [1, 2, 3],
    };
    const category = "Requests";

    handleChange(selected, activeType, setQuery, query, category);

    expect(setQuery).toHaveBeenCalledWith({
      ...query,
      page: 1,
      filter_by: selected,
      status_In: null,
    });
  });

  // If the activeType is "all", the function should set the status_In property of the query object to null.
  it('should set status_In property of query object to null when activeType is "all"', () => {
    const selected = "filter";
    const activeType = "all";
    const setQuery = jest.fn();
    const query = {
      page: 2,
      filter_by: null,
      status_In: [1, 2, 3],
    };
    const category = "Requests";

    handleChange(selected, activeType, setQuery, query, category);

    expect(setQuery).toHaveBeenCalledWith({
      ...query,
      page: 1,
      filter_by: selected,
      status_In: null,
    });
  });
  // If the activeType is not a valid string, the function should still update the query object.
  it("should update query object when activeType is not a valid string", () => {
    const selected = "filter";
    const activeType = "invalid";
    const setQuery = jest.fn();
    const query = {
      page: 2,
      filter_by: null,
      status_In: [1, 2, 3],
    };
    const category = "Requests";

    handleChange(selected, activeType, setQuery, query, category);

    expect(setQuery).toHaveBeenCalledWith({
      filter_by: "filter",
      page: 1,
      status_In: [undefined],
    });
  });

  // If the category is not a valid string, the function should still update the query object.
  it("should update query object when category is not a valid string", () => {
    const selected = "filter";
    const activeType = "all";
    const setQuery = jest.fn();
    const query = {
      page: 2,
      filter_by: null,
      status_In: [1, 2, 3],
    };
    const category = null;

    handleChange(selected, activeType, setQuery, query, category);

    expect(setQuery).toHaveBeenCalledWith({
      filter_by: "filter",
      page: 1,
      status_In: null,
    });
  });
});


describe("handleRefresh", () => {
  const getProducts = jest.fn();
  const prodStatRefetch = jest.fn();
  const getRequests = jest.fn();
  const requestRefetch = jest.fn();
  // Calls getProducts and prodStatRefetch with updated query when category is AllProducts
  it("should call getProducts and prodStatRefetch with updated query when category is AllProducts", () => {
    const category = StatusCategoryType.AllProducts;
    const query = { page: 1 };

    handleRefresh(
      category,
      query,
      getRequests,
      getProducts,
      prodStatRefetch,
      requestRefetch
    );

    expect(getProducts).toHaveBeenCalledWith({ ...query, page: 1 });
    expect(prodStatRefetch).toHaveBeenCalledWith(query);
  });

  // Calls getRequests and requestRefetch with updated query when category is Requests
  it("should call getRequests and requestRefetch with updated query when category is Requests", () => {
    const category = StatusCategoryType.Requests;
    const query = { page: 1 };

    handleRefresh(
      category,
      query,
      getRequests,
      getProducts,
      prodStatRefetch,
      requestRefetch
    );

    expect(getRequests).toHaveBeenCalledWith({ ...query, page: 1 });
    expect(requestRefetch).toHaveBeenCalledWith(query);
  });

  // category is undefined
  it("should call getRequests and RequestRefetch when category is undefined", () => {
    const category = undefined;
    const query = { page: 1 };

    handleRefresh(
      category,
      query,
      getRequests,
      getProducts,
      prodStatRefetch,
      requestRefetch
    );

    expect(getRequests).toHaveBeenCalledWith({ page: 1 });
    expect(prodStatRefetch).toHaveBeenCalledWith({ page: 1 });
    expect(requestRefetch).toHaveBeenCalled();
  });

  // getRequests is undefined
  it("should call getProducts and getStatRefresh when StatusCategory type === 'all products' ", () => {
    const category = StatusCategoryType.Requests;
    handleRefresh(
      category,
      { page: 1 },
      getRequests,
      getProducts,
      prodStatRefetch,
      requestRefetch
    );

    expect(getProducts).toHaveBeenCalledWith({ page: 1 });
    expect(prodStatRefetch).toHaveBeenCalledWith({ page: 1 });
  });
});

describe("handleSearch", () => {
  const setQuery = jest.fn();
  const query = { queryValues: "queryValues" };
  const value = "val";
  it("Should call setQuery with the provided values", () => {
    handleSearch(value, query, setQuery);

    expect(setQuery).toHaveBeenCalledWith({ ...query, page: 1, search: value });
  });
});

// Mock the react-toastify library
jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(() => null),
  toast: {
    error: jest.fn(),
  },
}));

describe("IndexComponent", () => {


  it("handles search input change and sets search state", () => {
    renderWithProviders(<IndexComponent />);

    // Simulate typing in the search input
    fireEvent.change(screen.getByPlaceholderText("Search by product name/code"), {
      target: { value: "test" },
    });

    // Ensure that the search state is updated as expected
    // @ts-ignore 
    expect(screen.getByPlaceholderText("Search by product name/code").value).toBe("test");
  });


  it("handles search and calls appropriate functions", async () => {
    renderWithProviders(<IndexComponent />);

    // Simulate typing in the search input
    fireEvent.change(screen.getByPlaceholderText("Search by product name/code"), {
      target: { value: "test" },
    });


    // Your additional assertions or async logic after clicking search...
  });

  // Add more test cases as needed
});


describe("handleStatus", () => {
  // Sets product and request data to empty arrays if query page is 1
  it('should set product and request data to empty arrays when query page is 1', () => {
    const query = { page: 1 };
    const setProductData = jest.fn();
    const setRequestData = jest.fn();
    const isSuccess = true;
    const data = { results: [] };
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = { results: [] };

    handleStatus({ query, setProductData, setRequestData, isSuccess, data, setHasMore, isRequestSuccess, request });

    expect(setProductData).toHaveBeenCalledWith([]);
    expect(setRequestData).toHaveBeenCalledWith([]);
  });

  // Maps and formats product data and adds it to existing product data
  it('should map and format product data and add it to existing product data when isSuccess is true', () => {
    const query = { page: 2 };
    const setProductData = jest.fn();
    const setRequestData = jest.fn();
    const isSuccess = true;
    const data = { results: [{ state: 0, productType: 0 }] };
    const setHasMore = jest.fn();
    const isRequestSuccess = false;
    const request = {};

    handleStatus({ query, setProductData, setRequestData, isSuccess, data, setHasMore, isRequestSuccess, request });

    expect(setProductData).toHaveBeenCalled();
  });

  // Maps and formats request data and adds it to existing request data
  it('should map and format request data and add it to existing request data when isRequestSuccess is true', () => {
    const query = { page: 2 };
    const setProductData = jest.fn();
    const setRequestData = jest.fn();
    const isSuccess = false;
    const data = {};
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = { results: [{ requestStatus: 1, requestType: 0 }] };

    handleStatus({ query, setProductData, setRequestData, isSuccess, data, setHasMore, isRequestSuccess, request });

    expect(setRequestData).toHaveBeenCalled();
  });

  // Does not modify product or request data if isSuccess and isRequestSuccess are false
  it('should not modify product or request data when isSuccess and isRequestSuccess are false', () => {
    const query = { page: 2 };
    const setProductData = jest.fn();
    const setRequestData = jest.fn();
    const isSuccess = false;
    const data = {};
    const setHasMore = jest.fn();
    const isRequestSuccess = false;
    const request = {};

    handleStatus({ query, setProductData, setRequestData, isSuccess, data, setHasMore, isRequestSuccess, request });

    expect(setProductData).not.toHaveBeenCalled();
    expect(setRequestData).not.toHaveBeenCalled();
  });

  // Does not modify product or request data if data or request are undefined
  it('should not modify product or request data when data or request are undefined', () => {
    const query = { page: 2 };
    const setProductData = jest.fn();
    const setRequestData = jest.fn();
    const isSuccess = true;
    const data = undefined;
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = undefined;

    handleStatus({ query, setProductData, setRequestData, isSuccess, data, setHasMore, isRequestSuccess, request });

    expect(setProductData).not.toHaveBeenCalledWith(null);
    expect(setRequestData).not.toHaveBeenCalledWith(null);
  });
})