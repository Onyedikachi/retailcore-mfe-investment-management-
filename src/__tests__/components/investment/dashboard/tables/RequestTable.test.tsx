import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RequestTable, {
  handleClick,
  handleConfirm,
  handleDeactivationRequest,
  handleReviewNav,
  handleViewNav,
} from "../../../../../components/branch-management/dashboard/tables/RequestTable";
import moment from "moment";
import { DropDownOptions } from "../../../../../constants";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ProviderValue } from "../../../../../__mocks__/fileMocks";
import { store } from "../../../../../config/store";
import { InvestmentContext } from "../../../../../utils/context";
import { renderWithProviders } from "../../../../../utils/test-util";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: jest.fn(),
}));
jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(navigate);

jest.mock("../../../../../components/modals/Confirm", () => {
  return () => <div data-testid="confirm-box">Confirm box</div>;
});
jest.mock("../../../../../components/Loader", () => {
  return () => <div data-testid="loader-box">Loader</div>;
});
jest.mock("../../../../../components/modals/Status", () => {
  return () => <div data-testid="success-box">Success</div>;
});
jest.mock("../../../../../components/modals/DeactivationRequest", () => {
  return () => <div data-testid="deactivate-box">Deactivation Request</div>;
});
describe("RequestTable component", () => {
  it("renders the component correctly with table data", () => {
    renderWithProviders(
      <MemoryRouter>
        <Provider store={store()}>
          <InvestmentContext.Provider value={{ ...ProviderValue }}>
            <RequestTable refresh={false} setDownloadData={jest.fn()} />
          </InvestmentContext.Provider>
        </Provider>
      </MemoryRouter>
    );

    // Verify the table headers
    const headers = ["request", "type", "initiator", "status", "updated on"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    expect(screen.getByTestId("loader-box")).toBeInTheDocument();
  });
});

describe("handleReviewNav", () => {
  // Test that handleReviewNav navigates to bulk branch creation review page when request type is BULK_CREATE
  it("should navigate to bulk branch creation review page when request type is BULK_CREATE", () => {
    const item = { id: 1, request_type: "BULK_CREATE" };
    const navigate = jest.fn();
    handleReviewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/bulk-branch-creation-review/1/review"
    );
  });

  // Test that handleReviewNav navigates to branch creation review page when request type is CREATE
  it("should navigate to branch creation review page when request type is CREATE", () => {
    const item = { id: 1, request_type: "CREATE" };
    const navigate = jest.fn();
    handleReviewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/branch-creation-review/1/review"
    );
  });

  // Test that handleReviewNav navigates to branch deactivation review page when request type is DEACTIVATE
  it("should navigate to branch deactivation review page when request type is DEACTIVATE", () => {
    const item = { id: 1, request_type: "DEACTIVATE" };
    const navigate = jest.fn();
    handleReviewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/branch-deactivation-review/1/review"
    );
  });

  // Test that handleReviewNav navigates to branch modification review page when request type is CHANGE
  it("should navigate to branch modification review page when request type is CHANGE", () => {
    const item = { id: 1, request_type: "CHANGE" };
    const navigate = jest.fn();
    handleReviewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/branch-modification-review/1/review"
    );
  });

  // Test that handleReviewNav navigates to branch creation review page by default
  it("should navigate to branch creation review page by default", () => {
    const item = { id: 1, request_type: "SOME_OTHER_TYPE" };
    const navigate = jest.fn();
    handleReviewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/branch-creation-review/1/review"
    );
  });
});

describe("handleViewNav", () => {
  // Test that the function navigates to the bulk branch creation view summary when the request type is BULK_CREATE
  it("should navigate to the bulk branch creation view summary when the request type is BULK_CREATE", () => {
    const item = {
      id: 1,
      request_type: "BULK_CREATE",
    };
    const navigate = jest.fn();
    handleViewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/bulk-branch-creation-view/summary/1/view?status=show",
      { state: "Bulk Branch Creation Review" }
    );
  });

  // Test that the function navigates to the branch creation view summary when the request type is CREATE
  it("should navigate to the branch creation view summary when the request type is CREATE", () => {
    const item = {
      id: 1,
      request_type: "CREATE",
    };
    const navigate = jest.fn();
    handleViewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/branch-creation-view/summary/1/view",
      { state: "Branch Creation Review" }
    );
  });

  // Test that the function navigates to the branch modification view summary when the request type is not BULK_CREATE or CREATE
  it("should navigate to the branch modification view summary when the request type is not BULK_CREATE or CREATE", () => {
    const item = {
      id: 1,
      request_type: "MODIFY",
    };
    const navigate = jest.fn();
    handleViewNav(item, navigate);
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/branch-modification-view/summary/1/view_only"
    );
  });
});

