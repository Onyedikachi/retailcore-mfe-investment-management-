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

  //   // Handles step value greater than the number of formStepItems
  //   it("should handle step value greater than the number of formStepItems and render last form step item", () => {
  //     const formStepItems = [
  //       {
  //         id: 1,
  //         label: "First",
  //         index: 1,
  //       },
  //       {
  //         id: 2,
  //         label: "Second",
  //         index: 2,
  //       },
  //     ];
  //     const step = 3;
  //     const wrapper = shallow(
  //       <FormStepComponent formStepItems={formStepItems} step={step} />
  //     );
  //     expect(wrapper.find(".flex.flex-col.items-center.w-[172px]").length).toBe(
  //       1
  //     );
  //     expect(
  //       wrapper
  //         .find(
  //           ".uppercase.text-center.text-[#636363].leading-[1px].text-sm.font-normal"
  //         )
  //         .text()
  //     ).toBe(formStepItems[formStepItems.length - 1].label);
  //     expect(wrapper.find(".text-[#636363]").text()).toBe(
  //       formStepItems[formStepItems.length - 1].index.toString()
  //     );
  //   });

  //   // Handles step value less than 1
  //   it("should handle step value less than 1 and render first form step item", () => {
  //     const formStepItems = [
  //       {
  //         id: 1,
  //         label: "First",
  //         index: 1,
  //       },
  //       {
  //         id: 2,
  //         label: "Second",
  //         index: 2,
  //       },
  //     ];
  //     const step = 0;
  //     const wrapper = shallow(
  //       <FormStepComponent formStepItems={formStepItems} step={step} />
  //     );
  //     expect(wrapper.find(".flex.flex-col.items-center.w-[172px]").length).toBe(
  //       1
  //     );
  //     expect(
  //       wrapper
  //         .find(
  //           ".uppercase.text-center.text-[#636363].leading-[1px].text-sm.font-normal"
  //         )
  //         .text()
  //     ).toBe(formStepItems[0].label);
  //     expect(wrapper.find(".text-[#636363]").text()).toBe(
  //       formStepItems[0].index.toString()
  //     );
  //   });
});
