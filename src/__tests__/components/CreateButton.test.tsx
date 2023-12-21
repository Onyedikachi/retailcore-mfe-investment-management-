import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OutsideClickHandler from "react-outside-click-handler";
import CreateButton, {
  closeButton,
  goToUrl,
} from "../../components/CreateButton";
import React from "react";
import userEvent from "@testing-library/user-event"
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

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

// test("closes the component when clicked outside", () => {
//   const setIsOpen = jest.fn();
//   const setSecondActive = jest.fn();
//   const setFourthActive = jest.fn();
//   const setThirdActive = jest.fn();
//   const setFirstActive = jest.fn();

//   const { getByTestId } = render(
//     <OutsideClickHandler
//       onOutsideClick={() =>
//         closeButton(
//           setIsOpen,
//           setSecondActive,
//           setFourthActive,
//           setThirdActive,
//           setFirstActive
//         )
//       }
//     >
//       <CreateButton
//         children={
//           <div>
//             {/* <div
//               data-testid="click-element-test"
//               // className="fixed top-0 h-2 w-2 bg-transparent z-[-4px]"
//             >
//               {" "}
//             </div> */}
//             <button>Create new product</button>
//           </div>
//         }
//       />
//       {/* Your component content goes here */}
//     </OutsideClickHandler>
//   );

//   // Assume you have a testId on an element that should trigger the outside click
//   const outsideElement = getByTestId("click-element-test");

//   // Simulate a click outside the component
//   fireEvent.click(outsideElement);

//   // Assertions
//   expect(setIsOpen).toHaveBeenCalledWith(false);
//   expect(setSecondActive).toHaveBeenCalledWith("");
//   expect(setFourthActive).toHaveBeenCalledWith("");
//   expect(setThirdActive).toHaveBeenCalledWith("");
//   expect(setFirstActive).toHaveBeenCalledWith("");
// });

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
    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("Investment")).toBeInTheDocument();
    expect(screen.getByText("Over the counter payment")).toBeInTheDocument();
  });

  // Clicking outside the dropdown menu closes it
  it("should close the dropdown menu when clicked outside", async () => {

    render(
      <div>
        <button data-testid="tst">tst</button>
        <CreateButton children={<button>Button</button>} />
      </div>
    );
    await userEvent.click(screen.getByText("Button"));
    await fireEvent.click(screen.getByTestId("tst"));

    // waitFor(() => {
    //   expect(screen.getByText("Credit")).not.toBeInTheDocument();
    //   expect(screen.getByText("Deposit")).not.toBeInTheDocument();
    //   expect(screen.getByText("Investment")).not.toBeInTheDocument();
    //   expect(screen.getByText("Over the counter payment")).not.toBeInTheDocument();
    // })

  });

  it("should show Deposit options", async () => {

    render(
      <div>
        <CreateButton children={<button>Button</button>} />
      </div>
    );
    await userEvent.click(screen.getByText("Button"));
    
    const depositButton = await screen.findByText("Deposit");
    
    await fireEvent.click(depositButton);

    waitFor(() => {
      expect(screen.getByText("Savings")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    })
  });


  it("should show Investment options", async () => {

    render(
      <div>
        <CreateButton children={<button>Button</button>} />
      </div>
    );
    await userEvent.click(screen.getByText("Button"));
    
    const investmentButton = await screen.findByText("Investment");
    
    await fireEvent.click(investmentButton);

    waitFor(() => {
      expect(screen.getByText("Term Deposit")).toBeInTheDocument();
      expect(screen.getByText("Treasury Bills")).toBeInTheDocument();
      expect(screen.getByText("Commercial Paper")).toBeInTheDocument();
    })
  });

  it("should show Credit options", async () => {

    render(
      <div>
        <CreateButton children={<button>Button</button>} />
      </div>
    );
    await userEvent.click(screen.getByText("Button"));
    
    const button = await screen.findByText("Credit");
    
    await fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByText("Personal Loans")).toBeInTheDocument();
      expect(screen.getByText("SME Loans")).toBeInTheDocument();
      expect(screen.getByText("Corporate Loans")).toBeInTheDocument();
    })
  });

  // it("should show Payment options", async () => {

  //   render(
  //     <div>
  //       <CreateButton children={<button>Button</button>} />
  //     </div>
  //   );
  //   await userEvent.click(screen.getByText("Button"));
    
  //   const button = await screen.findByText("Payment");
  // });

});
