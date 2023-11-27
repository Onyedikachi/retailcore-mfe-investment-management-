// ApprovedSuccess.test.js

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ApprovedSuccess } from "../../components/modals";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("ApprovedSuccess Modal", () => {
  window.ResizeObserver = ResizeObserver;
  let props;
  beforeEach(() => {
    props = {
      isOpen: true,
      setIsOpen: jest.fn(),
      onConfirm: jest.fn(),
      setReason: jest.fn(),
    };
  });
  it("renders without crashing",async () => {
    render(
      <ApprovedSuccess
        isOpen={false}
        setIsOpen={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
        text={""}
        onConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  it("matches snapshot",async () => {
    const { asFragment } = render(
      <ApprovedSuccess
        isOpen={false}
        setIsOpen={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
        text={""}
        onConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("closes modal when cancel clicked", async () => {
    render(<ApprovedSuccess {...props} />);
    fireEvent.click(await screen.findByTestId("cancel-btn"));
    await waitFor(() => expect(props.setIsOpen).toHaveBeenCalledWith(false));
  });

  test("calls onConfirm when form submitted",async () => {
    render(<ApprovedSuccess {...props} />);
    fireEvent.click(await screen.findByTestId("submit-btn"));
    expect(props.onConfirm).toHaveBeenCalled();
  });
});
