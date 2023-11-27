import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import LastRequestReviewStatus from "../../components/LastRequestReviewStatus";

describe("LastRequestReviewStatus", () => {
  // Tests that the component renders correctly with status 'Approved' and type 'Bulk'
  it("should render the correct message when status is Approved and type is Bulk", () => {
    render(<LastRequestReviewStatus status="Approved" reason="" type="Bulk" />);
    const message = screen.getByText("Bulk Branch creation approved");
    expect(message).toBeInTheDocument();
  });

  // Tests that the component renders correctly with status 'Rejected' and a reason provided
  it("should render the correct message and reason when status is Rejected and a reason is provided", () => {
    const reason = "Invalid branch name";
    render(
      <LastRequestReviewStatus
        status="Rejected"
        reason={reason}
        type="Single"
      />
    );
    const message = screen.getByText("Branch creation rejected");
    const rejectionReason = screen.getByText(reason);
    expect(message).toBeInTheDocument();
    expect(rejectionReason).toBeInTheDocument();
  });

  // Tests that the component renders correctly with status 'Rejected' and no reason provided
  it("should render the correct message when status is Rejected and no reason is provided", () => {
    render(<LastRequestReviewStatus status="Rejected" reason="" type="Bulk" />);
    const message = screen.getByText("Bulk Branch creation rejected");
    expect(message).toBeInTheDocument();
  });

  // Tests that the component renders correctly with status 'Approved' and type 'Single'
  it("should render the correct message when status is Approved and type is Single", () => {
    render(
      <LastRequestReviewStatus status="Approved" reason="" type="Single" />
    );
    const message = screen.getByText("Branch creation approved");
    expect(message).toBeInTheDocument();
  });

  // Tests that the component renders correctly with status 'Rejected' and type 'Single'
  it("should render the correct message when status is Rejected and type is Single", () => {
    render(
      <LastRequestReviewStatus status="Rejected" reason="" type="Single" />
    );
    const message = screen.getByText("Branch creation rejected");
    expect(message).toBeInTheDocument();
  });

  // Tests that the component renders correctly with status 'Pending' and both types 'Bulk' and 'Single'
  it("should render the correct message when status is Pending and type is Bulk", () => {
    render(<LastRequestReviewStatus status="Pending" reason="" type="Bulk" />);
    const message = screen.getByText("Last request review status:");
    expect(message).toBeInTheDocument();
  });

  it("should render the correct message when status is Pending and type is Single", () => {
    render(
      <LastRequestReviewStatus status="Pending" reason="" type="Single" />
    );
    const message = screen.getByText("Last request review status:");
    expect(message).toBeInTheDocument();
  });
});
