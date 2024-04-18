import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TableComponent, {
  getSearchResult,
  handleDownload,
  handleDropdown,
  handleHeaders,
  handleProductDownloadSuccess,
  initiateDownload,
} from "../../../../components/investment/dashboard/TableComponent";
import { StatusCategoryType } from "../../../../constants/enums";
import { ExportToCsv } from "export-to-csv";

import {
  DropDownOptions,
  ProductTypes,
  StatusFilterOptions,
  StatusTypes,
  TypeFilterOptions,
  productHeader,
  requestHeader,
} from "../../../../constants";

describe("handleDropdown", () => {
  // Returns an array of options based on the status, isChecker, locked, and permissions parameters.
  it("should return an array of options based on the status, isChecker, locked, and permissions parameters", () => {
    // Arrange
    const status = "active";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "view" }, { text: "modify" }],
      inactive: [{ text: "view" }, { text: "deactivate" }],
    };
    const setOptionsByStatus = (status) => {
      return status === "active" ? "active" : "inactive";
    };
    const locked = false;
    const permissions = ["CREATE_PRODUCT"];

    // Act
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual(DropDownOptions.active);
  });

  // Filters out "deactivate" and "activate" options if user does not have "CREATE_PRODUCT" permission.
  it('should filter out "deactivate" and "activate" options if user does not have "CREATE_PRODUCT" permission', () => {
    // Arrange
    const status = "inactive";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "view" }, { text: "modify" }],
      inactive: [{ text: "view" }, { text: "deactivate" }],
    };
    const setOptionsByStatus = (status) => {
      return status === "active" ? "active" : "inactive";
    };
    const locked = false;
    const permissions = [];

    // Act
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual([{ text: "view" }]);
  });

  // Filters out "modify" option if user does not have "CREATE_PRODUCT" permission and is not a checker.
  it('should filter out "modify" option if user does not have "CREATE_PRODUCT" permission and is not a checker', () => {
    // Arrange
    const status = "active";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "view" }, { text: "modify" }],
      inactive: [{ text: "view" }, { text: "deactivate" }],
    };
    const setOptionsByStatus = (status) => {
      return status === "active" ? "active" : "inactive";
    };
    const locked = false;
    const permissions = [];

    // Act
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual([{ text: "view" }]);
  });

  // Returns an array with only "view" option if locked parameter is true and "view" option exists.
  it('should return an array with only "view" option if locked parameter is true and "view" option exists', () => {
    // Arrange
    const status = "active";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "view" }, { text: "modify" }],
      inactive: [{ text: "view" }, { text: "deactivate" }],
    };
    const setOptionsByStatus = (status) => {
      return status === "active" ? "active" : "inactive";
    };
    const locked = true;
    const permissions = [];

    // Act
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual([{ text: "view" }]);
  });

  // Returns an empty array if locked parameter is true and "view" option does not exist.
  it('should return an empty array if locked parameter is true and "view" option does not exist', () => {
    // Arrange
    const status = "active";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "modify" }],
      inactive: [{ text: "deactivate" }],
    };
    const setOptionsByStatus = (status) => {
      return status === "active" ? "active" : "inactive";
    };
    const locked = true;
    const permissions = [];

    // Act
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual([]);
  });

  // Returns an array with only "view" option if isChecker parameter is true and "view" option exists.
  it('should return an array with only "view" option if isChecker parameter is true and "view" option exists', () => {
    // Arrange
    const status = "active";
    const isChecker = true;
    const DropDownOptions = {
      active: [{ text: "view" }, { text: "modify" }],
      inactive: [{ text: "view" }, { text: "deactivate" }],
    };
    const setOptionsByStatus = (status) => {
      return status === "active" ? "active" : "inactive";
    };
    const locked = false;
    const permissions = [];

    // Act
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual([{ text: "view" }]);
  });
});

describe("handleHeaders", () => {
  it("should filter out 'created_by' when isChecker is true", () => {
    const headers = [{ label: "initiator", key: "created_by" }, { key: "other_key" }];
    const isChecker = true;

    const result = handleHeaders(headers, isChecker);

    expect(result).toEqual([{ key: "other_key" }]);
  });

  it("should filter out 'approved_By' when isChecker is false", () => {
    const headers = [{ label: "reviewer", key: "approved_By" }, { key: "other_key" }];
    const isChecker = false;

    const result = handleHeaders(headers, isChecker);

    expect(result).toEqual([{ key: "other_key" }]);
  });
});

