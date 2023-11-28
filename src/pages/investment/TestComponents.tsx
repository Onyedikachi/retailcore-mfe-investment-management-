import { useState } from "react";

import FormStepComponent from "../../components/ui/FormStepComponent";

export default function TestComponent() {
  const [step, setStep] = useState(2);

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
      index: 3,
    },
    {
      id: 4,
      label: "Fourth of this month is my birthday",
      index: 4,
    },
  ];
  return (
    <section className=" w-full bg-[#F7F7F7] h-full min-h-[100vh] flex flex-col">
      <div className="px-8 py-8 h-full w-full bg-gray-200">
        <FormStepComponent formStepItems={formStepItems} step={step} />
      </div>

      <div>
        <button onClick={() => setStep(step + 1)}>Increment</button>{" "}
        <button onClick={() => setStep(step - 1)}>Decrement</button>
      </div>
    </section>
  );
}
