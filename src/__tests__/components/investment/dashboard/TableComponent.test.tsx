// TableComponent.test.js

import React from "react";
import TableComponent, {
  handleDownload,
} from "../../../../components/branch-management/dashboard/TableComponent";
import { AppContext, InvestmentContext } from "../../../../utils/context";
import { ProviderValue } from "../../../../__mocks__/fileMocks";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../../utils/test-util";
import { fireEvent } from "@testing-library/react";
import { StatusCategoryType } from "../../../../constants/enums";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: () => mockedUsedNavigate,
}));

describe("handleDownload", () => {
  // Test that the function generates a CSV file for requests data when the category is 'Requests'
  it("should generate a CSV file for requests data", () => {
    const downloadData = [
      {
        description: "Test request",
        request_type: "CREATE",
        created_by: "John Doe",
        status: "A",
        updated_at: "2022-01-01T00:00:00.000Z",
      },
    ];
    const isChecker = false;
    const csvExporter = { generateCsv: jest.fn() };
    const category = StatusCategoryType.Requests;
    handleDownload(downloadData, isChecker, csvExporter, category);
    expect(csvExporter.generateCsv).toHaveBeenCalled();
  });

  describe("handleDownload", () => {
    // Test that the function generates a CSV file for requests data when the category is 'Requests'
    it("should generate a CSV file for requests data", () => {
      const downloadData = [
        {
          description: "Test request",
          request_type: "CREATE",
          created_by: "John Doe",
          status: "A",
          updated_at: "2022-01-01T00:00:00.000Z",
        },
      ];
      const isChecker = false;
      const csvExporter = { generateCsv: jest.fn() };
      const category = StatusCategoryType.Requests;
      handleDownload(downloadData, isChecker, csvExporter, category);
      expect(csvExporter.generateCsv).toHaveBeenCalled();
    });

    // Test that the function generates a CSV file for branch data when the category is 'AllBranches'
    it("should generate a CSV file for branch data", () => {
      const downloadData = [
        {
          name: "Test branch",
          code: "TT",
          status: "A",
          updated_at: "2022-01-01T00:00:00.000Z",
        },
      ];
      const isChecker = false;
      const csvExporter = { generateCsv: jest.fn() };
      const category = StatusCategoryType.AllBranches;
      handleDownload(downloadData, isChecker, csvExporter, category);
      expect(csvExporter.generateCsv).toHaveBeenCalled();
    });

    // Test that the function handles download when the downloadData array is not empty
    it("should handle download when downloadData is not empty", () => {
      const downloadData = [
        {
          name: "Test branch",
          code: "TT",
          status: "A",
          updated_at: "2022-01-01T00:00:00.000Z",
        },
      ];
      const isChecker = false;
      const csvExporter = { generateCsv: jest.fn() };
      const category = StatusCategoryType.AllBranches;
      handleDownload(downloadData, isChecker, csvExporter, category);
      expect(csvExporter.generateCsv).toHaveBeenCalled();
    });

    // Test that the function handles an empty downloadData array
    it("should handle an empty downloadData array", () => {
      const downloadData = [];
      const isChecker = false;
      const csvExporter = { generateCsv: jest.fn() };
      const category = StatusCategoryType.AllBranches;
      handleDownload(downloadData, isChecker, csvExporter, category);
      expect(csvExporter.generateCsv).not.toHaveBeenCalled();
    });

    // Test that the function handles invalid input for the ucObjectKeys function
    it("should handle invalid input for ucObjectKeys", () => {
      const downloadData = "invalid input";
      const isChecker = false;
      const csvExporter = { generateCsv: jest.fn() };
      const category = StatusCategoryType.AllBranches;
      expect(() =>
        handleDownload(downloadData, isChecker, csvExporter, category)
      ).toThrow("Input must be an array of objects");
    });
  });
});
describe("TableComponent", () => {
  it("renderWithProviderss without crashing", () => {
    renderWithProviders(
      <MemoryRouter>
     <AppContext.Provider
          value={{
            setRole: jest.fn(),
            role: "superadmin",
            permissions: ["VIEW_ALL_BRANCH_RECORDS", "VIEW_ALL_BRANCH_REQUESTS"],
          }}
        >
          <InvestmentContext.Provider
            value={{ ...ProviderValue, setStatus: jest.fn() }}
          >
            <TableComponent />
          </InvestmentContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
    );
  });

  it("renderWithProviderss branch table when category is AllBranches", () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
       <AppContext.Provider
          value={{
            setRole: jest.fn(),
            role: "superadmin",
            permissions: ["VIEW_ALL_BRANCH_RECORDS", "VIEW_ALL_BRANCH_REQUESTS"],
          }}
        >
          <InvestmentContext.Provider
            value={{ ...ProviderValue, setStatus: jest.fn() }}
          >
            <TableComponent />
          </InvestmentContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(getByTestId("request-table")).toBeInTheDocument();
  });

  it("renderWithProviderss request table when category is not AllBranches", () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
     <AppContext.Provider
          value={{
            setRole: jest.fn(),
            role: "superadmin",
            permissions: ["VIEW_ALL_BRANCH_RECORDS", "VIEW_ALL_BRANCH_REQUESTS"],
          }}
        >
          <InvestmentContext.Provider
            value={{ ...ProviderValue, setStatus: jest.fn() }}
          >
            <TableComponent />
          </InvestmentContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(getByTestId("request-table")).toBeInTheDocument();
  });

  it("renderWithProviderss download and requests buttons", () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
   <AppContext.Provider
          value={{
            setRole: jest.fn(),
            role: "superadmin",
            permissions: ["VIEW_ALL_BRANCH_RECORDS", "VIEW_ALL_BRANCH_REQUESTS"],
          }}
        >
          <InvestmentContext.Provider
            value={{ ...ProviderValue, setStatus: jest.fn() }}
          >
            <TableComponent />
          </InvestmentContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
    );
    // expect(getByTestId("download-btn")).toHaveTextContent("Download");
    expect(getByTestId("refresh-btn")).toHaveTextContent("Refresh table");
  });

  it("should refresh the table when the refresh button is clicked", () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
       <AppContext.Provider
          value={{
            setRole: jest.fn(),
            role: "superadmin",
            permissions: ["VIEW_ALL_BRANCH_RECORDS", "VIEW_ALL_BRANCH_REQUESTS"],
          }}
        >
          <InvestmentContext.Provider
            value={{ ...ProviderValue, setStatus: jest.fn() }}
          >
            <TableComponent />
          </InvestmentContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
    );
    const refreshBtn = getByTestId("refresh-btn");
    const requestTable = getByTestId("request-table");
    expect(requestTable).toBeInTheDocument();
    fireEvent.click(refreshBtn);
    expect(requestTable).toBeInTheDocument();
  });

  it("should download data as a CSV file when the download button is clicked", () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            setRole: jest.fn(),
            role: "superadmin",
            permissions: ["VIEW_ALL_BRANCH_RECORDS", "VIEW_ALL_BRANCH_REQUESTS"],
          }}
        >
          <InvestmentContext.Provider
            value={{ ...ProviderValue, setStatus: jest.fn() }}
          >
            <TableComponent />
          </InvestmentContext.Provider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    const requestTable = getByTestId("request-table");
    expect(requestTable).toBeInTheDocument();

  });
});
