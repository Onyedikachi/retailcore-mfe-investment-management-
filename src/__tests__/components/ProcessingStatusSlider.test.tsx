// Breadcrumbs.test.jsx

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProcessingStatusSlider } from "../../components";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Branches", url: "/branches" },
];
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));
describe("ProcessingStatusSlider", () => {
  it("renders without crashing", () => {
    render(
      <ProcessingStatusSlider
        rangeLabels={["Pending submission", "Approved"]}
      />
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <ProcessingStatusSlider
        rangeLabels={["Pending submission", "Approved"]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ProcessingStatusSlider", () => {
  // Tests that the component renders with the correct UI elements and props
  it("should render the Processing Status Slider component with the correct UI elements and props", () => {
    const rangeLabels = ["Label 1", "Label 2"];
    const isDisabled = true;
    const firstRangeDisabled = true;
    const secondRangeDisabled = false;
    render(
      <ProcessingStatusSlider
        rangeLabels={rangeLabels}
        isDisabled={isDisabled}
        firstRangeDisabled={firstRangeDisabled}
        secondRangeDisabled={secondRangeDisabled}
      />
    );
    const processingStatusSlider = screen.getByText("Processing Status:");
    const label1 = screen.getByTestId("label1");
    const label2 = screen.getByTestId("label2");
    const firstRangeDisabledImage = screen.getByTestId("firstRangeDisabled");
    const secondRangeDisabledImage = screen.getByTestId("secondRangeDisabled");
    expect(processingStatusSlider).toBeInTheDocument();
    expect(label1).toHaveTextContent("Label 1");
    expect(label2).toHaveTextContent("Label 2");
    expect(firstRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(firstRangeDisabledImage).toHaveClass("opacity-40");
    expect(secondRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(secondRangeDisabledImage).not.toHaveClass("opacity-40");
  });

  // Tests that the component renders with default props
  it("should render the Processing Status Slider component with default props", () => {
    render(<ProcessingStatusSlider rangeLabels={[]} />);
    const processingStatusSlider = screen.getByText("Processing Status:");
    const label1 = screen.getByTestId("label1");
    const label2 = screen.getByTestId("label2");
    const firstRangeDisabledImage = screen.getByTestId("firstRangeDisabled");
    const secondRangeDisabledImage = screen.getByTestId("secondRangeDisabled");
    expect(processingStatusSlider).toBeInTheDocument();
    expect(label1).toHaveTextContent("");
    expect(label2).toHaveTextContent("");
    expect(firstRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(firstRangeDisabledImage).not.toHaveClass("opacity-40");
    expect(secondRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(secondRangeDisabledImage).not.toHaveClass("opacity-40");
  });

  // Tests that the component renders with all ranges enabled
  it("should render the Processing Status Slider component with all ranges enabled", () => {
    const rangeLabels = ["Label 1", "Label 2"];
    render(<ProcessingStatusSlider rangeLabels={rangeLabels} />);
    const processingStatusSlider = screen.getByText("Processing Status:");
    const label1 = screen.getByTestId("label1");
    const label2 = screen.getByTestId("label2");
    const firstRangeDisabledImage = screen.getByTestId("firstRangeDisabled");
    const secondRangeDisabledImage = screen.getByTestId("secondRangeDisabled");
    expect(processingStatusSlider).toBeInTheDocument();
    expect(label1).toHaveTextContent("Label 1");
    expect(label2).toHaveTextContent("Label 2");
    expect(firstRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(firstRangeDisabledImage).not.toHaveClass("opacity-40");
    expect(secondRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(secondRangeDisabledImage).not.toHaveClass("opacity-40");
  });

  // Tests that the component renders with all ranges disabled
  it("should render the Processing Status Slider component with all ranges disabled", () => {
    const rangeLabels = ["Label 1", "Label 2"];
    const isDisabled = true;
    const firstRangeDisabled = true;
    const secondRangeDisabled = true;
    render(
      <ProcessingStatusSlider
        rangeLabels={rangeLabels}
        isDisabled={isDisabled}
        firstRangeDisabled={firstRangeDisabled}
        secondRangeDisabled={secondRangeDisabled}
      />
    );
    const processingStatusSlider = screen.getByText("Processing Status:");
    const label1 = screen.getByTestId("label1");
    const label2 = screen.getByTestId("label2");
    const firstRangeDisabledImage = screen.getByTestId("firstRangeDisabled");
    const secondRangeDisabledImage = screen.getByTestId("secondRangeDisabled");
    expect(processingStatusSlider).toBeInTheDocument();
    expect(label1).toHaveTextContent("Label 1");
    expect(label2).toHaveTextContent("Label 2");
    expect(firstRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(firstRangeDisabledImage).toHaveClass("opacity-40");
    expect(secondRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(secondRangeDisabledImage).toHaveClass("opacity-40");
  });

  // Tests that the component renders with only the first range disabled
  it("should render the Processing Status Slider component with only the first range disabled", () => {
    const rangeLabels = ["Label 1", "Label 2"];
    const firstRangeDisabled = true;
    render(
      <ProcessingStatusSlider
        rangeLabels={rangeLabels}
        firstRangeDisabled={firstRangeDisabled}
      />
    );
    const processingStatusSlider = screen.getByText("Processing Status:");
    const label1 = screen.getByTestId("label1");
    const label2 = screen.getByTestId("label2");
    const firstRangeDisabledImage = screen.getByTestId("firstRangeDisabled");
    const secondRangeDisabledImage = screen.getByTestId("secondRangeDisabled");
    expect(processingStatusSlider).toBeInTheDocument();
    expect(label1).toHaveTextContent("Label 1");
    expect(label2).toHaveTextContent("Label 2");
    expect(firstRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(firstRangeDisabledImage).toHaveClass("opacity-40");
    expect(secondRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(secondRangeDisabledImage).not.toHaveClass("opacity-40");
  });

  // Tests that the component renders with only the second range disabled
  it("should render the Processing Status Slider component with only the second range disabled", () => {
    const rangeLabels = ["Label 1", "Label 2"];
    const secondRangeDisabled = true;
    render(
      <ProcessingStatusSlider
        rangeLabels={rangeLabels}
        secondRangeDisabled={secondRangeDisabled}
      />
    );
    const processingStatusSlider = screen.getByText("Processing Status:");
    const label1 = screen.getByTestId("label1");
    const label2 = screen.getByTestId("label2");
    const firstRangeDisabledImage = screen.getByTestId("firstRangeDisabled");
    const secondRangeDisabledImage = screen.getByTestId("secondRangeDisabled");
    expect(processingStatusSlider).toBeInTheDocument();
    expect(label1).toHaveTextContent("Label 1");
    expect(label2).toHaveTextContent("Label 2");
    expect(firstRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(firstRangeDisabledImage).not.toHaveClass("opacity-40");
    expect(secondRangeDisabledImage).toHaveAttribute("alt", "sliderLogo");
    expect(secondRangeDisabledImage).toHaveClass("opacity-40");
  });
});
