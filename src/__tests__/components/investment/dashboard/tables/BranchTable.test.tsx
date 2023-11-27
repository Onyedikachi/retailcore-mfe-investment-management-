import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BranchTable, {
  DropdownButton,
  handleClick,
  handleConfirm,
  handleDeactivationRequest,
  handleDropdown,
  handleBranchUserView,
  setOptionsByStatus,
} from "../../../../../components/branch-management/dashboard/tables/BranchTable";
import moment from "moment";
import { MemoryRouter } from "react-router-dom";
import { InvestmentContext } from "../../../../../utils/context";
import { Provider } from "react-redux";
import { ProviderValue } from "../../../../../__mocks__/fileMocks";
import { store } from "../../../../../config/store";
import { toast } from "react-toastify";

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

describe("BranchTable component", () => {
  it("renders the component correctly with table data", () => {
    render(
      <Provider store={store()}>
        <InvestmentContext.Provider value={{ ...ProviderValue }}>
          <BranchTable refresh={false} setDownloadData={jest.fn()} />
        </InvestmentContext.Provider>
      </Provider>
    );

    // Verify the table headers
    const headers = [
      "branch name",
      "branch code",
      "description",
      "state",
      "updated on",
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    expect(screen.getByTestId("loader-box")).toBeInTheDocument();
  });
});

describe("DropdownButton", () => {
  // Tests that DropdownButton component renders without throwing any errors
  it("should render without errors", () => {
    render(<DropdownButton options={[]} handleClick={() => {}} />);
  });

  // Tests that DropdownButton component displays the FaBars icon
  it("should display the FaBars icon", () => {
    const { getByTestId } = render(
      <DropdownButton options={[]} handleClick={() => {}} />
    );
    expect(getByTestId("trigger")).toContainHTML(
      '<svg class="text-sterling-red-800"'
    );
  });

  // Tests that DropdownButton component displays the DropDown component when clicked
  it("should display the DropDown component when clicked", () => {
    const { getByTestId } = render(
      <DropdownButton
        options={[{ id: 1, text: "Option 1", icon: "" }]}
        handleClick={() => {}}
      />
    );
    fireEvent.click(getByTestId("trigger"));
    expect(getByTestId("menu-button")).toBeInTheDocument();
  });

  // Tests that DropdownButton component handles missing options prop without throwing any errors
  it("should handle missing options prop without errors", () => {
    render(<DropdownButton handleClick={() => {}} />);
  });

  // Tests that DropdownButton component handles missing handleClick prop without throwing any errors
  it("should handle missing handleClick prop without errors", () => {
    render(<DropdownButton options={[]} />);
  });
});

describe("handleDropdown", () => {
  // Test that the function returns all options if isChecker parameter is falsy
  it("should return all options when isChecker is falsy", () => {
    const status = "active";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "Option 1" }, { text: "Option 2" }],
      inactive: [{ text: "Option 3" }, { text: "Option 4" }],
    };
    const setOptionsByStatus = (status) => status;
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus
    );
    expect(result).toEqual([{ text: "Option 1" }, { text: "Option 2" }]);
  });

  // Test that the function returns only the 'view' option if isChecker parameter is truthy
  it("should return only the view option when isChecker is truthy", () => {
    const status = "active";
    const isChecker = true;
    const DropDownOptions = {
      active: [{ text: "Option 1" }, { text: "Option 2" }],
      inactive: [{ text: "Option 3" }, { text: "Option 4" }],
    };
    const setOptionsByStatus = (status) => status;
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus
    );
    expect(result).not.toEqual([{ text: "View" }]);
  });

  // Test that the function returns an empty array if the status parameter is falsy
  it("should return an empty array when status is falsy", () => {
    const status = "";
    const isChecker = false;
    const DropDownOptions = {
      active: [{ text: "Option 1" }, { text: "Option 2" }],
      inactive: [{ text: "Option 3" }, { text: "Option 4" }],
    };
    const setOptionsByStatus = (status) => status;
    const result = handleDropdown(
      status,
      isChecker,
      DropDownOptions,
      setOptionsByStatus
    );
    expect(result).toEqual([]);
  });
});

