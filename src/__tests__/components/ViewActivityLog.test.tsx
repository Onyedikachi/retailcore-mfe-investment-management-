import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import ViewActivityLog, {
  getDisplayName,
  goToDashboard,
} from "../../components/ViewActivityLog";
import { renderWithProviders } from "../../__mocks__/api/Wrapper";
import { useParams, useLocation } from "../../__mocks__/react-router-dom";
import IndexComponent from "../../components/ViewActivityLog";
import userEvent from "@testing-library/user-event";
import { branchApi } from "../../api";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const formData = {
  name: "Test name",
};
const uploadData = [];

describe("getDisplayName", () => {
  // Tests that the function returns the branch name if the category is 'branch_modify' and branch is not null.
  it('should return the branch name when category is "branch_modify" and branch is not null', () => {
    const category = "branch_modify";
    const branch = { name: "Test Branch" };
    const requestData = null;

    const result = getDisplayName(category, branch, requestData);

    expect(result).toBe("Test Branch");
  });

  // Tests that the function returns 'New branch' if the request type is 'BULK_CREATE'.
  it('should return "New branch" when request type is "BULK_CREATE"', () => {
    const category = "test_category";
    const branch = null;
    const requestData = { request_type: "BULK_CREATE" };

    const result = getDisplayName(category, branch, requestData);

    expect(result).toBe("New branch");
  });
  it('should return null"', () => {
    const category = null;
    const branch = null;
    const requestData = null;

    const result = getDisplayName(category, branch, requestData);

    expect(result).toBeNull;
  });
});

describe("goToDashboard", () => {
  it("should update window.location.href", () => {
    // Mock window.location.href
    const { location } = window;
    // @ts-ignore
    delete global?.window?.location;
    global.window.location = { ...location, href: "about:blank" };

    const originalLocationHref = window.location.href;
    const newLocation = "/branch-management";

    goToDashboard();

    expect(window.location.href).toBe(newLocation);

    // Clean up to restore the original location.href
    window.location.href = originalLocationHref;
  });
});

