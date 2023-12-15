// // Confirm.test.js

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Confirm } from "../../components/modals";

import { act } from "react-dom/test-utils";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Confirm", () => {
  window.ResizeObserver = ResizeObserver;
  const isOpen = true;
  const setIsOpen = jest.fn();
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const text = "Confirmation message";
  const subtext = "Additional information";

  it("renders without crashing", () => {
    act(() => {
      render(
        <Confirm
          isOpen={false}
          setIsOpen={setIsOpen}
          text={""}
          onConfirm={onConfirm}
        />
      );
    });
  });

  // Renders a modal with the given text and subtext.
  it("should render a modal with the given text and subtext", () => {
    // Arrange

    // Act
    render(
      <Confirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={text}
        subtext={subtext}
        onConfirm={onConfirm}
      />
    );

    // Assert
    expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(subtext)).toBeInTheDocument();
  });

  // Renders a cancel button and a confirm button.
  it("should render a cancel buttons  and a confirm button", () => {
    // Arrange
    const isOpen = true;
    const setIsOpen = jest.fn();
    const text = "Confirmation message";

    // Act
    render(
      <Confirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={text}
        onConfirm={onConfirm}
      />
    );

    // Assert
    expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-btn-2")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  it("closes modal when cancel button 1 clicked", async () => {
    render(
      <Confirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(await screen.findByTestId("cancel-btn"));
    await waitFor(() => expect(setIsOpen).toHaveBeenCalledWith(false));
  });

  it("Calls onCancel when cancel button 2 clicked", async () => {
    render(
      <Confirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(await screen.findByTestId("cancel-btn-2"));
    await waitFor(() => expect(onCancel).toHaveBeenCalled());
  });

  // Clicking the confirm button .
  it("should call onConfirm when confirm button is clicked", async () => {
    // Arrange
    const isOpen = true;
    const setIsOpen = jest.fn();
    const text = "Confirmation message";
    render(
      <Confirm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={text}
        onConfirm={onConfirm}
      />
    );

    // Act
    fireEvent.click(screen.getByTestId("submit-btn"));

    // Assert

    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
  });
});
