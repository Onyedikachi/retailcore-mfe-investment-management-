import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import { Success, Prompt, Failed } from "../../components/modals";
import { useNavigate, useLocation, BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));
const navigate = jest.fn();

jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(navigate);
jest.mock("react-router-dom");
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Success Modal", () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });
  it("renders without crashing", async () => {
    render(
      <BrowserRouter>
        <Success
          isOpen={false}
          setIsOpen={jest.fn()}
          text={""}
        />
      </BrowserRouter>
    );
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Success
          isOpen={false}
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
        />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // it("can close modal pathname: /product-management", async () => {
  //   jest
  //     .spyOn(require("react-router-dom"), "useLocation")
  //     .mockReturnValue({ pathname: "/product-management" });

  //   const setIsOpen = jest.fn();
  //   const { findByTestId } = render(
  //     <Success isOpen={true} setIsOpen={setIsOpen} text={""} canClose />
  //   );
  //   const closebtn = await findByTestId("close-btn");
  //   fireEvent.click(closebtn);
  //   // expect(window.location.reload).toHaveBeen();
  // });
  it("can close modal pathname !== /product-management", async () => {
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/" });

    const setIsOpen = jest.fn();
    const { findByTestId } = render(
      <Success isOpen={true} setIsOpen={setIsOpen} text={""} canClose />
    );
    const closebtn = await findByTestId("dashboard-link");
    fireEvent.click(closebtn);
  });
  it("can close modal when canclose is true", async () => {
    const setIsOpen = jest.fn();
    const { findByTestId } = render(
      <Success isOpen={true} setIsOpen={setIsOpen} text={"hello"} canClose />
    );
    const closebtn = await findByTestId("can-close");
    expect(closebtn).toBeInTheDocument();
    fireEvent.click(closebtn);
    expect(setIsOpen).toHaveBeenCalled();
  });
});

describe("Prompt Modal", () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });
  it("renders without crashing", async () => {
    render(
      <BrowserRouter>
        <Success
          isOpen={false}
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
        />
      </BrowserRouter>
    );
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Prompt
          isOpen={false}
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
          text1={""}
        />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // it("can close modal pathname: /product-management", async () => {
  //   jest
  //     .spyOn(require("react-router-dom"), "useLocation")
  //     .mockReturnValue({ pathname: "/product-management" });

  //   const setIsOpen = jest.fn();
  //   const { findByTestId } = render(
  //     <Prompt isOpen={true} setIsOpen={setIsOpen} canClose text1={""} />
  //   );
  //   const closebtn = await findByTestId("close-btn");
  //   fireEvent.click(closebtn);
  //   expect(setIsOpen).toHaveBeenCalled();
  // });

  it("can close modal pathname !== /product-management", async () => {
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/" });

    const setIsOpen = jest.fn();
    const { findByTestId } = render(
      <BrowserRouter>
        {" "}
        <Prompt isOpen={true} setIsOpen={setIsOpen} canClose text1={""} />{" "}
      </BrowserRouter>
    );
    const closebtn = await findByTestId("dashboard-link");
    fireEvent.click(closebtn);
    // expect(window.location.href).toHaveBeenCalled();
  });

  it("can close modal when canclose is true", async () => {
    const setIsOpen = jest.fn();
    const { findByTestId } = render(
      <BrowserRouter>
        {" "}
        <Prompt
          isOpen={true}
          setIsOpen={setIsOpen}
          text1={"hello"}
          canClose
        />{" "}
      </BrowserRouter>
    );
    const closebtn = await findByTestId("can-close");
    expect(closebtn).toBeInTheDocument();
    fireEvent.click(closebtn);
    expect(setIsOpen).toHaveBeenCalled();
  });
});

describe("Failed Modal", () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(
      <BrowserRouter>
        {" "}
        <Failed
          isOpen={false}
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
          text={""}
          subtext={""}
        />{" "}
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // it("can close modal pathname: /product-management", async () => {
  //   jest
  //     .spyOn(require("react-router-dom"), "useLocation")
  //     .mockReturnValue({ pathname: "/product-management" });

  //   const setIsOpen = jest.fn();
  //   const { findByTestId } = render(
  //     <BrowserRouter>
  //       {" "}
  //       <Failed
  //         isOpen={true}
  //         setIsOpen={setIsOpen}
  //         canClose
  //         text={""}
  //         subtext={""}
  //       />{" "}
  //     </BrowserRouter>
  //   );
  //   const closebtn = await findByTestId("close-btn");
  //   fireEvent.click(closebtn);
  //   expect(setIsOpen).not.toHaveBeenCalled();
  // });


  it("can close modal pathname !== /product-management", async () => {
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/" });

    const setIsOpen = jest.fn();
    const { findByTestId } = render(
      <BrowserRouter>
        {" "}
        <Failed
          isOpen={true}
          setIsOpen={setIsOpen}
          canClose
          text={""}
          subtext={""}
        />{" "}
      </BrowserRouter>
    );
    const closebtn = await findByTestId("dashboard-link");
    fireEvent.click(closebtn);
    // expect(window.location.href).toHaveBeenCalled();
  });

  it("can close modal when canclose is true", async () => {
    const setIsOpen = jest.fn();
    const { findByTestId } = render(
      <BrowserRouter>
        {" "}
        <Failed
          isOpen={true}
          setIsOpen={setIsOpen}
          text={"hello"}
          canClose
          subtext={""}
        />{" "}
      </BrowserRouter>
    );
    const closebtn = await findByTestId("can-close");
    expect(closebtn).toBeInTheDocument();
    fireEvent.click(closebtn);
    expect(setIsOpen).toHaveBeenCalled();
  });
});



describe('Success', () => {

  // Renders a success message with given text
  it('should render a success message with given text', () => {
    // Arrange
    const text = "Success!";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const canClose = false;
    const canCreate = false;

    // Act
    render(<Success text={text} isOpen={isOpen} setIsOpen={setIsOpen} canClose={canClose} canCreate={canCreate} />);

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // Renders a check circle icon
  it('should render a check circle icon', () => {
    // Arrange
    const text = "Success!";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const canClose = false;
    const canCreate = false;

    // Act
    render(<Success text={text} isOpen={isOpen} setIsOpen={setIsOpen} canClose={canClose} canCreate={canCreate} />);

    // Assert
    expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
  });

  // Renders a "Return to dashboard" button
  it('should render a "Return to dashboard" button', () => {
    // Arrange
    const text = "Success!";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const canClose = false;
    const canCreate = false;

    // Act
    render(<Success text={text} isOpen={isOpen} setIsOpen={setIsOpen} canClose={canClose} canCreate={canCreate} />);

    // Assert
    expect(screen.getByText("Return to dashboard")).toBeInTheDocument();
  });



  // Renders a success message with long text
  it('should render a success message with long text', () => {
    // Arrange
    const text = "This is a very long success message that exceeds the width of the container.";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const canClose = false;
    const canCreate = false;

    // Act
    render(<Success text={text} isOpen={isOpen} setIsOpen={setIsOpen} canClose={canClose} canCreate={canCreate} />);

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // Renders a success message with special characters in text
  it('should render a success message with special characters in text', () => {
    // Arrange
    const text = "Success! @#$%^&*()";
    const isOpen = true;
    const setIsOpen = jest.fn();
    const canClose = false;
    const canCreate = false;

    // Act
    render(<Success text={text} isOpen={isOpen} setIsOpen={setIsOpen} canClose={canClose} canCreate={canCreate} />);

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