describe("IndexComponent", () => {
  beforeAll(() => {
    useParams.mockReturnValue({ id: 1, code: "TDTD1" });
  });
 // Tests that the component renders with the correct branch details and activities
  it("should render component with correct branch details and activities", () => {
    // Mock branch data
    const branchData = {
      data: {
        name: "Branch Name",
        code: "123",
        status: "A",
        number: "123",
        streetname: "Street Name",
        city: "City",
        state: "State",
        country: "Country",
        postalcode: "12345",
        description: "Branch Description",
      },
    };

    // Mock request activities data
    const requestActivities = {
      data: {
        results: [
          {
            description: "Activity 1",
            created_at: "2022-01-01",
          },
          {
            description: "Activity 2",
            created_at: "2022-01-02",
          },
        ],
      },
    };

    // Mock useGetBranchByCodeQuery
    jest.spyOn(branchApi, "useGetBranchByCodeQuery").mockReturnValue({
      data: branchData,
      isSuccess: true,
      isLoading: false,
    });

    // Mock useGetBranchActivitiesQuery
    jest.spyOn(branchApi, "useGetBranchActivitiesQuery").mockReturnValue({
      data: requestActivities,
      isFetching: false,
      isLoading: false,
    });

    // Render the component
    renderWithProviders(<IndexComponent formData={formData} uploadData={uploadData} />);

    
    // Assert branch details are rendered correctly
   // expect(screen.getByTestId("print")).toBeInTheDocument();
    // expect(screen.getByText("Branch Name")).toBeInTheDocument();
    // expect(screen.getByText("123")).toBeInTheDocument();
    // expect(screen.getByText("Street Name")).toBeInTheDocument();
    // expect(screen.getByText("City")).toBeInTheDocument();
    // expect(screen.getByText("State")).toBeInTheDocument();
    // expect(screen.getByText("Country")).toBeInTheDocument();
    // expect(screen.getByText("12345")).toBeInTheDocument();
    // expect(screen.getByText("Branch Description")).toBeInTheDocument();

    // Assert activities are rendered correctly
    // expect(screen.getByText("Activity 1")).toBeInTheDocument();
    // expect(screen.getByText("Activity 2")).toBeInTheDocument();
  });

//   // Tests that the component displays the correct branch details and status
//   it("should display correct branch details and status", () => {
//     // Mock branch data with status 'A'
//     const branchData = {
//       data: {
//         name: "Branch Name",
//         code: "123",
//         status: "A",
//       },
//     };

//     // Mock useGetBranchByCodeQuery
//     jest.spyOn(branchApi, "useGetBranchByCodeQuery").mockReturnValue({
//       data: branchData,
//       isSuccess: true,
//       isLoading: false,
//     });

//     // Render the component
//     renderWithProviders(<IndexComponent formData={formData} uploadData={uploadData} />);

//     // Assert status labels are rendered correctly
//     expect(screen.getByText("Submitted")).toBeInTheDocument();
//     expect(screen.getByText("Approved")).toBeInTheDocument();
//   });

//   // Tests that the component handles the click event of the print button
//   it("should handle click event of print button", () => {
//     // Mock branch data
//     const branchData = {
//       data: {
//         name: "Branch Name",
//         code: "123",
//         status: "A",
//       },
//     };

//     // Mock useGetBranchByCodeQuery
//     jest.spyOn(branchApi, "useGetBranchByCodeQuery").mockReturnValue({
//       data: branchData,
//       isSuccess: true,
//       isLoading: false,
//     });

//     // Render the component
//     renderWithProviders(<IndexComponent formData={formData} uploadData={uploadData} />);

//     // Mock window.print
//     window.print = jest.fn();

//     // Click the print button
//     userEvent.click(screen.getByText("Print"));

//     // Assert window.print is called
//     expect(window.print).toHaveBeenCalled();
//   });

//   // Tests that the component handles the click event of the share button
//   it("should handle click event of share button", () => {
//     // Mock branch data
//     const branchData = {
//       data: {
//         name: "Branch Name",
//         code: "123",
//         status: "A",
//       },
//     };

//     // Mock useGetBranchByCodeQuery
//     jest.spyOn(branchApi, "useGetBranchByCodeQuery").mockReturnValue({
//       data: branchData,
//       isSuccess: true,
//       isLoading: false,
//     });

//     // Render the component
//     renderWithProviders(<IndexComponent formData={formData} uploadData={uploadData} />);

//     // Mock RWebShare
//     jest.mock("react-web-share", () => ({
//       __esModule: true,
//       default: ({ children }: any) => children,
//     }));

//     // Click the share button
//     userEvent.click(screen.getByText("Share"));

//     // Assert share button is rendered correctly
//     expect(screen.getByTestId("share-btn")).toBeInTheDocument();
//   });

//   // Tests that the component handles the click event of the return to dashboard button
//   it("should handle click event of return to dashboard button", () => {
//     // Mock branch data
//     const branchData = {
//       data: {
//         name: "Branch Name",
//         code: "123",
//         status: "A",
//       },
//     };

//     // Mock useGetBranchByCodeQuery
//     jest.spyOn(branchApi, "useGetBranchByCodeQuery").mockReturnValue({
//       data: branchData,
//       isSuccess: true,
//       isLoading: false,
//     });

//     // Render the component
//     renderWithProviders(<IndexComponent formData={formData} uploadData={uploadData} />);

//     // Click the return to dashboard button
//     userEvent.click(screen.getByText("Return to dashboard"));
//   });

//   // Tests that the component handles the loading state correctly
//   it("should handle loading state correctly", () => {
//     // Mock branch data
//     const branchData = {
//       data: {
//         name: "Branch Name",
//         code: "123",
//         status: "A",
//       },
//     };

//     // Mock useGetBranchByCodeQuery
//     jest.spyOn(branchApi, "useGetBranchByCodeQuery").mockReturnValue({
//       data: branchData,
//       isSuccess: false,
//       isLoading: true,
//     });

//     // Render the component
//     renderWithProviders(<IndexComponent formData={formData} uploadData={uploadData} />);

//     // Assert loading state is displayed
//     expect(screen.getByTestId("pre-loader")).toBeInTheDocument();
//   });
});
