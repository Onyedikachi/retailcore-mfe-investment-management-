import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@app/routes/paths";
import { Confirm, Failed, Success } from "@app/components/modals";

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
  const [step, setStep] = useState(3);
  const [productInformationFormData, setProductInformationFormData] = useState({
    name: "",
    slogan: "",
    description: "",
    lifeCycle: "",
    currency: "",
  });
  const [customerEligibilityCriteria, setCustomerEligibilityCriteria] =
    useState({
      category: "",
      ageGroupStart: 0,
      ageGroupEnd: 0,
      corporateCustomerType: "",
    });
  const [pricingConfigData, setPricingConfigData] = useState({
    applicableTenorMin: 0,
    applicableTenorMinDays: 0,
    applicableTenorMax: 0,
    applicableTenorMaxDays: 0,
    applicablePrincipalMin: 0,
    applicablePrincipalMax: 0,
    applicablePrincipalMinDays: 0,
    applicablePrincipalMaxDays: 0,
    varyOption: "",
    applicableInterestMin: 0,
    applicableInterestMax: 0,
    interestComputation: "",
    tenorRateRanges: [
      {
        minRange: 0,
        maxRange: 0,
        tenorFrom: 0,
        tenorFromType: "",
        tenorTo: 0,
        tenorToType: "",
      },
    ],
    principalRateRanges: [
      {
        minRange: 0,
        maxRange: 0,
        amountFrom: 0,
        amountTo: 0,
      },
    ],
  });
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [draftText] = useState({
    mainText: "Do you want to save as draft?",
    subText: "Requests in draft will be deleted after 30 days of inactivity",
  });

  // const [formRef, setFormRef] = useState("");

  const navigate = useNavigate();

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

  function handleNav() {
    step < termDepositFormSteps.length
      ? handleNext(step, setStep, termDepositFormSteps)
      : navigate(paths.TERM_DEPOSIT_SUMMARY);
  }

  const handleDraft = () => {
    navigate(paths.INVESTMENT_DASHBOARD);
  };

  let component;
  let formRef;

  switch (step) {
    case 1:
      component = (
        <ProductInformation
          proceed={handleNav}
          formData={productInformationFormData}
          setFormData={setProductInformationFormData}
          setDisabled={setDisabled}
        />
      );
      formRef = "productform";
      break;
    case 2:
      component = (
        <CustomerEligibilityCriteria
          proceed={handleNav}
          formData={customerEligibilityCriteria}
          setFormData={setCustomerEligibilityCriteria}
          setDisabled={setDisabled}
        />
      );
      formRef = "customereligibilitycriteria";
      break;
    case 3:
      component = (
        <PricingConfig
          formData={pricingConfigData}
          setFormData={setPricingConfigData}
          proceed={handleNav}
        />
      );
      formRef = "pricingconfig";
      break;
    case 4:
      component = <LiquiditySetup proceed={handleNav} />;
      formRef = "liquiditysetup";
      break;
    case 5:
      component = <AccountingEntriesAndEvents proceed={handleNav} />;
      formRef = "entriesandevents";
      break;

    default:
      component = (
        <ProductInformation
          proceed={handleNav}
          formData={productInformationFormData}
          setFormData={setProductInformationFormData}
          setDisabled={setDisabled}
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
              <div>
                {step > 1 && (
                  <Button
                    onClick={() =>
                      handlePrev(step, setStep, termDepositFormSteps)
                    }
                    className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                  >
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex justify-end gap-6">
                <Button
                  onClick={() => setIsConfirmOpen(true)}
                  className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                >
                  Save As Draft
                </Button>

                <Button
                  type="submit"
                  form={formRef}
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

      {/* //Modals */}
      {isConfirmOpen && (
        <Confirm
          text={draftText.mainText}
          subtext={draftText.subText}
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={() => handleDraft()}
        />
      )}
    </div>
  );
}
