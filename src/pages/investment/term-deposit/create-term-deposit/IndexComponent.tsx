import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  useContext,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { paths } from "@app/routes/paths";
import { Confirm, Failed, Success } from "@app/components/modals";
import {
  useCreateProductMutation,
  useGetRequestDetailQuery,
  useGetProductDetailQuery,
  useModifyProductMutation,
  useModifyRequestMutation,
  useGetChargesQuery,
} from "@app/api";
import {
  Breadcrumbs,
  Loader,
  Button,
  FormStepComponent,
} from "@app/components";

import { ProductState, termDepositFormSteps } from "@app/constants";
import Preview from "@app/components/pages/term-deposit/forms/preview";
import { Messages } from "@app/constants/enums";
import { handleDraft } from "./handleDraft";
import handleFormRef from "./handleFormRef";
import FormComponent from "../FormComponent";
import { AppContext } from "@app/utils";
import { useGetApplicableChargesQuery, useGetApplicableTaxesQuery } from "@app/api/productMgtApi";

export function handleNext(step, setStep, termDepositFormSteps) {
  step < termDepositFormSteps.length && setStep(step + 1);
}

export function handlePrev(step, setStep, termDepositFormSteps) {
  step > termDepositFormSteps[0].index && setStep(step - 1);
}

export const handlePreviousData = ({ prevProductData, productDetails }) => {

  const pricingConfigurationCopy = JSON.parse(
    JSON.stringify(productDetails?.data?.pricingConfiguration)
  );

  if (pricingConfigurationCopy) {
    pricingConfigurationCopy.interestRateConfigModels =
      pricingConfigurationCopy.interestRateConfigModels?.sort(
        (a, b) => a.min - b.min
      );
  }

  return {
    ...prevProductData,
    ...productDetails?.data,
    productInfo: productDetails?.data?.productInfo,
    customerEligibility: productDetails?.data?.customerEligibility,
    pricingConfiguration: pricingConfigurationCopy,
    liquidation: productDetails?.data?.liquidation,
    productGlMappings: productDetails?.data?.productGlMappings,
    interestComputationMethod: productDetails?.data?.interestComputationMethod,
    TermDepositLiabilityAccount:
      productDetails?.data?.TermDepositLiabilityAccount,
    InterestAccrualAccount: productDetails?.data?.InterestAccrualAccount,
    InterestExpenseAccount: productDetails?.data?.InterestExpenseAccount,
    isDraft: productDetails?.data?.isDraft,
    productType: productDetails?.data?.productType,
  };
};

export const handleDetailsSuccess = (
  activeId,
  productDetails,
  previousData,
  process,
  setProductData
) => {
  activeId.current = productDetails?.data?.id;

  if (process === "modify") {
    previousData.current = {
      ...previousData.current,
      productName: productDetails?.data?.productInfo.productName,
      prodType: productDetails?.data?.productType,
      state: ProductState[productDetails?.data?.state].toLowerCase(),
      description: productDetails?.data?.productInfo.description,
      slogan: productDetails?.data?.productInfo.slogan,
      currency: productDetails?.data?.productInfo.currency,
      requestStatus: null,
      requestType: null,
      request: "",
      initiatorId: "",
      approved_By_Id: "",
      date: new Date(),
    };
  }

  setProductData((prevProductData) =>
    handlePreviousData({ prevProductData, productDetails })
  );
};

