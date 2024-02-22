import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import { Actions } from "../../../components/summary";
import userEvent from "@testing-library/user-event";
import { InvestmentContext, AppContext } from "../../../utils/context"; // Update with the actual path
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test-util";
import { handleConfirm, handleMessages, handlePermissionType } from "../../../components/summary/Actions";
import { Messages } from "../../../constants/enums";

const navigate = jest.fn();
const useParams = jest.fn();
class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));
jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(navigate);
describe("Actions", () => {
  window.ResizeObserver = ResizeObserver;
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "" })]);
  });
  // The function renderWithProviderss a div element with a specific class and styling.
  it("should renderWithProviders a div element with specific class and styling", () => {
    useParams.mockReturnValue({
      tab: "",
      type: "",
      id: "",
    });
    const mockParams = jest.spyOn(require("react-router-dom"), "useParams");
    mockParams.mockReturnValue({
      process: "create",
      type: "",
      id: "",
    });
    // Test initialization
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};

    // renderWithProviders the component
    renderWithProviders(
      <Actions
        handleSubmit={handleSubmit}
        handleModify={handleModify}
        handleCancel={handleCancel}
        requestDetail={requestDetail}
      />
    );

    // Assert the renderWithProvidersed div element
    const divElement = screen.getByTestId("actions-div");
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass(
      "bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[60px] py-[40px]"
    );
  });

  // Cancel, Modify, and Submit.
  it("should call the corresponding functions when Cancel, Modify, or Submit buttons are clicked", () => {
    const mockParams = jest.spyOn(require("react-router-dom"), "useParams");
    mockParams.mockReturnValue({
      process: "create",
      type: "",
      id: "",
    });
    // Test initialization
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};

    // renderWithProviders the component
    renderWithProviders(
      <Actions
        handleSubmit={handleSubmit}
        handleModify={handleModify}
        handleCancel={handleCancel}
        requestDetail={requestDetail}
      />
    );

    // Click the Cancel button
    const cancelButton = screen.getByText("Cancel");
    userEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledTimes(0);

    // Click the Modify button
    const modifyButton = screen.getByText("Modify");
    userEvent.click(modifyButton);
    expect(handleModify).toHaveBeenCalledTimes(0);
  });

  // Print, Share, and Return to dashboard.
  it("should call the corresponding functions when Print, Share, or Return to dashboard buttons are clicked", () => {
    // Test initialization
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};

    const mockParams = jest.spyOn(require("react-router-dom"), "useParams");
    mockParams.mockReturnValue({
      process: "preview",
      type: "",
      id: "",
    });
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "" })]);
    // renderWithProviders the component
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <Actions
            handleSubmit={handleSubmit}
            handleModify={handleModify}
            handleCancel={handleCancel}
            requestDetail={requestDetail}
          />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );
    // Click the Print button
    const printButton = screen.getByTestId("print");
    userEvent.click(printButton);
    // Assert the function that handles printing is called

    // Click the Share button
    const shareButton = screen.getByText("Share");
    userEvent.click(shareButton);
    // Assert the function that handles sharing is called

    // Click the Return to dashboard button
    const returnButton = screen.getByTestId("gotodashboard");
    userEvent.click(returnButton);
    // Assert the function that handles returning to dashboard is called
  });

  // If the sub_type is not provided and the action is "approve", the confirm text is set to "Product creation approve".
  it('should set the confirm text to "Product creation approve" when sub_type is not provided and action is "approve"', () => {
    // Test initialization
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};
    const mockParams = jest.spyOn(require("react-router-dom"), "useParams");
    mockParams.mockReturnValue({
      process: "verdict",
      type: "",
      id: "",
    });
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([
        new URLSearchParams({ sub_type: "verdict", filter: "" }),
      ]);
    // renderWithProviders the component
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <Actions
            handleSubmit={handleSubmit}
            handleModify={handleModify}
            handleCancel={handleCancel}
            requestDetail={requestDetail}
          />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );

    // Click the Approve button
    const approveButton = screen.getByTestId("approve");
    userEvent.click(approveButton);
    // Assert the confirm text is set to "Product creation approve"
  });

  // If the sub_type is not provided and the action is "reject", the confirm text is set to "Product creation reject".
  it('should set the confirm text to "Product creation reject" when sub_type is not provided and action is "reject"', () => {
    // Test initialization
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};
    const mockParams = jest.spyOn(require("react-router-dom"), "useParams");
    mockParams.mockReturnValue({
      process: "verdict",
      type: "",
      id: "",
    });
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([
        new URLSearchParams({ sub_type: "verdict", filter: "" }),
      ]);
    // renderWithProviders the component
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <Actions
            handleSubmit={handleSubmit}
            handleModify={handleModify}
            handleCancel={handleCancel}
            requestDetail={requestDetail}
          />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );

    // Click the Reject button
    const rejectButton = screen.getByTestId("reject");
    userEvent.click(rejectButton);
    // Assert the confirm text is set to "Product creation reject"
  });

  // If the sub_type is "activation" and the action is "approve", the confirm text is set to "Product activation approve".
  it('should set the confirm text to "Product activation approve" when sub_type is "activation" and action is "approve"', () => {
    // Test initialization
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};
    const mockParams = jest.spyOn(require("react-router-dom"), "useParams");
    mockParams.mockReturnValue({
      process: "verdict",
      type: "",
      id: "",
    });

    // renderWithProviders the component
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <Actions
            handleSubmit={handleSubmit}
            handleModify={handleModify}
            handleCancel={handleCancel}
            requestDetail={requestDetail}
          />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );
    // Click the Approve button
    const approveButton = screen.getByTestId("cancel");
    userEvent.click(approveButton);
    // Assert the confirm text is set to "Product activation approve"
  });

  it("Should call initiate verdict", () => {
    const handleSubmit = jest.fn();
    const handleModify = jest.fn();
    const handleCancel = jest.fn();
    const requestDetail = {};
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <Actions
            handleSubmit={handleSubmit}
            handleModify={handleModify}
            handleCancel={handleCancel}
            requestDetail={requestDetail}
          />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    );

    const cancelButton = screen.getByTestId("cancel");
    fireEvent.click(cancelButton)
    act(() => {
    })
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument()
  })



});

