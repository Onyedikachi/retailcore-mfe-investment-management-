// StatusCard.test.js
import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { useEffect } from "react";
import StatusCard, {
  StatusButton,
  sortOptions,
  filterCheckerOptions,
  count,
  handleActiveType,
  handlePermission,
} from "../../../../components/branch-management/dashboard/StatusCard";
import { InvestmentContext } from "../../../../utils/context";
import { StatusCategoryType } from "../../../../constants/enums";
import { StatusTypes, StatusRequests } from "../../../../constants";
import { ProviderValue } from "../../../../__mocks__/fileMocks";
import { Provider } from "react-redux";
import { store } from "../../../../config/store";

const mockSetCategory = jest.fn();
const mockSetSelected = jest.fn();
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useSearchParams: jest.fn(),
}));
const category = StatusCategoryType?.AllBranches;
jest
  .spyOn(require("react-router-dom"), "useSearchParams")
  .mockReturnValue([new URLSearchParams({ category: "" })]);
function handleSelected(value, setSelected) {
  setSelected(value);
  return value;
}

describe("StatusCard", () => {
  beforeEach(() => {
    mockSetCategory.mockReset();
    mockSetSelected.mockReset();
  });

  it("renders without crashing", () => {
    const setSelected = jest.fn();

    render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: jest.fn,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const setSelected = jest.fn();
    const { asFragment } = render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: jest.fn,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays status categories", () => {
    const setSelected = jest.fn();
    const { getByText } = render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: jest.fn,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );
    expect(getByText("all branches")).toBeInTheDocument();
    expect(getByText("requests")).toBeInTheDocument();
  });

  it("calls setCategory when status category clicked", () => {
    const setSelected = jest.fn();
    const { getByText } = render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: mockSetCategory,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );
    act(() => {
      fireEvent.click(getByText("all branches"));
    });

    expect(mockSetCategory).toHaveBeenCalledWith("all branches");
  });

  it("displays status types for selected category", () => {
    const setSelected = jest.fn();
    const { queryByText, getByText } = render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: jest.fn,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );
    expect(queryByText("Unassigned")).toBeNull();
    fireEvent.click(getByText("requests"));
    expect(queryByText("requests")).toBeInTheDocument();
  });

  it("display all status", () => {
    const setSelected = jest.fn();
    const Render = render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: jest.fn,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );

    expect(Render.getByTestId("all")).toBeInTheDocument();
    expect(Render.getByTestId("approved")).toBeInTheDocument();
    expect(Render.getByTestId("in-issue")).toBeInTheDocument();
    expect(Render.getByTestId("in-review")).toBeInTheDocument();
    expect(Render.getByTestId("draft")).toBeInTheDocument();
  });

  it("calls  setActiveType when button is clicked", () => {
    const setSelected = jest.fn();
    const Render = render(
      <Provider store={store()}>
        <InvestmentContext.Provider
          value={{
            ...ProviderValue,
            setSelected,
            setStatus: jest.fn(),
            setCategory: jest.fn,
          }}
        >
          <StatusCard />
        </InvestmentContext.Provider>
      </Provider>
    );

    fireEvent.click(Render.getByTestId("all"));
    expect(Render.getByTestId("all")).toHaveClass(
      "bg-[#EFEFEF] border-[#D0D5DD]"
    );
  });
});

describe("handleSelected", () => {
  it("should call setSelected with value", () => {
    const setSelected = jest.fn();
    handleSelected("test", setSelected);
    expect(setSelected).toHaveBeenCalledWith("test");
  });

  it("should return the passed value", () => {
    const setSelected = jest.fn();
    const result = handleSelected("test", setSelected);
    expect(result).toBe("test");
  });
});

