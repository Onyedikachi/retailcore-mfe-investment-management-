// Button.test.jsx

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "../../components";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Click</Button>);
  });

  it("renders children", () => {
    const { getByText } = render(<Button>Test</Button>);
    getByText("Test");
  });

  it("applies custom className", () => {
    const { getByText } = render(<Button className="custom">Test</Button>);
    expect(getByText("Test")).toHaveClass("custom");
  });

  it("can show loader", () => {
    const { getByTestId } = render(
      <Button isLoading={true} type="submit">
        Submit
      </Button>
    );
    expect(getByTestId("loader")).toBeInTheDocument();
  });
  it("can hide loader", () => {
    const { queryByTestId } = render(
      <Button isLoading={false} type="submit">
        Submit
      </Button>
    );
    expect(queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("can render button elements", () => {
    const { getByText } = render(<Button as="button">Click</Button>);
    expect(getByText("Click").tagName).toBe("BUTTON");
  });

  // it("can render anchor elements", () => {
  //   const { getByText } = render(<Button as="a">Link</Button>);
  //   expect(getByText("Link").tagName).toBe("A");
  // });

  it("calls onClick handler", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(getByText("Click"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