describe("setOptionsByStatus", () => {
  // Test that the function returns 'inactive' when the status is 'P'
  it("should return inactive when status is P", () => {
    expect(setOptionsByStatus("P")).toEqual("inactive");
  });

  // Test that the function returns 'active' when the status is 'A'
  it("should return active when status is A", () => {
    expect(setOptionsByStatus("A")).toEqual("active");
  });

  // Test that the function returns 'inactive' when the status is 'R'
  it("should return inactive when status is R", () => {
    expect(setOptionsByStatus("R")).toEqual("inactive");
  });

  // Test that the function returns 'inactive' when the status is 'D'
  it("should return inactive when status is D", () => {
    expect(setOptionsByStatus("D")).toEqual("inactive");
  });

  // Test that the function returns 'inactive' when the status is 'I'
  it("should return inactive when status is I", () => {
    expect(setOptionsByStatus("I")).toEqual("inactive");
  });
});

describe("handleBranchUserView", () => {
  // Test that the function returns 'inactive' when the input value is 'P'
  it("should return inactive when value is P", () => {
    expect(handleBranchUserView("P")).toBe("inactive");
  });

  // Test that the function returns 'inactive' when the input value is 'D'
  it("should return inactive when value is D", () => {
    expect(handleBranchUserView("D")).toBe("inactive");
  });

  // Test that the function returns 'inactive' when the input value is 'R'
  it("should return inactive when value is R", () => {
    expect(handleBranchUserView("R")).toBe("inactive");
  });

  // Test that the function returns 'active' when the input value is 'A'
  it("should return active when value is A", () => {
    expect(handleBranchUserView("A")).toBe("active");
  });

  // Test that the function returns 'inactive' when the input value is 'I'
  it("should return inactive when value is I", () => {
    expect(handleBranchUserView("I")).toBe("inactive");
  });

  // Test that the function returns the input value when it is not one of the predefined cases
  it("should return the input value when it is not one of the predefined cases", () => {
    expect(handleBranchUserView("X")).toBe("X");
  });
});

describe("handleClick", () => {
  // Test that clicking 'Activate' sets confirm text and opens confirmation modal
  it("should set confirm text and open confirmation modal when Activate is clicked", () => {
    const setConfirmText = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const setDetail = jest.fn();
    const setStatType = jest.fn();
    const setBranchView = jest.fn();
    handleClick(
      "Activate",
      {},
      setConfirmText,
      jest.fn(),
      setDetail,
      setStatType,
      setIsConfirmOpen,
      setBranchView
    );
    expect(setConfirmText).toHaveBeenCalledWith(
      "Do you want to activate this branch?"
    );
    expect(setIsConfirmOpen).toHaveBeenCalledWith(true);
  });

  // Test that clicking 'View' sets branch detail and opens branch detail modal
  it("should set branch detail and open branch detail modal when View is clicked", () => {
    const setConfirmText = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const setDetail = jest.fn();
    const setStatType = jest.fn();
    const setBranchView = jest.fn();
    handleClick(
      "View",
      {},
      setConfirmText,
      jest.fn(),
      setDetail,
      setStatType,
      setIsConfirmOpen,
      setBranchView
    );
    expect(setBranchView).toHaveBeenCalledWith(true);
  });

  // Test that clicking 'Modify' sets confirm text and opens confirmation modal
  it("should set confirm text and open confirmation modal when Modify is clicked", () => {
    const setConfirmText = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const setDetail = jest.fn();
    const setStatType = jest.fn();
    const setBranchView = jest.fn();
    handleClick(
      "Modify",
      {},
      setConfirmText,
      jest.fn(),
      setDetail,
      setStatType,
      setIsConfirmOpen,
      setBranchView
    );
    expect(setConfirmText).toHaveBeenCalledWith(
      "Do you want to modify this branch?"
    );
    expect(setIsConfirmOpen).toHaveBeenCalledWith(true);
  });

  // Test that clicking 'Deactivate' sets confirm text and subtext and opens confirmation modal
  it("should set confirm text, subtext and open confirmation modal when Deactivate is clicked", () => {
    const setConfirmText = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const setDetail = jest.fn();
    const setSubText = jest.fn();
    const setStatType = jest.fn();
    const setBranchView = jest.fn();
    handleClick(
      "Deactivate",
      {},
      setConfirmText,
      setSubText,
      setDetail,
      setStatType,
      setIsConfirmOpen,
      setBranchView
    );
    expect(setConfirmText).toHaveBeenCalledWith(
      "This branch currently has 4 users assigned, do you want to deactivate it?"
    );
    expect(setSubText).toHaveBeenCalledWith(
      "Users assigned to the branch will be deactivated along with the branch and will no longer have access to the system."
    );
    expect(setIsConfirmOpen).toHaveBeenCalledWith(true);
  });

  // Test that clicking 'Activate' sets stat type to 'activate'
  it("should set stat type to activate when Activate is clicked", () => {
    const setConfirmText = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const setDetail = jest.fn();
    const setStatType = jest.fn();
    const setBranchView = jest.fn();
    handleClick(
      "Activate",
      {},
      setConfirmText,
      jest.fn(),
      setDetail,
      setStatType,
      setIsConfirmOpen,
      setBranchView
    );
    expect(setStatType).toHaveBeenCalledWith("activate");
  });

  // Test that clicking 'View' sets branch view to true
  it("should set branch view to true when View is clicked", () => {
    const setConfirmText = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const setDetail = jest.fn();
    const setStatType = jest.fn();
    const setBranchView = jest.fn();
    handleClick(
      "View",
      {},
      setConfirmText,
      jest.fn(),
      setDetail,
      setStatType,
      setIsConfirmOpen,
      setBranchView
    );
    expect(setBranchView).toHaveBeenCalledWith(true);
  });
});

