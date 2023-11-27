import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  useGetPostBranchesMutation,
  useGetRequestsMutation,
  useActivateBranchMutation,
  useDeleteRequestMutation,
  useDeactivateBranchMutation,
  useGetBranchMembersQuery,
} from "../../../../../api";

// Import the components and exports you want to test
import {
  RequestTable,
  BranchTable,
  RequestDownloadTable,
  BranchDownloadTable,
} from "../../../../../components/branch-management/dashboard/tables";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
}));

jest.mock(".../../../../../api"); // Mock the api module

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

const mockStore = configureStore([]);

const mockGetPostBranchesMutation = jest.fn();
const mockGetRequestsMutation = jest.fn();
const mockActivateBranchMutation = jest.fn();
const mockDeleteRequestMutation = jest.fn();
const mockDeActivateBranchMutation = jest.fn();
const mockGetBranchMembersQuery = jest.fn();
beforeEach(() => {
  (useGetPostBranchesMutation as jest.Mock).mockReturnValue([
    mockGetPostBranchesMutation,
    {
      data: [],
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
    },
  ]);
  (useGetRequestsMutation as jest.Mock).mockReturnValue([
    mockGetRequestsMutation,
    {
      data: [],
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
    },
  ]);
  (useActivateBranchMutation as jest.Mock).mockReturnValue([
    mockActivateBranchMutation,
    {
      data: [],
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
    },
  ]);
  (useDeleteRequestMutation as jest.Mock).mockReturnValue([
    mockDeleteRequestMutation,
    {
      data: [],
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
    },
  ]);
  (useDeactivateBranchMutation as jest.Mock).mockReturnValue([
    mockDeActivateBranchMutation,
    {
      data: [],
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
    },
  ]);
  (useGetBranchMembersQuery as jest.Mock).mockReturnValue([
    mockGetBranchMembersQuery,
    {
      data: [],
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
    },
  ]);
});

// Test for RequestTable component
describe("RequestTable", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={mockStore({})}>
        <RequestTable refresh={false} setDownloadData={jest.fn()} />
      </Provider>
    );
  });

  // Write more tests for RequestTable component as needed
});

// Test for BranchTable component
describe("BranchTable", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={mockStore({})}>
        <BranchTable refresh={false} setDownloadData={jest.fn()} />{" "}
      </Provider>
    );
  });

  // Write more tests for BranchTable component as needed
});

// Test for RequestDownloadTable component (assuming it's the same as RequestTable)
describe("RequestDownloadTable", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={mockStore({})}>
        <RequestDownloadTable refresh={false} setDownloadData={jest.fn()} />{" "}
      </Provider>
    );
  });

  // Write more tests for RequestDownloadTable component as needed
});

// Test for BranchDownloadTable component (assuming it's the same as BranchTable)
describe("BranchDownloadTable", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={mockStore({})}>
        <BranchDownloadTable refresh={false} setDownloadData={jest.fn()} />{" "}
      </Provider>
    );
  });

  // Write more tests for BranchDownloadTable component as needed
});