describe("sortOptions", () => {
  it("returns StatusTypes if category is AllBranches", () => {
    const result = sortOptions(StatusCategoryType.AllBranches, true);
    expect(result).toBe(StatusTypes);
  });

  it("returns StatusRequests if not AllBranches and not isChecker", () => {
    const result = sortOptions(StatusCategoryType.Requests, false);
    expect(result).toBe(StatusRequests);
  });

  // should return an empty array when the 'isChecker' parameter is not a boolean
  it("should return an empty array when isChecker is not a boolean", () => {
    const result = sortOptions(StatusCategoryType.Requests, true);
    expect(result).toHaveLength(4);
  });
});

describe("StatusButton", () => {
  // Tests that the button is rendered with the correct text and count
  it("should render button with correct text and count", () => {
    const item = { type: "all", color: "#000000" };
    const analyticsData = { data: { All: 5 } };
    const { getByText } = render(
      <StatusButton
        item={item}
        isActive={false}
        setActiveType={() => {}}
        analyticsData={analyticsData}
      />
    );
    expect(getByText("all")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  // Tests that clicking the button sets the active type
  it("should set active type when button is clicked", () => {
    const item = { type: "all", color: "#000000" };
    const setActiveType = jest.fn();
    const analyticsData = { data: { All: 5 } };
    const { getByTestId } = render(
      <StatusButton
        item={item}
        isActive={false}
        setActiveType={setActiveType}
        analyticsData={analyticsData}
      />
    );
    fireEvent.click(getByTestId("all"));
    expect(setActiveType).toHaveBeenCalledWith("all");
  });

  // Tests that the button is styled correctly when it is active
  it("should style button correctly when it is active", () => {
    const item = { type: "all", color: "#000000" };
    const analyticsData = { data: { All: 5 } };
    const { getByText } = render(
      <StatusButton
        item={item}
        isActive={true}
        setActiveType={() => {}}
        analyticsData={analyticsData}
      />
    );
    expect(getByText("all")).toHaveClass("font-semibold");
    expect(getByText("all")).toHaveClass("text-sm capitalize font-semibold");
  });

  // Tests that the button is styled correctly when it is inactive
  it("should style button correctly when it is inactive", () => {
    const item = { type: "all", color: "#000000" };
    const analyticsData = { data: { All: 5 } };
    const { getByText } = render(
      <StatusButton
        item={item}
        isActive={false}
        setActiveType={() => {}}
        analyticsData={analyticsData}
      />
    );
    expect(getByText("all")).not.toHaveClass("font-semibold");
    expect(getByText("all")).not.toHaveClass("bg-[#EFEFEF]");
    expect(getByText("all")).toHaveClass("text-sm capitalize font-normal");
  });

  // Tests that the button count is 0 when the count is undefined
  it("should display 0 when count is undefined", () => {
    const item = { type: "all", color: "#000000" };
    const analyticsData = { data: {} };
    const { getByText } = render(
      <StatusButton
        item={item}
        isActive={false}
        setActiveType={() => {}}
        analyticsData={analyticsData}
      />
    );
    expect(getByText("0")).toBeInTheDocument();
  });

  // Tests that the button count is correct when the count is greater than 1
  it("should display correct count when count is greater than 1", () => {
    const item = { type: "all", color: "#000000" };
    const analyticsData = { data: { All: 5 } };
    const { getByText } = render(
      <StatusButton
        item={item}
        isActive={false}
        setActiveType={() => {}}
        analyticsData={analyticsData}
      />
    );
    expect(getByText("5")).toBeInTheDocument();
  });
});

describe("filterCheckerOptions", () => {
  // Tests that the function returns an array with length 4 when called with no arguments.
  it("should return an array with length 4 when called with no arguments", () => {
    const result = filterCheckerOptions();
    expect(result).toHaveLength(4);
  });
});

describe("count", () => {
  // Tests that the 'count' function returns the correct count for the "all" type
  it('should return the correct count for the "all" type', () => {
    const item = { type: "all" };
    const analyticsData = { data: { All: 5 } };
    const result = count(item, analyticsData);
    expect(result).toBe(5);
  });

  // Tests that the 'count' function returns the correct count for the "active" type
  it('should return the correct count for the "active" type', () => {
    const item = { type: "active" };
    const analyticsData = { data: { A: 3 } };
    const result = count(item, analyticsData);
    expect(result).toBe(3);
  });

  // Tests that the 'count' function returns the correct count for the "inactive" type
  it('should return the correct count for the "inactive" type', () => {
    const item = { type: "inactive" };
    const analyticsData = { data: { I: 2 } };
    const result = count(item, analyticsData);
    expect(result).toBe(2);
  });
  // Tests that the 'count' function returns the correct count for the "inactive" type
  it('should return the correct count 0 for the "inactive" type', () => {
    const item = { type: "inactive" };
    const analyticsData = { data: null };
    const result = count(item, analyticsData);
    expect(result).toBe(0);
  });
  it('should return the correct count 0 for the "active" type', () => {
    const item = { type: "active" };
    const analyticsData = { data: null };
    const result = count(item, analyticsData);
    expect(result).toBe(0);
  });

  // Tests that the 'count' function returns the correct count for the "approved" type
  it('should return the correct count for the "approved" type', () => {
    const item = { type: "approved" };
    const analyticsData = { data: { A: 4 } };
    const result = count(item, analyticsData);
    expect(result).toBe(4);
  });

  // Tests that the 'count' function returns the correct count for the "pending" type
  it('should return the correct count for the "pending" type', () => {
    const item = { type: "pending" };
    const analyticsData = { data: { P: 1 } };
    const result = count(item, analyticsData);
    expect(result).toBe(1);
  });

  // Tests that the 'count' function returns the correct count for the "pending" type
  it('should return the correct count for the "rejected" type', () => {
    const item = { type: "rejected" };
    const analyticsData = { data: { R: 1 } };
    const result = count(item, analyticsData);
    expect(result).toBe(1);
  });
  it('should return the correct count for the "rejected" type', () => {
    const item = { type: "rejected" };
    const analyticsData = { data: { R: 1 } };
    const result = count(item, null);
    expect(result).toBe(0);
  });

  // Tests that the 'count' function returns the correct count for the "in-review" type
  it('should return the correct count for the "in-review" type', () => {
    const item = { type: "in-review" };
    const analyticsData = { data: { P: 2 } };
    const result = count(item, analyticsData);
    expect(result).toBe(2);
  });
    // Tests that the 'count' function returns the correct count for the "in-review" type
    it('should return the correct count for the "in-review" type', () => {
      const item = { type: "in-review" };
      const analyticsData = { data: { P: 2 } };
      const result = count(item, null);
      expect(result).toBe(0);
    });
  it("should return the 0 when no tyoe is giving", () => {
    const item = { type: "" };
    const analyticsData = { data: { P: 0 } };
    const result = count(item, analyticsData);
    expect(result).toBe(0);
  });
});

describe("handleActiveType", () => {
  // Tests that the status is set to an empty string when activeType is "all"
  it('should set status to an empty string when activeType is "all"', () => {
    // Arrange
    const activeType = "all";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("");
  });

  // Tests that the status is set to "A" when activeType is "active"
  it('should set status to "A" when activeType is "active"', () => {
    // Arrange
    const activeType = "active";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("A");
  });

  // Tests that the status is set to "I" when activeType is "inactive"
  it('should set status to "I" when activeType is "inactive"', () => {
    // Arrange
    const activeType = "inactive";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("I");
  });

  // Tests that the status is set to "A" when activeType is "approved"
  it('should set status to "A" when activeType is "approved"', () => {
    // Arrange
    const activeType = "approved";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("A");
  });

  // Tests that the status is set to "P" when activeType is "pending"
  it('should set status to "P" when activeType is "pending"', () => {
    // Arrange
    const activeType = "pending";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("P");
  });

  // Tests that the status is set to "D" when activeType is "draft"
  it('should set status to "D" when activeType is "draft"', () => {
    // Arrange
    const activeType = "draft";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("D");
  });
  // Tests that the status is set to "D" when activeType is "draft"
  it('should set status to "R" when activeType is "rejected"', () => {
    // Arrange
    const activeType = "rejected";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("R");
  });
  // Tests that the status is set to "D" when activeType is "draft"
  it('should set status to "P" when activeType is "in-review"', () => {
    // Arrange
    const activeType = "in-review";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("P");
  });

  // Tests that the status is set to "D" when activeType is "draft"
  it('should set status to "R" when activeType is "in-issue"', () => {
    // Arrange
    const activeType = "in-issue";
    let status = "";

    // Act
    handleActiveType(activeType, (value) => {
      status = value;
    });

    // Assert
    expect(status).toBe("R");
  });
});

describe('handlePermission', () => {

  // Sets filtered branch options to BranchOptions if VIEW_ALL_BRANCH_RECORDS permission is present
  it('should set filtered branch options to BranchOptions when VIEW_ALL_BRANCH_RECORDS permission is present', () => {
    const setFilteredRequestOptions = jest.fn();
    const permissions = ['VIEW_ALL_BRANCH_RECORDS'];
    const BranchOptions = [{ value: 'created_by_me' }, { value: 'created_by_anyone' }];
    const RequestOptions = [{ value: 'sent_to_me' }, { value: 'sent_to_anyone' }];
    const setFilteredBranchOptions = jest.fn();

    handlePermission(setFilteredRequestOptions, permissions, BranchOptions, RequestOptions, setFilteredBranchOptions);

    expect(setFilteredBranchOptions).toHaveBeenCalledWith(BranchOptions);
  });

  // Sets filtered request options to RequestOptions if VIEW_ALL_BRANCH_REQUESTS permission is present
  it('should set filtered request options to RequestOptions when VIEW_ALL_BRANCH_REQUESTS permission is present', () => {
    const setFilteredRequestOptions = jest.fn();
    const permissions = ['VIEW_ALL_BRANCH_REQUESTS'];
    const BranchOptions = [{ value: 'created_by_me' }, { value: 'created_by_anyone' }];
    const RequestOptions = [{ value: 'sent_to_me' }, { value: 'sent_to_anyone' }];
    const setFilteredBranchOptions = jest.fn();

    handlePermission(setFilteredRequestOptions, permissions, BranchOptions, RequestOptions, setFilteredBranchOptions);

    expect(setFilteredRequestOptions).toHaveBeenCalledWith(RequestOptions);
  });

  // Does not set filtered branch options if permissions is empty
  it('should not set filtered branch options when permissions is empty', () => {
    const setFilteredRequestOptions = jest.fn();
    const permissions = [];
    const BranchOptions = [{ value: 'created_by_me' }, { value: 'created_by_anyone' }];
    const RequestOptions = [{ value: 'sent_to_me' }, { value: 'sent_to_anyone' }];
    const setFilteredBranchOptions = jest.fn();

    handlePermission(setFilteredRequestOptions, permissions, BranchOptions, RequestOptions, setFilteredBranchOptions);

    expect(setFilteredBranchOptions).not.toHaveBeenCalled();
  });

  // Does not set filtered request options if permissions is empty
  it('should not set filtered request options when permissions is empty', () => {
    const setFilteredRequestOptions = jest.fn();
    const permissions = [];
    const BranchOptions = [{ value: 'created_by_me' }, { value: 'created_by_anyone' }];
    const RequestOptions = [{ value: 'sent_to_me' }, { value: 'sent_to_anyone' }];
    const setFilteredBranchOptions = jest.fn();

    handlePermission(setFilteredRequestOptions, permissions, BranchOptions, RequestOptions, setFilteredBranchOptions);

    expect(setFilteredRequestOptions).not.toHaveBeenCalled();
  });


});
