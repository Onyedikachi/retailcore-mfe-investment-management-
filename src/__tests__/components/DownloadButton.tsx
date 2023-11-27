import DownloadButton from "@app/components/DownloadButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("DownloadButton", () => {
  // Tests that clicking the button calls the handleDownload function.
  it("should call handleDownload function when button is clicked", () => {
    const handleDownload = jest.fn();
    render(<DownloadButton handleDownload={handleDownload} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleDownload).toHaveBeenCalled();
  });

  // Tests that the button displays the text 'Download'.
  it("should display the text Download", () => {
    render(<DownloadButton handleDownload={() => {}} />);
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  // Tests that the button does not throw an error when handleDownload function is not provided.
  it("should not throw an error when handleDownload is not provided", () => {
    expect(() => {
      render(<DownloadButton />);
    }).not.toThrow();
  });

  // Tests that the button has the correct class name, type attribute, text color, background color, and gap between icon and text.
  it("should have the correct class name, type attribute, text color, background color, and gap between icon and text", () => {
    render(<DownloadButton handleDownload={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "flex gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
    );
    expect(button).toHaveAttribute("type", "button");
  });
});
