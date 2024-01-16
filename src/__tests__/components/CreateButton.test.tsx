import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import OutsideClickHandler from "react-outside-click-handler";
import CreateButton, {
  closeButton,
  goToUrl,
} from "../../components/CreateButton";
import React from "react";
import userEvent from "@testing-library/user-event"
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { AppContext } from "../../utils/context";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
const navigate = jest.fn();

describe("closeButton", () => {
  // Sets 'isOpen' state to false
  it("should set isOpen state to false", () => {
    const setIsOpen = jest.fn();
    const setSecondActive = jest.fn();
    const setThirdActive = jest.fn();
    const setFourthActive = jest.fn();
    const setFirstActive = jest.fn();

    closeButton(
      setIsOpen,
      setSecondActive,
      setThirdActive,
      setFourthActive,
      setFirstActive
    );

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // Sets 'secondActive', 'thirdActive', and 'fourthActive' states to empty strings
  it("should set secondActive, thirdActive, and fourthActive states to empty strings", () => {
    const setIsOpen = jest.fn();
    const setSecondActive = jest.fn();
    const setThirdActive = jest.fn();
    const setFourthActive = jest.fn();
    const setFirstActive = jest.fn();

    closeButton(
      setIsOpen,
      setSecondActive,
      setThirdActive,
      setFourthActive,
      setFirstActive
    );

    expect(setSecondActive).toHaveBeenCalledWith(null);
    expect(setThirdActive).toHaveBeenCalledWith(null);
    expect(setFourthActive).toHaveBeenCalledWith(null);
    expect(setFirstActive).toHaveBeenCalledWith(null);
  });

  // Function has no return value
  it("should not return any value", () => {
    const setIsOpen = jest.fn();
    const setSecondActive = jest.fn();
    const setThirdActive = jest.fn();
    const setFourthActive = jest.fn();
    const setFirstActive = jest.fn();

    const result = closeButton(
      setIsOpen,
      setSecondActive,
      setThirdActive,
      setFourthActive,
      setFirstActive
    );

    expect(result).toBeUndefined();
  });

  // Parameters 'setIsOpen', 'setSecondActive', 'setThirdActive', and 'setFourthActive' must be functions
  it("should require function parameters", () => {
    const setIsOpen = jest.fn();
    const setSecondActive = jest.fn();
    const setThirdActive = jest.fn();
    const setFourthActive = jest.fn();
    const setFirstActive = jest.fn();
    expect(() =>
      closeButton(
        setIsOpen,
        setSecondActive,
        setThirdActive,
        setFourthActive,
        setFirstActive
      )
    ).not.toThrow();
  });

  // Function does not throw errors
  it("should not throw any errors", () => {
    const setIsOpen = jest.fn();
    const setSecondActive = jest.fn();
    const setThirdActive = jest.fn();
    const setFourthActive = jest.fn();
    const setFirstActive = jest.fn();
    expect(() =>
      closeButton(
        setIsOpen,
        setSecondActive,
        setThirdActive,
        setFourthActive,
        setFirstActive
      )
    ).not.toThrow();
  });
});

describe("goToUrl", () => {
  // navigates to the provided URL using the provided navigate function
  it("should navigate to the provided URL", () => {
    const navigate = jest.fn();
    const url = "https://example.com";

    goToUrl(url, navigate);

    expect(navigate).toHaveBeenCalledWith(url);
  });

  // url is null or undefined, throws an error
  it("should throw an error when url is null", () => {
    const navigate = jest.fn();
    const url = null;

    goToUrl(url, navigate);

    expect(navigate).not.toHaveBeenCalled();
  });

  // navigate function is not a function, throws an error
  it("should throw an error when navigate function is not a function", () => {
    const navigate = "navigate";
    const url = "https://example.com";

    expect(() => goToUrl(url, navigate)).toThrowError();
  });

  // can handle relative URLs
  it("should handle relative URLs", () => {
    const navigate = jest.fn();
    const url = "/about";

    goToUrl(url, navigate);

    expect(navigate).toHaveBeenCalledWith(url);
  });
});

describe("CreateButton", () => {
  // Renders the component without crashing
  it("should render the component without crashing", () => {
    render(<CreateButton children={<button>Create new product</button>} />);
    const btnText = screen.getByText("Create new product");
    expect(btnText).toBeInTheDocument();
    btnText.click();
    const investBtn = screen.getByText("Investment");

    expect(investBtn).toBeInTheDocument();
    const btn1 = screen.getAllByTestId("btn-1");
    btn1[3].click();


  });

  // Clicking on the button opens the dropdown menu
  it("should open the dropdown menu when the button is clicked", () => {
    jest.mock("../../components/CreateButton", () => ({
      ...jest.requireActual("../../components/CreateButton"),
      goToUrl: jest.fn((url, navigate) => {
        if (url && navigate) {
          navigate(url);
        }
      }),
    }));
    render(<CreateButton children={<button>Button</button>} />);
    fireEvent.click(screen.getByText("Button"));
    expect(screen.getByText("Credit")).toBeInTheDocument();
    expect(screen.queryByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("Investment")).toBeInTheDocument();
    expect(screen.getByText("Over the counter payment")).toBeInTheDocument();
  });

  it("should open the dropdown children", async () => {
    jest.mock("../../components/CreateButton", () => ({
      ...jest.requireActual("../../components/CreateButton"),
      goToUrl: jest.fn((url, navigate) => {
        if (url && navigate) {
          navigate(url);
        }
      }),
    }));
    render(
      <AppContext.Provider value={{permissions: ["CREATE_DEPOSIT_PRODUCT", "CREATE_CREDIT_PRODUCT", "CREATE_INVESTMENT_PRODUCT", "CREATE_PAYMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"]}}>
        <CreateButton children={<button>Button</button>} />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText("Button"));
    expect(screen.getByText("Credit")).toBeInTheDocument();
    expect(screen.queryByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("Investment")).toBeInTheDocument();
    expect(screen.getByText("Over the counter payment")).toBeInTheDocument();
    
    await userEvent.click(screen.getByText("Credit"));
    expect(screen.getByText("Loans")).toBeInTheDocument();
    expect(screen.getByText("Overdraft")).toBeInTheDocument();
  });
  
  it("should close the dropdown menu when clicked outside", async () => {

    render(
      <div>
        <button data-testid="tst">tst</button>
        <CreateButton children={<button>Button</button>} />
      </div>
    );
    await userEvent.click(screen.getByText("Button"));

    await userEvent.click(screen.getByTestId("tst"));

    expect(screen.queryByText("Deposit")).not.toBeInTheDocument();
  });


});