export const handleRequestIsSuccess = ({
  requestIsSuccess,
  requestData,
  process,
  activeId,
  previousData,
  setProductData,
  setFormData,
  formData,
  id,
  type = "investment",
}: {
  requestIsSuccess: any;
  requestData: any;
  process: any;
  activeId: any;
  previousData: any;
  setProductData?: any;
  setFormData?: any;
  type?: any;
  formData?: any;
  id?: string | null;
}) => {
  if (requestIsSuccess && requestData?.data?.metaInfo) {
    const data = JSON.parse(requestData?.data?.metaInfo);

    if (process === "continue" && data?.id) {
      activeId.current = data?.id;
    }
    if (process === "withdraw_modify") {
      previousData.current = {
        ...previousData.current,
        productName: data?.productInfo?.productName,
        customerName: data?.customerBookingInfoModel?.customerName,
        principal: data?.facilityDetailsModel?.principal,
        investmentProduct: data?.facilityDetailsModel?.investmentProductName,
        description: data?.productInfo?.description,
        slogan: data?.productInfo?.slogan,

        currency: data?.productInfo?.currency,
        prodType: data?.productType,
        state: data?.state,
        requestStatus: requestData?.data?.requestStatus,
        requestType: requestData?.data?.requestType,
        request: requestData?.data?.request,
        initiatorId: requestData?.data?.initiatorId,
        approved_By_Id: requestData?.data?.approved_By_Id,
      };
    }
    if (type === "investment") {
      setProductData({
        ...data,
        pricingConfiguration: {
          ...data?.pricingConfiguration,
          interestComputationMethod: 2,
        },
      });
    }
    if (
      type === "individual_booking" &&
      (!formData?.customerBookingInfoModel?.customerId || process !== "create")
    ) {
      setFormData({ ...data, id });
    }
  }
};

export const handleMessage = ({
  isSuccess,
  modifySuccess,
  modifyRequestSuccess,
  isError,
  modifyError,
  modifyIsError,
  error,
  modifyRequestError,
  setFailed,
  setFailedText,
  setFailedSubtext,
  setSuccessText,
  setIsSuccessOpen,
  modifyRequestIsError,
  type,
}) => {
  if (isSuccess || modifySuccess || modifyRequestSuccess) {
    setSuccessText(
      type === "investment"
        ? Messages.PRODUCT_DRAFT_SUCCESS
        : Messages.BOOKING_DRAFT_SUCCESS
    );
    setIsSuccessOpen(true);
  }

  if (isError || modifyIsError || modifyRequestIsError) {
    setFailedText(Messages.PRODUCT_DRAFT_FAILED);
    setFailedSubtext(
      error?.message?.message ||
      modifyError?.message?.message ||
      modifyRequestError?.message?.message ||
      error?.message?.Message ||
      modifyError?.message?.Message ||
      modifyRequestError?.message?.Message
    );
    setFailed(true);
  }
};

export function handleNav({ process, step, setStep, navigate, id }) {
  step < termDepositFormSteps.length
    ? handleNext(step, setStep, termDepositFormSteps)
    : navigate(
      `/product-factory/investment/term-deposit/${process}?${id ? `id=${id}&` : ""
      }stage=summary`
    );
}

