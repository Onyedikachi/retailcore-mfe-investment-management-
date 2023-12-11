import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@app/routes/paths";
import { Confirm, Failed, Success } from "@app/components/modals";
import {
  useCreateProductMutation,
  useGetRequestDetailQuery,
  useGetProductDetailQuery,
} from "@app/api";
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
import { Messages } from "@app/constants/enums";
import { convertKeysToLowerCase } from "@app/utils/convertKeysToLowerCase";

export function handleNext(step, setStep, termDepositFormSteps) {
  step < termDepositFormSteps.length && setStep(step + 1);
}

export function handlePrev(step, setStep, termDepositFormSteps) {
  step > termDepositFormSteps[0].index && setStep(step - 1);
}

export default function CreateTermDeposit() {
  const [searchParams] = useSearchParams();
  const stage = searchParams.get("stage");
  const id = searchParams.get("id");
  const [step, setStep] = useState(2);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");
  const [productData, setProductData] = useState({
    productInfo: {
      productName: "",
      slogan: "",
      description: "",
      startDate: new Date(),
      endDate: null,
      currency: "NGN",
      customerCategory: null,
    },
    customerEligibility: {
      ageGroupMin: 0,
      ageGroupMax: 0,
      requireDocument: [],
      corporateCustomerType: [],
      customerCategory: null,
    },
    pricingConfiguration: {
      interestRateRangeType: 0,
      applicableTenorMin: 0,
      applicableTenorMinUnit: 1,
      applicableTenorMax: 0,
      applicableTenorMaxUnit: 1,
      applicablePrincipalMin: 0,
      applicablePrincipalMax: 0,
      interestComputationMethod: 2,
      interestRateConfigModels: [
        {
          min: 0,
          max: 0,
          principalMin: 0,
          principalMax: 0,
          tenorMin: 0,
          tenorMinUnit: 1,
          tenorMax: 0,
          tenorMaxUnit: 1,
        },
      ],
      interestRateMin: 0,
      interestRateMax: 0,
    },
    liquidation: {
      part_AllowPartLiquidation: false,
      part_MaxPartLiquidation: 0,
      part_RequireNoticeBeforeLiquidation: false,
      part_NoticePeriod: 0,
      part_NoticePeriodUnit: 1,
      part_LiquidationPenalty: 0,
      part_LiquidationPenaltyPercentage: 0,
      part_SpecificCharges: [],
      part_specialInterestRate: 0,
      early_AllowEarlyLiquidation: false,
      early_RequireNoticeBeforeLiquidation: false,
      early_NoticePeriod: 0,
      early_NoticePeriodUnit: 1,
      early_LiquidationPenalty: 0,
      early_LiquidationPenaltyPercentage: 0,
      early_specialInterestRate: 0,
      early_SpecificCharges: [],
    },
    productGlMappings: [],
    interestComputationMethod: 0,
    TermDepositLiabilityAccount: "",
    InterestAccrualAccount: "",
    InterestExpenseAccount: "",
    isDraft: false,
    productType: 0,
  });

  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [draftText] = useState({
    mainText: "Do you want to save as draft?",
    subText: "Requests in draft will be deleted after 30 days of inactivity",
  });

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
  const [createProduct, { isLoading, isSuccess, isError, reset, error }] =
    useCreateProductMutation();

  const {
    data: requestData,
    isLoading: requestIsLoading,
    isSuccess: requestIsSuccess,
  } = useGetRequestDetailQuery(
    {
      id,
    },
    { skip: !id }
  );

  const {
    data: productDetails,
    isLoading: productDetailsIsLoading,
    isSuccess: productDetailsIsSuccess,
  } = useGetProductDetailQuery(
    {
      id,
    },
    { skip: !id }
  );

  useEffect(() => {
    if (productDetailsIsSuccess) {
      console.log(
        "🚀 ~ file: IndexComponent.tsx:164 ~ useEffect ~ productDetails:",
        productDetails?.data
      );
      setProductData({
        productInfo: productDetails?.data?.productInfo,
        customerEligibility: productDetails?.data?.customerEligibility,
        pricingConfiguration: productDetails?.data?.pricingConfiguration,
        liquidation: productDetails?.data?.liquidation,
        productGlMappings: productDetails?.data?.productGlMappings,
        interestComputationMethod: productDetails?.data?.interestComputationMethod,
        TermDepositLiabilityAccount: productDetails?.data?.TermDepositLiabilityAccount,
        InterestAccrualAccount: productDetails?.data?.InterestAccrualAccount,
        InterestExpenseAccount: productDetails?.data?.InterestExpenseAccount,
        isDraft: productDetails?.data?.isDraft,
        productType: productDetails?.data?.productType,
      });
    }
  }, [productDetails]);

  function handleNav() {
    step < termDepositFormSteps.length
      ? handleNext(step, setStep, termDepositFormSteps)
      : navigate(
          `/product-factory/investment/term-deposit/create?stage=summary`
        );
  }

  const handleDraft = () => {
    setIsConfirmOpen(false);
    createProduct({ ...productData, isDraft: true });
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
              productInfo: {
                ...productData.productInfo,
                customerCategory: customerEligibility.customerCategory,
              },
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
          productData={productData}
          proceed={handleNav}
          setDisabled={setDisabled}
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
          setDisabled={setDisabled}
        />
      );
      formRef = "liquiditysetup";
      break;
    case 5:
      component = (
        <AccountingEntriesAndEvents
          proceed={handleNav}
          formData={productData}
          setFormData={({ data, mapOptions }) =>
            setProductData({
              ...productData,
              ...data,
              productGlMappings: mapOptions,
            })
          }
          setDisabled={setDisabled}
        />
      );
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
  useEffect(() => {
    console.log(
      "🚀 ~ file: IndexComponent.tsx:258 ~ useEffect ~ productData:",
      productData
    );
  }, [productData]);
  useEffect(() => {
    if (requestIsSuccess) {
      const data = JSON.parse(requestData?.data?.metaInfo);
      console.log(
        "🚀 ~ file: IndexComponent.tsx:270 ~ useEffect ~ data:",
        data
      );

      setProductData(convertKeysToLowerCase({ ...data }));
    }
  }, [requestIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessText(Messages.PRODUCT_DRAFT_SUCCESS);
      setIsSuccessOpen(true);
    }

    if (isError) {
      setFailedText(Messages.PRODUCT_DRAFT_FAILED);
      setFailedSubtext(error?.message?.message);
      setFailed(true);
    }
  }, [isSuccess, isError, error]);
  return (
    <div>
      {!stage && !requestIsLoading && (
        <div className="flex flex-col min-h-[100vh] ">
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
                        type="button"
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
                      type="button"
                      onClick={() => setIsConfirmOpen(true)}
                      className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                    >
                      Save As Draft
                    </Button>

                    <Button
                      type="submit"
                      form={formRef}
                      disabled={isDisabled}
                      className={
                        "bg-sterling-red-800 rounded-lg px-10 py-1 font-medium text-base"
                      }
                    >
                      {step < 5 ? "Next" : "Proceed"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Loader isOpen={isLoading} text={"Submitting"} />
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
          {isFailed && (
            <Failed
              text={failedText}
              subtext={failedSubText}
              isOpen={isFailed}
              setIsOpen={setFailed}
              canRetry
            />
          )}
          {isSuccessOpen && (
            <Success
              text={successText}
              isOpen={isSuccessOpen}
              setIsOpen={setIsSuccessOpen}
            />
          )}
        </div>
      )}
      {stage && stage === "summary" && <Preview formData={productData} />}
    </div>
  );
}
