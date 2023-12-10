import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TableComponent, {
  handleDownload,
  handleDropdown,
  handleHeaders,
} from "../../../../components/investment/dashboard/TableComponent";



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
    const headers = [{ key: "created_by" }, { key: "other_key" }];
    const isChecker = true;

    const result = handleHeaders(headers, isChecker);

    expect(result).toEqual([{ key: "other_key" }]);
  });

  it("should filter out 'approved_By' when isChecker is false", () => {
    const headers = [{ key: "approved_By" }, { key: "other_key" }];
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
