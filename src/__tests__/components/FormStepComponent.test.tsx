import React from "react";
import { FormStepComponent } from "../../components";
import { fireEvent, render, screen } from "@testing-library/react";
import { shallow } from "enzyme";

const formStepItems = [
  {
    id: 1,
    label: "First",
    index: 1,
  },
  {
    id: 2,
    label: "Second",
    index: 2,
  },
  {
    id: 3,
    label: "Third",
    index: 3
  },
];



describe("FormStepComponent", () => {
  // Renders the correct number of form step items
  it("should render the correct number of form step items when formStepItems is not empty", () => {
    render(
      <FormStepComponent formStepItems={formStepItems} step={1} />
    )
    const formSteps = screen.getAllByTestId("form-step-item-label");
    expect(formSteps.length).toBe(formStepItems.length)
  });

  //   Renders the correct label for each form step item
  it("should render the correct label for each form step item when formStepItems is not empty", () => {
    render(
      <FormStepComponent formStepItems={formStepItems} step={1} />
    )
    const formStepLabels = screen.getAllByTestId("form-step-item-label").map(label => label.textContent);
    expect(formStepLabels).toEqual(formStepItems.map(item => item.label));
  });

  // Renders the correct index for each form step item
  it("should render the correct index for each form step item when formStepItems is not empty", () => {
    render(
      <FormStepComponent formStepItems={formStepItems} step={1} />
    )
    const formStepsIndexes = screen.getAllByTestId("form-step-item-index").map(indexElement => indexElement.textContent);
    expect(formStepsIndexes).toEqual(formStepItems.map(a => a.index + ""))// a.index+"" converts items from int to String

  });

  // Handles empty formStepItems array
  it("should handle empty formStepItems array and render default form step item", () => {
    // const wrapper = shallow(<FormStepComponent />);
    render(
      <FormStepComponent step={1} />
    )
    expect(screen.getByTestId("form-step")).toBeInTheDocument();

  });

    // Handles step value greater than the number of formStepItems
    it("should handle step value greater than the number of formStepItems and render last form step item", () => {
      const formStepItems = [
        {
          id: 1,
          label: "First",
          index: 1,
        },
        {
          id: 2,
          label: "Second",
          index: 2,
        },
      ];
      const step = 3;
      render (
        <FormStepComponent formStepItems={formStepItems} step={step} />
      );
      const items = screen.getAllByTestId("form-step");

      expect(items.length).toBe(formStepItems.length)
      expect(screen.getAllByTestId("form-step-item-index")[1].textContent).toBe(formStepItems[formStepItems.length-1].index+"")
    });

  //   // Handles step value less than 1
    it("should handle step value less than 1 and render first form step item", () => {
      const formStepItems = [
        {
          id: 1,
          label: "First",
          index: 1,
        },
        {
          id: 2,
          label: "Second",
          index: 2,
        },
      ];
      const step = 0;

      render (
        <FormStepComponent formStepItems={formStepItems} step={step} />
      );
      const items = screen.getAllByTestId("form-step");

      expect(items.length).toBe(formStepItems.length)
      
      expect(screen.getAllByTestId("form-step-item-index")[0].textContent).toBe(formStepItems[0].index+"")
      
    });
});