describe("handleClick", () => {
  // Test that clicking 'view' navigates to the request summary page with the correct ID
  it("should navigate to the request summary page with the correct ID when clicked", () => {
    const item = { id: 123 };
    const navigate = jest.fn();
    handleClick(
      "View",
      item,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn(),
      navigate
    );
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/request/summary/123/view?"
    );
  });

  // Test that clicking 'delete request' opens a confirmation modal
  it("should open a confirmation modal when clicked", () => {
    const item = { id: 123 };
    const setIsConfirmOpen = jest.fn();
    handleClick(
      "Delete Request",
      item,
      jest.fn(),
      setIsConfirmOpen,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn()
    );
    expect(setIsConfirmOpen).toHaveBeenCalledWith(true);
  });

  // Test that clicking 'continue request' navigates to the appropriate page with the correct parameters and request type
  it("should navigate to the appropriate page with the correct parameters and request type when clicked", () => {
    const item = { id: 123, request_type: "CREATE",   branches: [{ id: 1 }] };
    const navigate = jest.fn();
    handleClick(
      "Continue Request",
      item,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn(),
      navigate
    );
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/request/continue/request_create/single/123/1?type=draft&branchId=1"
    );
  });
});

describe("handleDeactivationRequest", () => {
  // Tests that the setSuccessText function is called with the correct message when handleDeactivationRequest is executed
  it("should call setSuccessText with the correct message", () => {
    const setSuccessText = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const setIsSuccessOpen = jest.fn();

    handleDeactivationRequest(
      setSuccessText,
      setIsDeactivationOpen,
      setIsSuccessOpen,
      "superadmin"
    );

    expect(setSuccessText).toHaveBeenCalledWith(
      "Branch deactivated successfully"
    );
  });

  // Tests that the setIsDeactivationOpen function is set to false when handleDeactivationRequest is executed
  it("should set setIsDeactivationOpen to false", () => {
    const setSuccessText = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const setIsSuccessOpen = jest.fn();

    handleDeactivationRequest(
      setSuccessText,
      setIsDeactivationOpen,
      setIsSuccessOpen,
      "superadmin"
    );

    expect(setIsDeactivationOpen).toHaveBeenCalledWith(false);
  });

  // Tests that the setIsSuccessOpen function is set to true when handleDeactivationRequest is executed
  it("should set setIsSuccessOpen to true", () => {
    const setSuccessText = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const setIsSuccessOpen = jest.fn();

    handleDeactivationRequest(
      setSuccessText,
      setIsDeactivationOpen,
      setIsSuccessOpen,
      "superadmin"
    );

    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
  });

  // Tests that the setSuccessText function is not called with an incorrect message when handleDeactivationRequest is executed
  it("should not call setSuccessText with an incorrect message", () => {
    const setSuccessText = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const setIsSuccessOpen = jest.fn();

    handleDeactivationRequest(
      setSuccessText,
      setIsDeactivationOpen,
      setIsSuccessOpen,
      "superadmin"
    );

    expect(setSuccessText).not.toHaveBeenCalledWith("Incorrect message");
  });

  // Tests that the setIsDeactivationOpen function is not set to true when handleDeactivationRequest is executed
  it("should not set setIsDeactivationOpen to true", () => {
    const setSuccessText = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const setIsSuccessOpen = jest.fn();

    handleDeactivationRequest(
      setSuccessText,
      setIsDeactivationOpen,
      setIsSuccessOpen,
      "superadmin"
    );

    expect(setIsDeactivationOpen).not.toHaveBeenCalledWith(true);
  });

  // Tests that the setIsSuccessOpen function is not set to false when handleDeactivationRequest is executed
  it("should not set setIsSuccessOpen to false", () => {
    const setSuccessText = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const setIsSuccessOpen = jest.fn();

    handleDeactivationRequest(
      setSuccessText,
      setIsDeactivationOpen,
      setIsSuccessOpen,
      "superadmin"
    );

    expect(setIsSuccessOpen).not.toHaveBeenCalledWith(false);
  });
});

describe("handleConfirm", () => {
  // Tests that setIsConfirmOpen is called with false
  it("should call setIsConfirmOpen with false", () => {
    const setIsConfirmOpen = jest.fn();
    handleConfirm(null, setIsConfirmOpen, null, null, null, null);
    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  // Tests that deleteRequest is called with detail.id and setSuccessText is set correctly when statType is 'withdraw & delete request'
  it("should call deleteRequest with detail.id and setSuccessText correctly", () => {
    const detail = { id: 1, description: "test", branches: [{ id: 1 }], };
    const deleteRequest = jest.fn();
    const setSuccessText = jest.fn();
    handleConfirm(
      "withdraw & delete request",
      jest.fn(),
      deleteRequest,
      setSuccessText,
      null,
      detail
    );
    expect(deleteRequest).toHaveBeenCalledWith(1);
    expect(setSuccessText).toHaveBeenCalledWith(
      "Request withdrawn and deleted successfully"
    );
  });

  // Tests that navigate is called with the correct URL when statType is 'withdraw & modify'
  it("should call navigate with the correct URL", () => {
    const detail = {
      id: 1,
      request_type: "BULK_CREATE",
      branches: [{ id: 1 }],
    };
    const navigate = jest.fn();
    handleConfirm(
      "withdraw & modify",
      jest.fn(),
      null,
      jest.fn(),
      navigate,
      detail
    );
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/request/modify/bulk/1/1?type=pending"
    );
  });
});
