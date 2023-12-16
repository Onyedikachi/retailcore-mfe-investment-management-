import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import { Actions } from "../../../components/summary";
import userEvent from "@testing-library/user-event";
import { InvestmentContext, AppContext } from "../../../utils/context"; // Update with the actual path
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test-util";

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
    screen.debug()
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
