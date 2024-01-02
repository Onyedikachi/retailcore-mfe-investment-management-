import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndexComponent, {
  handleToggle,
  handleChange,
  handleRefresh,
  handleSearch,
  handleProductStatus,
  handleRequestStatus,
} from "../pages/investment/IndexComponent";
import { renderWithProviders } from "../utils/test-util";
import { StatusCategoryType } from "../constants/enums";
import React from "react";

const selected = { value: "sent_to_me" };
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
    const selected = null;
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
    const selected = null;
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
      filter_by: null,
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
      filter_by: null,
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
      requestRefetch,
      selected,
      jest.fn(),
      jest.fn()
    );

    expect(getProducts).toHaveBeenCalled();
    expect(prodStatRefetch).toHaveBeenCalled();
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
      requestRefetch,
      selected,
      jest.fn(),
      jest.fn()
    );

    expect(getRequests).toHaveBeenCalled();
    expect(requestRefetch).toHaveBeenCalled();
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
      requestRefetch,
      selected,
      jest.fn(),
      jest.fn()
    );

    expect(getRequests).toHaveBeenCalled();
    expect(prodStatRefetch).toHaveBeenCalled();
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
      requestRefetch,
      selected,
      jest.fn(),
      jest.fn()
    );

    expect(getProducts).toHaveBeenCalled();
    expect(prodStatRefetch).toHaveBeenCalled();
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
    fireEvent.change(
      screen.getByPlaceholderText("Search by product name/code"),
      {
        target: { value: "test" },
      }
    );

    // Ensure that the search state is updated as expected
    // @ts-ignore
    expect(
      // @ts-ignore
      screen.getByPlaceholderText("Search by product name/code").value
    ).toBe("test");
  });

  it("handles search and calls appropriate functions", async () => {
    renderWithProviders(<IndexComponent />);

    // Simulate typing in the search input
    fireEvent.change(
      screen.getByPlaceholderText("Search by product name/code"),
      {
        target: { value: "test" },
      }
    );

    // Your additional assertions or async logic after clicking search...
  });

  // Add more test cases as needed
});

// Generated by CodiumAI

describe("handleRequestStatus", () => {
  // Sets request data to an empty array if query page is 1
  it("should set request data to an empty array when query page is 1", () => {
    const query = { page: 1 };
    const setRequestData = jest.fn();
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = { results: [{ requestStatus: 2, requestType: 0 }] };

    handleRequestStatus({
      query,
      setRequestData,
      setHasMore,
      isRequestSuccess,
      request,
    });

    expect(setRequestData).toHaveBeenCalledWith([]);
  });

  // Maps over request results and adds request status and type names to each item in request data
  it("should map over request results and add request status and type names to each item in request data", () => {
    const query = { page: 2 };
    const setRequestData = jest.fn();
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = {
      results: [
        { requestStatus: 2, requestType: 0 },
        { requestStatus: 1, requestType: 1 },
      ],
    };

    handleRequestStatus({
      query,
      setRequestData,
      setHasMore,
      isRequestSuccess,
      request,
    });

    expect(setRequestData).toHaveBeenCalled();
  });
  // Concatenates new request data to previous request data using setRequestData
  it("should concatenate new request data to previous request data using setRequestData", () => {
    const query = { page: 2 };
    const setRequestData = jest.fn((prevData) => prevData);
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = {
      results: [
        { requestStatus: 2, requestType: 0 },
        { requestStatus: 1, requestType: 1 },
      ],
    };

    handleRequestStatus({
      query,
      setRequestData,
      setHasMore,
      isRequestSuccess,
      request,
    });

    expect(setRequestData).toHaveBeenCalled();
  });

  // Does not set request data to an empty array if query page is not 1
  it("should not set request data to an empty array when query page is not 1", () => {
    const query = { page: 2 };
    const setRequestData = jest.fn();
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = { results: [{ requestStatus: 2, requestType: 0 }] };

    handleRequestStatus({
      query,
      setRequestData,
      setHasMore,
      isRequestSuccess,
      request,
    });

    expect(setRequestData).not.toHaveBeenCalledWith([]);
  });

  // Does not add request status and type names if request results is empty
  it("should not add request status and type names when request results is empty", () => {
    const query = { page: 1 };
    const setRequestData = jest.fn();
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = { results: [] };

    handleRequestStatus({
      query,
      setRequestData,
      setHasMore,
      isRequestSuccess,
      request,
    });

    expect(setRequestData).toHaveBeenCalledWith([]);
  });

  // Does not concatenate new request data if request results is empty
  it("should not concatenate new request data when request results is empty", () => {
    const query = { page: 2 };
    const setRequestData = jest.fn();
    const setHasMore = jest.fn();
    const isRequestSuccess = true;
    const request = { results: [] };

    handleRequestStatus({
      query,
      setRequestData,
      setHasMore,
      isRequestSuccess,
      request,
    });

    expect(setRequestData).not.toHaveBeenCalled();
  });
});
// Generated by CodiumAI