describe("handleDownload", () => {
  it("should generate CSV for requests category", () => {
    const downloadData = [
      {
        description: "Request 1",
        request_type: "Type 1",
        created_by: "User 1",
        status: "Status 1",
        updated_at: "2022-01-01",
      },
      {
        description: "Request 2",
        request_type: "Type 2",
        created_by: "User 2",
        status: "Status 2",
        updated_at: "2022-01-02",
      },
    ];

    const csvExporter = {
      generateCsv: jest.fn(),
    };

    handleDownload(downloadData, false, csvExporter, "Requests");

    expect(csvExporter.generateCsv).toHaveBeenCalled();
  });

  it("should generate CSV for product category", () => {
    const downloadData = [
      {
        name: "Product 1",
        code: "Code 1",
        status: "Status 1",
        updated_at: "2022-01-01",
      },
      {
        name: "Product 2",
        code: "Code 2",
        status: "Status 2",
        updated_at: "2022-01-02",
      },
    ];

    const csvExporter = {
      generateCsv: jest.fn(),
    };

    handleDownload(downloadData, false, csvExporter, "Products");

    expect(csvExporter.generateCsv).toHaveBeenCalled();
  });

  it("should not generate CSV if downloadData is empty", () => {
    const downloadData = [];
    const csvExporter = {
      generateCsv: jest.fn(),
    };

    handleDownload(downloadData, false, csvExporter, "Requests");

    expect(csvExporter.generateCsv).not.toHaveBeenCalled();
  });
});



describe('initiateDownload', () => {

  // Downloads all products when category is 'all products'
  it('should download all products when category is "all products"', () => {
    const query = {};
    const category = StatusCategoryType.AllProducts;
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = { value: 'created_by_anyone' };

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadProducts).toHaveBeenCalledWith({ ...query, page_Size: 1000000, filter_by: selected?.value });
    expect(downloadRequests).not.toHaveBeenCalled();
  });

  // Downloads all requests when category is 'requests'
  it('should download all requests when category is "requests"', () => {
    const query = {};
    const category = StatusCategoryType.Requests;
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = { value: 'created_by_anyone' };

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadRequests).toHaveBeenCalledWith({ ...query, page_Size: 1000000, filter_by: selected?.value });
    expect(downloadProducts).not.toHaveBeenCalled();
  });

  // Includes selected filter value in download query
  it('should include selected filter value in download query', () => {
    const query = {};
    const category = StatusCategoryType.AllProducts;
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = { value: 'created_by_anyone' };

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadProducts).toHaveBeenCalledWith({ ...query, page_Size: 1000000, filter_by: selected?.value });
    expect(downloadRequests).not.toHaveBeenCalled();
  });

  // No selected filter value provided
  it('should not include filter value in download query when no selected filter value is provided', () => {
    const query = {};
    const category = StatusCategoryType.AllProducts;
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = {value: "created_by_anyone"};

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadProducts).toHaveBeenCalledWith({ ...query, filter_by: selected.value, page_Size: 1000000 });
    expect(downloadRequests).not.toHaveBeenCalled();
  });

  // Category is not 'all products' or 'requests'
  it('should not call download functions when category is not "all products" or "requests"', () => {
    const query = {};
    const category = 'otherCategory';
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = { value: 'created_by_anyone' };

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadProducts).not.toHaveBeenCalled();
    expect(downloadRequests).toHaveBeenCalledWith({ "filter_by": "created_by_anyone", "page_Size": 1000000 });
  });

  // Query object is empty
  it('should call download functions with empty query object', () => {
    const query = {};
    const category = StatusCategoryType.AllProducts;
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = { value: 'created_by_anyone' };

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadProducts).toHaveBeenCalledWith({ ...query, page_Size: 1000000, filter_by: selected?.value });
    expect(downloadRequests).not.toHaveBeenCalled();
  });

  // Sets page size to 1000000 in download query
  it('should set page size to 1000000 in download query', () => {
    const query = {};
    const category = StatusCategoryType.AllProducts;
    const downloadProducts = jest.fn();
    const downloadRequests = jest.fn();
    const selected = { value: 'created_by_anyone' };

    initiateDownload(query, category, downloadProducts, downloadRequests, selected);

    expect(downloadProducts).toHaveBeenCalledWith({ ...query, page_Size: 1000000, filter_by: selected?.value });
  });
});