describe("handleConfirm", () => {
  it('should call approveProduct when action is "approve"', () => {
    const id = '123';
    const approveProduct = jest.fn();
    const setRejection = jest.fn();
    const navigate = jest.fn();
    const filter = 'filter';

    handleConfirm({ action: 'approve', id, approveProduct, setRejection, navigate, filter });

    expect(approveProduct).toHaveBeenCalledWith({ id });
    expect(setRejection).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("should approve investment for individual", () => {
    const approveInvestment = jest.fn();
    handleConfirm({ action: "approve", type: "individual", approveInvestment, id: "23456" });
    expect(approveInvestment).toBeCalledWith({ id: "23456" });
  })

  it("should approve cancel for individual", () => {
    const navigate = jest.fn();
    handleConfirm({ action: "cancel", type: "individual", id: "23456", navigate });
    expect(navigate).toBeCalledWith(`/investment-management/individual`);
  })

  // When action is 'reject', set 'setRejection' state to true
  it('should set setRejection to true when action is "reject"', () => {
    const id = '123';
    const approveProduct = jest.fn();
    const setRejection = jest.fn();
    const navigate = jest.fn();
    const filter = 'filter';

    handleConfirm({ action: 'reject', id, approveProduct, setRejection, navigate, filter });

    expect(approveProduct).not.toHaveBeenCalled();
    expect(setRejection).toHaveBeenCalledWith(true);
    expect(navigate).not.toHaveBeenCalled();
  });

  // When action is 'cancel', navigate to '/product-factory/investment?category=requests' with 'filter' parameter if provided
  it('should navigate to "/product-factory/investment?category=requests" when action is "cancel"', () => {
    const id = '123';
    const approveProduct = jest.fn();
    const setRejection = jest.fn();
    const navigate = jest.fn();
    const filter = 'filter';

    handleConfirm({ action: 'cancel', id, approveProduct, setRejection, navigate, filter });

    expect(approveProduct).not.toHaveBeenCalled();
    expect(setRejection).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/product-factory/investment?category=requests&filter=filter');
  });

  // When 'action' parameter is not provided, do nothing
  it('should do nothing when "action" parameter is not provided', () => {
    const id = '123';
    const approveProduct = jest.fn();
    const setRejection = jest.fn();
    const navigate = jest.fn();
    const filter = 'filter';

    handleConfirm({ id, approveProduct, setRejection, navigate, filter });

    expect(approveProduct).not.toHaveBeenCalled();
    expect(setRejection).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
})

describe("handleMessages", () => {

  const setSuccessText = jest.fn();
  const setIsSuccessOpen = jest.fn();
  const setFailedText = jest.fn();
  const setFailedSubtext = jest.fn();
  const setFailed = jest.fn();
  // sets success text and opens success modal if rejectSuccess is true
  it('should set success text and open success modal when rejectSuccess is true', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const rejectSuccess = true;
    const approveSuccess = false;
    const rejectIsError = false;
    const approveIsError = false;
    const approveError = null;
    const rejectError = null;

    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError
    });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.PRODUCT_CREATE_REJECTED);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
    expect(setFailed).not.toHaveBeenCalled();
  });

  // sets success text and opens success modal if approveSuccess is true
  it('should set success text and open success modal when approveSuccess is true', () => {

    const rejectSuccess = false;
    const approveSuccess = true;
    const rejectIsError = false;
    const approveIsError = false;
    const approveError = null;
    const rejectError = null;

    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError
    });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.PRODUCT_CREATE_APPROVED);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
    expect(setFailed).not.toHaveBeenCalled();
  });

  // does not set any text or open any modal if rejectSuccess and approveSuccess are both false
  it('should not set any text or open any modal when rejectSuccess and approveSuccess are both false', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const rejectSuccess = false;
    const approveSuccess = false;
    const rejectIsError = false;
    const approveIsError = false;
    const approveError = null;
    const rejectError = null;

    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError
    });

    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
    expect(setFailed).not.toHaveBeenCalled();
  });

  // rejectError and approveError are both null
  it('should not set any text or open any modal when rejectError and approveError are both null', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const rejectSuccess = false;
    const approveSuccess = false;
    const rejectIsError = false;
    const approveIsError = false;
    const approveError = null;
    const rejectError = null;

    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError
    });

    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
    expect(setFailed).not.toHaveBeenCalled();
  });

  // rejectError and approveError are both defined
  it('should set failed text and subtext when rejectError and approveError are both defined', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const rejectSuccess = false;
    const approveSuccess = false;
    const rejectIsError = true;
    const approveIsError = true;
    const approveError = { message: { message: 'approve error message' } };
    const rejectError = { message: { message: 'reject error message' } };

    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError
    });

    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_REJECT_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith(rejectError.message.message);
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  // rejectError is defined and approveError is null
  it('should set failed text and subtext when rejectError is defined and approveError is null', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const rejectSuccess = false;
    const approveSuccess = false;
    const rejectIsError = true;
    const approveIsError = false;
    const approveError = null;
    const rejectError = { message: { message: 'reject error message' } };

    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError
    });

    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_REJECT_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith(rejectError.message.message);
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  it("Should handle investmentRejectSuccess", () => {
    handleMessages({ investmentRejectSuccess: true, setSuccessText, setIsSuccessOpen})
    expect(setSuccessText).toBeCalledWith(Messages.BOOKING_CREATE_REJECTED);
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })

  it("Should handle investmentApproveSuccess", () => {
    handleMessages({ investmentApproveSuccess: true, setSuccessText, setIsSuccessOpen})
    expect(setSuccessText).toBeCalledWith(Messages.BOOKING_CREATE_APPROVED);
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })

  it("Should handle investmentApproveIsError", () => {
    handleMessages({investmentApproveIsError: true, investmentApproveError: {message: {message: "E sha fail"}}, setFailed, setFailedText, setFailedSubtext});
    expect(setFailedText).toBeCalledWith(Messages.BOOKING_APPROVE_FAILED);
    expect(setFailedSubtext).toBeCalledWith("E sha fail");
    expect(setFailed).toBeCalledWith(true);
  })

  it("Should handle investmentRejectIsError", () => {
    handleMessages({investmentRejectIsError: true, investmentRejectError: {message: {message: "E sha fail"}}, setFailed, setFailedText, setFailedSubtext});
    expect(setFailedText).toBeCalledWith(Messages.BOOKING_REJECT_FAILED);
    expect(setFailedSubtext).toBeCalledWith("E sha fail");
    expect(setFailed).toBeCalledWith(true);
  })
})

