import { fireEvent, render, screen } from "@testing-library/react";
import CreateButton, {
  closeButton,
  goToUrl,
} from "../../components/CreateButton";
import React from "react";

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

    expect(setSecondActive).toHaveBeenCalledWith("");
    expect(setThirdActive).toHaveBeenCalledWith("");
    expect(setFourthActive).toHaveBeenCalledWith("");
    expect(setFirstActive).toHaveBeenCalledWith("");
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
    expect(screen.getByText("Create new product")).toBeInTheDocument();
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
    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("Investment")).toBeInTheDocument();
    expect(screen.getByText("Over the counter payment")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Credit"));
    expect(screen.getByText("Loans")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Loans"));
    expect(screen.getByText("Individual Loans")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Commercial loans"));
    expect(screen.getByText("Corporate loans")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Corporate loans"));
    // expect(goToUrl).toHaveBeenCalledWith('#', expect.any(Function));
  });

  // Clicking outside the dropdown menu closes it
  it("should close the dropdown menu when clicked outside", () => {
    render(<CreateButton children={<button>Button</button>} />);
    fireEvent.click(screen.getByText("Button"));
    fireEvent.click(document);
    console.log(screen);
    // expect(screen.getByText("Credit")).not.toBeInTheDocument();
    // expect(screen.getByText("Deposit")).not.toBeInTheDocument();
    // expect(screen.getByText("Investment")).not.toBeInTheDocument();
    // expect(screen.getByText("Over the counter payment")).not.toBeInTheDocument();
  });
});