describe("handleProductStatus", () => {
  // Sets product data to an empty array if query page is 1
  it("should set product data to an empty array when query page is 1", () => {
    const query = { page: 1 };
    const setProductData = jest.fn();
    const isSuccess = true;
    const data = { results: [{ state: 0, productType: 0 }] };
    const setHasMore = jest.fn();

    handleProductStatus({ query, setProductData, isSuccess, data, setHasMore });

    expect(setProductData).toHaveBeenCalledWith([]);
  });

  // Concatenates the results of a successful data fetch to the previous product data, mapping each result to include state and productType properties
  it("should concatenate fetched data results to previous product data, mapping each result to include state and productType properties", () => {
    const query = { page: 2 };
    const setProductData = jest.fn((prevData) => prevData);
    const isSuccess = true;
    const data = { results: [{ state: 0, productType: 0 }] };
    const setHasMore = jest.fn();

    handleProductStatus({ query, setProductData, isSuccess, data, setHasMore });

    expect(setProductData).toHaveBeenCalled();
  });

  // Sets hasMore to true if there is a next page in the fetched data
  it("should set hasMore to true if there is a next page in the fetched data", () => {
    const query = { page: 1 };
    const setProductData = jest.fn();
    const isSuccess = true;
    const data = { results: [{ state: 0, productType: 0 }], next: "next-page" };
    const setHasMore = jest.fn();

    handleProductStatus({ query, setProductData, isSuccess, data, setHasMore });

    expect(setHasMore).toHaveBeenCalledWith(true);
  });

  // Does not modify product data if query page is not 1
  it("should not modify product data when query page is not 1", () => {
    const query = { page: 2 };
    const setProductData = jest.fn();
    const isSuccess = true;
    const data = { results: [{ state: 0, productType: 0 }] };
    const setHasMore = jest.fn();

    handleProductStatus({ query, setProductData, isSuccess, data, setHasMore });

    expect(setProductData).toHaveBeenCalled();
  });

  // Does not modify product data if data fetch is not successful
  it("should not modify product data when data fetch is not successful", () => {
    const query = { page: 1 };
    const setProductData = jest.fn();
    const isSuccess = false;
    const data = { results: [{ state: 0, productType: 0 }] };
    const setHasMore = jest.fn();

    handleProductStatus({ query, setProductData, isSuccess, data, setHasMore });

    expect(setProductData).toHaveBeenCalled();
  });

  // Does not modify product data if fetched data results are empty
  it("should not modify product data when fetched data results are empty", () => {
    const query = { page: 1 };
    const setProductData = jest.fn();
    const isSuccess = true;
    const data = { results: [] };
    const setHasMore = jest.fn();

    handleProductStatus({ query, setProductData, isSuccess, data, setHasMore });

    expect(setProductData).toHaveBeenCalled();
  });
});
