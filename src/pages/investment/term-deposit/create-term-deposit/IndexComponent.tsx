import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@app/routes/paths";
import { Confirm, Failed, Success } from "@app/components/modals";
import { useCreateProductMutation } from "@app/api";
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
import Preview from "@app/components/pages/term-deposit/forms/preview";

export function handleNext(step, setStep, termDepositFormSteps) {
  step < termDepositFormSteps.length && setStep(step + 1);
}

export function handlePrev(step, setStep, termDepositFormSteps) {
  step > termDepositFormSteps[0].index && setStep(step - 1);
}

export default function CreateTermDeposit() {
  const [searchParams] = useSearchParams();
  const stage = searchParams.get("stage");
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    productInfo: {
      productName: "",
      slogan: "",
      description: "",
      startDate: "",
      endDate: "",
      currency:  "USD",
      customerCategory: 0,
    },
    customerEligibility: {
      ageGroupMin: 2,
      ageGroupMax: 3,
      requireDocument: [],
    },
    pricingConfiguration: {
      applicableTenorMin: 2,
      applicableTenorMinUnit: 1,
      applicableTenorMax: 8,
      applicableTenorMaxUnit: 1,
      applicablePrincipalMin: 3,
      applicablePrincipalMax: 4,
      interestRateRangeType: 0,
      interestRateConfigModels: [
        {
          min: 0,
          max: 0,
          principalMin: 1,
          principalMax: 12,
          tenorMin: 21,
          tenorMinUnit: 0,
          tenorMax: 22,
          tenorMaxUnit: 0,
        },
      ],
      interestRateMin: 10,
      interestRateMax: 60,
    },
    liquidation: {
      part_AllowPartLiquidation: true,
      part_MaxPartLiquidation: 1,
      part_RequireNoticeBeforeLiquidation: true,
      part_NoticePeriod: 2,
      part_NoticePeriodUnit: 3,
      part_LiquidationPenalty: "pay",
      early_AllowEarlyLiquidation: true,
      early_RequireNoticeBeforeLiquidation: true,
      early_NoticePeriod: 4,
      early_NoticePeriodUnit: 5,
      early_LiquidationPenalty: "pay",
      early_LiquidationPenaltyPercentage: 7,
    },
    interestComputationMethod: 0,
    isDraft: false,
    productType: 0,
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
      url: "/product-factory/investment",
    },
    {
      id: 3,
      title: "New Term Deposit Product",
      url: "#",
    },
  ];
  const [
    createProduct,
    { isLoading, isSuccess, isError, reset, error: draftError },
  ] = useCreateProductMutation();

  function handleNav() {
    step < termDepositFormSteps.length
      ? handleNext(step, setStep, termDepositFormSteps)
      : navigate(
          "/product-factory/investment/term-deposit/create?stage=preview"
        );
  }

  const handleDraft = () => {
    createProduct({ ...productData, isDraft: true });
    // navigate(paths.INVESTMENT_DASHBOARD);
  };

  let component;
  let formRef;

  switch (step) {
    case 1:
      component = (
        <ProductInformation
          proceed={handleNav}
          formData={productData.productInfo}
          setFormData={(productInfo) =>
            setProductData({ ...productData, productInfo: productInfo })
          }
          setDisabled={setDisabled}
        />
      );
      formRef = "productform";
      break;
    case 2:
      component = (
        <CustomerEligibilityCriteria
          proceed={handleNav}
          formData={productData.customerEligibility}
          setFormData={(customerEligibility) =>
            setProductData({
              ...productData,
              customerEligibility: customerEligibility,
            })
          }
          setDisabled={setDisabled}
        />
      );
      formRef = "customereligibilitycriteria";
      break;
    case 3:
      component = (
        <PricingConfig
          formData={productData.pricingConfiguration}
          setFormData={(pricingConfiguration) =>
            setProductData({
              ...productData,
              pricingConfiguration: pricingConfiguration,
            })
          }
          proceed={handleNav}
        />
      );
      formRef = "pricingconfig";
      break;
    case 4:
      component = (
        <LiquiditySetup
          proceed={handleNav}
          formData={productData.liquidation}
          setFormData={(liquidation) =>
            setProductData({
              ...productData,
              liquidation: liquidation,
            })
          }
        />
      );
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
          formData={productData.productInfo}
          setFormData={(productInfo) =>
            setProductData({ ...productData, productInfo: productInfo })
          }
          setDisabled={setDisabled}
        />
      );
  }
  return (
    <div className="flex flex-col min-h-[100vh] ">
      {!stage && (
        <div>
          <div className="px-[37px] py-[11px] bg-white">
            <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
              New Term Deposit Product
            </h1>
            <Breadcrumbs links={links} />
          </div>
          {/* {productData.productInfo.productName} */}
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
        </div>
      )}

      {stage && stage === "preview" && (
        <div>
          <Preview formData={productData} />
        </div>
      )}

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
