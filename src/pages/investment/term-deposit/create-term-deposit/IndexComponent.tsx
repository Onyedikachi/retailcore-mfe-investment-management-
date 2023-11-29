import React, { useState } from "react";
import {
  Breadcrumbs,
  Loader,
  Button,
  FormStepComponent,
} from "@app/components";
import {
  ProductInformation,
  CustomerEligibilityCriteria,
  AccountingEntriesAndEvents,
  LiquiditySetup,
  PricingConfig,
} from "@app/components/pages/term-deposit/forms";
import { termDepositFormSteps } from "@app/constants";

export function handleNext(step, setStep, termDepositFormSteps) {
  step < termDepositFormSteps.length ? setStep(step + 1) : () => {};
}

export function handlePrev(step, setStep, termDepositFormSteps) {
  step > termDepositFormSteps[0].index ? setStep(step - 1) : () => {};
}

export default function CreateTermDeposit() {
  const [step, setStep] = useState(2);
  const links = [
    {
      id: 1,
      title: "Product Factory",
      url: "/product/factory/dashboard/deposit",
    },
    {
      id: 2,
      title: "Investment",
      url: "/investment-management",
    },
    {
      id: 3,
      title: "New Term Deposit Product",
      url: "#",
    },
  ];

  const [productInformationFormData, setProductInformationFormData] = useState({
    name: "",
    slogan: "",
    description: "",
    lifeCycle: "",
    currency: "",
  });

  let component;

  switch (step) {
    case 1:
      component = (
        <ProductInformation
          formData={productInformationFormData}
          setFormData={setProductInformationFormData}
        />
      );
      break;
    case 2:
      component = <CustomerEligibilityCriteria />;
      break;
    case 3:
      component = <PricingConfig />;
      break;
    case 4:
      component = <LiquiditySetup />;
      break;
    case 5:
      component = <AccountingEntriesAndEvents />;
      break;

    default:
      component = (
        <ProductInformation
          formData={productInformationFormData}
          setFormData={setProductInformationFormData}
        />
      );
  }
  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          New Term Deposit Product
        </h1>
        <Breadcrumbs links={links} />
      </div>
      <div className="h-full px-[37px] py-[30px] bg-[#F7F7F7]">
        <div className=" bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] ">
          <div className="pb-[49px] ">
            <FormStepComponent
              formStepItems={termDepositFormSteps}
              step={step}
            />
          </div>
          <div className=" bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[87px] pt-[100px] pb-[43px] ">
            {component}

            <div className="h-px w-full bg-[#CCCCCC] mb-12 mt-16"></div>

            <div className="flex mb-[70px]  justify-between">
              <Button
                onClick={() => handlePrev(step, setStep, termDepositFormSteps)}
                className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
              >
                Previous
              </Button>
              <div className="flex justify-end gap-6">
                <Button
                  onClick={() =>
                    handleNext(step, setStep, termDepositFormSteps)
                  }
                  className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                >
                  Save As Draft
                </Button>

                <Button
                  onClick={() =>
                    handleNext(step, setStep, termDepositFormSteps)
                  }
                  className={
                    "bg-sterling-red-800 rounded-lg px-10 py-1 font-medium text-base"
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