export default function CreateTermDeposit() {
  const { process } = useParams();
  const [searchParams] = useSearchParams();
  const stage = searchParams.get("stage");
  const id = searchParams.get("id");
  const refresh = searchParams.get("refresh");
  const activeId = useRef(null);
  const previousData = useRef({});
  const [step, setStep] = useState(5);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");
  const [initiateDraft, setInitiateDraft] = useState(false);
  const { currencies } = useContext(AppContext);
  const [productData, setProductData] = useState({
    productInfo: {
      productName: "",
      slogan: "",
      description: "",
      startDate: new Date(),
      endDate: null,
      currency: currencies.find((i) => i.text.toLowerCase() === "ngn")?.value,
    },
    customerEligibility: {
      ageGroupMin: 0,
      ageGroupMax: null,
      requireDocument: [],
      customerType: [],
      customerCategory: null,
    },
    principalDepositChargesAndTaxes: { applicableCharges: [], applicableTaxes: [] },
    partLiquidationChargesAndTaxes: { applicableCharges: [], applicableTaxes: [] },
    earlyLiquidationChargesAndTaxes: { applicableCharges: [], applicableTaxes: [] },
    maturityLiquidationChargesAndTaxes: { applicableCharges: [], applicableTaxes: [] },
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
          index: 0,
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
      part_NoticePeriod: 1,
      part_NoticePeriodUnit: 1,
      part_LiquidationPenalty: 0,
      part_LiquidationPenaltyPercentage: 0,
      part_SpecificCharges: [],
      part_SpecialInterestRate: 0,
      early_AllowEarlyLiquidation: false,
      early_RequireNoticeBeforeLiquidation: false,
      early_NoticePeriod: 0,
      early_NoticePeriodUnit: 1,
      early_LiquidationPenalty: 0,
      early_LiquidationPenaltyPercentage: 0,
      eary_SpecialInterestRate: 0,
      early_SpecificCharges: [],
    },
    productGlMappings: [],
    interestComputationMethod: 2,
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


  // useEffect(() => {
  //   console.log("d = ", productData)
  // }, [productData])

  const [createProduct, { isLoading, isSuccess, isError, reset, error }] =
    useCreateProductMutation();

  const [
    modifyProduct,
    {
      isLoading: modifyLoading,
      isSuccess: modifySuccess,
      isError: modifyIsError,
      error: modifyError,
    },
  ] = useModifyProductMutation();

  const [
    modifyRequest,
    {
      isLoading: modifyRequestLoading,
      isSuccess: modifyRequestSuccess,
      isError: modifyRequestIsError,
      error: modifyRequestError,
    },
  ] = useModifyRequestMutation();

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
      handleDetailsSuccess(
        activeId,
        productDetails,
        previousData,
        process,
        setProductData
      );
    }
  }, [productDetails]);

  const [formRef, setFormRef] = useState(null);

  useEffect(() => {
    if (initiateDraft) {
      setTimeout(() => {
        setInitiateDraft(false);
      }, 1500);
    }
  }, [initiateDraft]);

  useEffect(() => {
    handleFormRef({ step, setFormRef });
  }, [step]);

  useEffect(() => {
    handleRequestIsSuccess({
      activeId,
      previousData,
      process,
      requestData,
      requestIsSuccess,
      setProductData,
      type: "investment",
    });
  }, [requestIsSuccess]);

  useEffect(() => {
    handleMessage({
      error,
      isError,
      isSuccess,
      modifyError,
      modifyIsError,
      modifyRequestError,
      modifyRequestIsError,
      modifyRequestSuccess,
      modifySuccess,
      setFailed,
      setFailedSubtext,
      setFailedText,
      setIsSuccessOpen,
      setSuccessText,
      type: "investment",
    });
  }, [
    isSuccess,
    isError,
    error,
    modifyIsError,
    modifySuccess,
    modifyError,
    modifyRequestSuccess,
    modifyRequestIsError,
  ]);

  function handleLinks(links, process) {
    const extraLinks = [
      {
        id: 3,
        title: "Term Deposit",
        url: "/product-factory/investment",
      },
      {
        id: 4,
        title: productData?.productInfo?.productName,
        url: "#",
      },
    ];
    if (
      process === "continue" ||
      process === "modify" ||
      process === "withdraw_modify"
    ) {
      let filteredLinks = links.filter((i) => i.id !== 3);
      return [...filteredLinks, ...extraLinks];
    }

    return links;
  }
  useEffect(() => {
    if (refresh) {
      // navigate(0);
    }
  }, [refresh]);

  return (
    <div>
      {!stage && !requestIsLoading && (
        <div className="flex flex-col min-h-[100vh] ">
          <div className="px-[37px] py-[11px] bg-white">
            <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
              New Term Deposit Product
            </h1>
            <Breadcrumbs links={handleLinks(links, process)} />
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
                {/* {component} */}
                <FormComponent
                  step={step}
                  productData={productData}
                  activeId={activeId}
                  handleNav={() =>
                    handleNav({ process, id, navigate, setStep, step })
                  }
                  setProductData={setProductData}
                  setDisabled={setDisabled}
                  initiateDraft={initiateDraft}
                />

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
                      onClick={() => {
                        setIsConfirmOpen(true);
                        setInitiateDraft(!initiateDraft);
                      }}
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
          <Loader
            isOpen={isLoading || modifyLoading || modifyRequestLoading}
            text={"Submitting"}
          />
          {/* //Modals */}
          {isConfirmOpen && (
            <Confirm
              text={draftText.mainText}
              subtext={draftText.subText}
              isOpen={isConfirmOpen}
              setIsOpen={setIsConfirmOpen}
              onCancel={() => setIsConfirmOpen(false)}
              onConfirm={() =>
                handleDraft({
                  productData,
                  process,
                  id,
                  modifyRequest,
                  setIsConfirmOpen,
                  modifyProduct,
                  createProduct,
                })
              }
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
      {stage && stage === "summary" && (
        <Preview formData={productData} previousData={previousData.current} />
      )}
    </div>
  );
}