describe('getSearchResult', () => {

  // When value is empty, setSearchResults should be called with an empty array
  it('should call setSearchResults with an empty array when value is empty', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const selected = null;

    getSearchResult("", getProducts, getRequests, category, setSearchResults, selected);

    expect(setSearchResults).toHaveBeenCalledWith([]);
    expect(getProducts).not.toHaveBeenCalled();
    expect(getRequests).not.toHaveBeenCalled();
  });

  it('should call getProducts with the correct parameters when category is AllProducts', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const selected = { value: "someValue" };

    getSearchResult("searchValue", getProducts, getRequests, category, setSearchResults, selected);

    expect(getProducts).toHaveBeenCalledWith({
      search: "searchValue",
      page: 1,
      page_Size: 25,
      filter_by: "someValue",
    });
    expect(setSearchResults).not.toHaveBeenCalled();
    expect(getRequests).not.toHaveBeenCalled();
  });

  it('should call getRequests with the correct parameters when category is Requests', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.Requests;
    const selected = { value: "someValue" };

    getSearchResult("searchValue", getProducts, getRequests, category, setSearchResults, selected);

    expect(getRequests).toHaveBeenCalledWith({
      search: "searchValue",
      page: 1,
      page_Size: 25,
      filter_by: "someValue",
    });
    expect(setSearchResults).not.toHaveBeenCalled();
    expect(getProducts).not.toHaveBeenCalled();
  });


  it('should call setSearchResults with an empty array when value is null', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const selected = null;

    getSearchResult([], getProducts, getRequests, category, setSearchResults, selected);

    expect(setSearchResults).toHaveBeenCalledWith([]);
    expect(getProducts).not.toHaveBeenCalled();
    expect(getRequests).not.toHaveBeenCalled();
  });

  it('should not call setSearchResults when category is not a valid StatusCategoryType', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = "InvalidCategory";
    const selected = null;

    getSearchResult("searchValue", getProducts, getRequests, category, setSearchResults, selected);

    expect(setSearchResults).not.toHaveBeenCalledWith([]);
    expect(getProducts).not.toHaveBeenCalled();
  });

  it('should call getProducts/getRequests with filter_by as undefined when selected is null', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const selected = null;

    getSearchResult("searchValue", getProducts, getRequests, category, setSearchResults, selected);

    expect(getProducts).toHaveBeenCalledWith({
      search: "searchValue",
      page: 1,
      page_Size: 25,
      filter_by: undefined,
    });
    expect(setSearchResults).not.toHaveBeenCalled();
    expect(getRequests).not.toHaveBeenCalled();
  });

  it('should call setSearchResults with an empty array when getProducts/getRequests returns an error', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const value = "search value";
    const selected = { value: value };

    getSearchResult(value, getProducts, getRequests, category, setSearchResults, selected);

    expect(setSearchResults).not.toHaveBeenCalledWith();
    expect(getProducts).toHaveBeenCalledWith({
      search: value,
      page: 1,
      page_Size: 25,
      filter_by: selected?.value,
    });
    expect(getRequests).not.toHaveBeenCalled();
  });

  it('should call getProducts/getRequests with the correct parameters when value is a string with special characters', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const value = "search value!@#$%^&*()";
    const selected = { value: value };

    getSearchResult(value, getProducts, getRequests, category, setSearchResults, selected);

    expect(setSearchResults).not.toHaveBeenCalled();
    expect(getProducts).toHaveBeenCalledWith({
      search: value,
      page: 1,
      page_Size: 25,
      filter_by: selected?.value,
    });
    expect(getRequests).not.toHaveBeenCalled();
  });

  it('should call setSearchResults with an empty array when value is a string with only spaces', () => {
    const setSearchResults = jest.fn();
    const getProducts = jest.fn();
    const getRequests = jest.fn();
    const category = StatusCategoryType.AllProducts;
    const selected = null;
    const value = "     ";

    getSearchResult(value, getProducts, getRequests, category, setSearchResults, selected);

    expect(setSearchResults).not.toHaveBeenCalled();
    expect(getProducts).toHaveBeenCalledWith({ "filter_by": undefined, "page": 1, "page_Size": 25, "search": "     " });
    expect(getRequests).not.toHaveBeenCalled();
  });
});



// test("renders the table component", () => {
//   render(<TableComponent />);
//   // Assert that the table component is rendered
//   expect(screen.getByTestId("table")).toBeInTheDocument();
// });

// test("clicking refresh button toggles refresh state", () => {
//   render(<TableComponent />);
//   const refreshButton = screen.getByTestId("refresh-btn");

//   // Assert that the refresh state is initially false
//   expect(screen.getByTestId("refresh-state")).toHaveTextContent("false");

//   // Click the refresh button
//   fireEvent.click(refreshButton);

//   // Assert that the refresh state is now true
//   expect(screen.getByTestId("refresh-state")).toHaveTextContent("true");

//   // Click the refresh button again
//   fireEvent.click(refreshButton);

//   // Assert that the refresh state is now false again
//   expect(screen.getByTestId("refresh-state")).toHaveTextContent("false");
// });

// test("clicking download button calls handleDownload function", () => {
//   render(<TableComponent />);
//   const downloadButton = screen.getByTestId("download-btn");

//   // Mock the handleDownload function
//   const handleDownload = jest.fn();


//   // Click the download button
//   fireEvent.click(downloadButton);

//   // Assert that the handleDownload function is called
//   expect(handleDownload).toHaveBeenCalled();
// });




