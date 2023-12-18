import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import ShareButton from "../../components/ShareButton";
import userEvent from "@testing-library/user-event";

jest.mock("react-web-share", () => ({
  RWebShare: ({ children }: any) => children,
}));

describe("ShareButton", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <ShareButton
        title="Test Title"
        text="Test Text"
        url="https://example.com"
      />
    );

    const shareButton = getByText("Share");
    expect(shareButton).toBeInTheDocument();
  });

  it("triggers the share action when clicked", () => {
    const { getByTestId } = render(
      <ShareButton
        title="Test Title"
        text="Test Text"
        url="https://example.com"
      />
    );

    const shareButton = getByTestId("share-btn");

    // Mock the console.log method
    const originalConsoleLog = console.log;

    // Click the Share button
    userEvent.click(shareButton);
  });
});