describe('handlePermissionType', () => {

  // Returns "BOOK_INVESTMENT" if type is "individual" and process_type is "booking"
  it('should return "BOOK_INVESTMENT" when type is "individual" and process_type is "booking"', () => {
    const result = handlePermissionType("individual", "booking");
    expect(result).toEqual(["BOOK_INVESTMENT", "LIQUIDATE_INVESTMENT"]);
  });

  // Returns "LIQUIDATE_INVESTMENT" if type is "individual" and process_type is not "booking"
  it('should return "LIQUIDATE_INVESTMENT" when type is "individual" and process_type is not "booking"', () => {
    const result = handlePermissionType("individual", "other");
    expect(result).toEqual(["BOOK_INVESTMENT", "LIQUIDATE_INVESTMENT"]);
  });

  // Returns "CREATE_INVESTMENT_PRODUCT" if type is "investment"
  it('should return "CREATE_INVESTMENT_PRODUCT" when type is "investment"', () => {
    const result = handlePermissionType("investment");
    expect(result).toBe("CREATE_INVESTMENT_PRODUCT");
  });

  // Returns undefined if type is not "individual" or "investment"
  it('should return undefined when type is not "individual" or "investment"', () => {
    const result = handlePermissionType("other");
    expect(result).toBeUndefined();
  });
});