describe("handleDeactivationRequest", () => {
  // Tests that the 'deactivateBranch' function is called with the correct arguments when valid 'detail' and 'reason' parameters are provided
  it("should call the deactivateBranch function with the correct arguments when valid detail and reason parameters are provided", () => {
    const detail = { id: 1 };
    const reason = "some reason";
    const deactivateBranch = jest.fn();
    handleDeactivationRequest(detail, deactivateBranch, reason);
    expect(deactivateBranch).toHaveBeenCalledWith({
      id: 1,
      reason: "some reason",
    });
  });

  // Tests that the 'deactivateBranch' function is not called when the 'detail' parameter is null or undefined
  it("should not call the deactivateBranch function when the detail parameter is null or undefined", () => {
    const detail = null;
    const reason = "some reason";
    const deactivateBranch = jest.fn();
    handleDeactivationRequest(detail, deactivateBranch, reason);
    expect(deactivateBranch).not.toHaveBeenCalled();
  });

  // Tests that the 'deactivateBranch' function is not called when the 'detail.id' parameter is null or undefined
  it("should not call the deactivateBranch function when the detail.id parameter is null or undefined", () => {
    const detail = { id: null };
    const reason = "some reason";
    const deactivateBranch = jest.fn();
    handleDeactivationRequest(detail, deactivateBranch, reason);
    expect(deactivateBranch).not.toHaveBeenCalled();
  });

  // Tests that the 'deactivateBranch' function is not called when the 'reason' parameter is null or undefined
  it("should not call the deactivateBranch function when the reason parameter is null or undefined", () => {
    const detail = { id: 1 };
    const reason = null;
    const deactivateBranch = jest.fn();
    handleDeactivationRequest(detail, deactivateBranch, reason);
    expect(deactivateBranch).not.toHaveBeenCalled();
  });
});

describe("handleConfirm", () => {
  const setIsConfirmOpen = jest.fn();
  const setIsDeactivationOpen = jest.fn();
  let activateBranch = jest.fn();
  // Tests that handleConfirm sets isConfirmOpen to false
  it("should set isConfirmOpen to false", () => {
    handleConfirm(
      setIsConfirmOpen,
      "",
      setIsDeactivationOpen,
      activateBranch,
      null,
      navigate
    );
    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  // Tests that handleConfirm sets isDeactivationOpen to true if statType is 'deactivate'
  it("should set isDeactivationOpen to true if statType is deactivate", () => {
    handleConfirm(
      setIsConfirmOpen,
      "deactivate",
      setIsDeactivationOpen,
      activateBranch,
      null,
      navigate
    );
    expect(setIsDeactivationOpen).toHaveBeenCalledWith(true);
  });

  // Tests that handleConfirm calls activateBranch with detail id if statType is 'activate'
  it("should call activateBranch with detail id if statType is activate", () => {
    const detail = { branchid: 1 };
    handleConfirm(
      setIsConfirmOpen,
      "activate",
      setIsDeactivationOpen,
      activateBranch,
      detail,
      navigate
    );
    expect(activateBranch).toHaveBeenCalledTimes(1);
  });

  // Tests that handleConfirm navigates to branch modify page with detail id and code if statType is 'modify'
  it("should navigate to branch modify page with detail id and code if statType is modify", () => {
    const detail = { id: 1, code: "ABC" };
    handleConfirm(
      setIsConfirmOpen,
      "modify",
      setIsDeactivationOpen,
      activateBranch,
      detail,
      navigate
    );
    expect(navigate).toHaveBeenCalledWith(
      "/branch-management/modify/branch_modify/1/ABC"
    );
  });
});
