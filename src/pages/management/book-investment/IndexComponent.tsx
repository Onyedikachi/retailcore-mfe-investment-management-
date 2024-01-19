import React, { useEffect, useState, useRef } from "react";
import { BookInvestmentFormSteps } from "@app/constants";
import { ProductInfoInvestmentCalc } from "@app/components/management";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import handleFormRef from "./HandleFormRef";
import { Preview } from "@app/components/pages/management/book-investment";
import {
  Breadcrumbs,
  Button,
  FormStepComponent,
  Loader,
} from "@app/components";
import BookInvestmentFormComponent from "./FormComponent";
import {
  useBookingCalcMutation,
  useCreateInvestmentMutation,
  useGetProductDetailQuery,
  useGetInvestmentDetailQuery,
  useGetInvestmentRequestDetailQuery,
  useModifyInvestmentMutation,
  useModifyInvestmentRequestMutation,
} from "@app/api";
import { Confirm, Failed, Success } from "@app/components/modals";
import { Prompts } from "@app/constants/enums";
import {
  handleMessage,
  handleRequestIsSuccess,
} from "@app/pages/investment/term-deposit/create-term-deposit/IndexComponent";
import BottomBarLoader from "@app/components/BottomBarLoader";

export function handleNext(step, setStep, BookInvestmentFormSteps) {
  console.log(step);
  step < BookInvestmentFormSteps.length && setStep(step + 1);
}

export function handleNav({step, setStep, navigate, investmentType}) {
  step < BookInvestmentFormSteps.length
    ? handleNext(step, setStep, BookInvestmentFormSteps)
    : navigate(
      `/product-factory/investment/management/${process}/${investmentType}?stage=summary`
    );
}

export function handleLinks(links, process) {
  // const extraLinks = [
  //   {
  //     id: 3,
  //     title: "Te\rm Deposit",
  //     url: "/product-factory/investment",
  //   },
  //   {
  //     id: 4,
  //     title: productData?.productInfo?.productName,
  //     url: "#",
  //   },
  // ];
  // if (
  //   process === "continue" ||
  //   process === "modify" ||
  //   process === "withdraw_modify"
  // ) {
  //   let filteredLinks = links.filter((i) => i.id !== 3);
  //   return [...filteredLinks, ...extraLinks];
  // }
  if (process === "restructure") {
    const linkWithId2 = links.find((link) => link.id === 2);

    // Update its title property
    if (linkWithId2) {
      linkWithId2.title = "Restructure Investment";
    }
  }

  return links;
}

export function handlePrev(step, setStep, BookInvestmentFormSteps) {
  step > BookInvestmentFormSteps[0].index && setStep(step - 1);
}

export const handleDraft = ({
  formData,
  process,
  id,
  modifyRequest,
  setIsConfirmOpen,
  modifyProduct,
  createInvestment,
}) => {
  setIsConfirmOpen(false);
  if (process === "modify") {
    modifyProduct({ ...formData, isDraft: true, id });
  }
  if (process === "create" || process === "clone") {
    const { id, ...restData } = formData;
    createInvestment({ ...restData, isDraft: true });
  }
  if (process === "continue" || process === "withdraw_modify") {
    modifyRequest({ ...formData, isDraft: true, id });
  }
};

export default function IndexComponent() {
  const { process, investmentType } = useParams();
  const [searchParams] = useSearchParams();
  const stage = searchParams.get("stage");
  const id = searchParams.get("id");
  const refresh = searchParams.get("refresh");
  const activeId = useRef(null);
  const previousData = useRef({});
  const [step, setStep] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");
  const [formRef, setFormRef] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [calcDetail, setCalcDetail] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    id: id || null,
    customerId: "",
    customerProfile: null,
    customerBookingInfoModel: {
      customerId: "",
      customerName: "",
      customerAccount: "",
      investmentformUrl: "",
      accountStatus: "",
      customerProfileid: "",
      balance: "",
      currencyId:"",
    },
    facilityDetailsModel: {
      capitalizationMethod: 2,
      interestRate: null,
      principal: null,
      tenor: null,
      investmentPurpose: "",
      investmentProductId: null,
      investmentProductName: "",
      tenorMin: null,
      tenorMax: null,
      prinMin: null,
      prinMax: null,
      intMin: null,
      intMax: null,
    },
    transactionSettingModel: {
      accountName: "",
      accountForLiquidation: "",
      notifyCustomerOnMaturity: false,
      rollOverAtMaturity: false,
      rollOverOption: 0,
    },
    isDraft: false,
    recentUpdated: false,
    recentlyUpdatedMeta: "",
  });

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/product-factory/investment/management/overview",
    },
    {
      id: 2,
      title: "book new Investment",
      url: "/product-factory/investment/management/individual",
    },
    {
      id: 3,
      title: investmentType,
      url: `/product-factory/investment/management/${investmentType}`,
    },
  ];





  const {
    data: detail,
    isSuccess: detailIsSuccess,
    isError: detailIsError,
    error: detailError,
    isLoading: detailLoading,
  } = useGetProductDetailQuery(
    { id: formData?.facilityDetailsModel?.investmentProductId },
    {
      skip: !formData?.facilityDetailsModel?.investmentProductId,
    }
  );

  const [createInvestment, { data, isLoading, isSuccess, isError, error }] =
    useCreateInvestmentMutation();

  const [
    modifyProduct,
    {
      isLoading: modifyLoading,
      isSuccess: modifySuccess,
      isError: modifyIsError,
      error: modifyError,
    },
  ] = useModifyInvestmentMutation();

  const [
    modifyRequest,
    {
      isLoading: modifyRequestLoading,
      isSuccess: modifyRequestSuccess,
      isError: modifyRequestIsError,
      error: modifyRequestError,
    },
  ] = useModifyInvestmentRequestMutation();

  const {
    data: requestData,
    isLoading: requestIsLoading,
    isSuccess: requestIsSuccess,
  } = useGetInvestmentRequestDetailQuery(
    {
      id,
    },
    { skip: !id }
  );

  const {
    data: productDetails,
    isLoading: productDetailsIsLoading,
    isSuccess: productDetailsIsSuccess,
  } = useGetInvestmentDetailQuery(
    {
      id,
    },
    { skip: !id }
  );
  const [
    bookingCalc,
    {
      data: calcData,
      isSuccess: calcIsSuccess,
      isError: calcIsError,
      error: calcError,
      isLoading: calcLoading,
    },
  ] = useBookingCalcMutation();

  const fetchRate = () => {
    bookingCalc({
      principal: formData?.facilityDetailsModel?.principal,
      rate: formData?.facilityDetailsModel?.interestRate,
      tenor: formData?.facilityDetailsModel?.tenor,
      tenorUnit: productDetail?.pricingConfiguration?.applicableTenorMaxUnit,
      method: productDetail?.pricingConfiguration?.interestComputationMethod,
    });
  };

  useEffect(() => {
    if (
      productDetail &&
      formData?.facilityDetailsModel?.tenor &&
      formData?.facilityDetailsModel?.principal &&
      formData?.facilityDetailsModel?.interestRate
    ) {
      fetchRate();
    }
  }, [
    formData?.facilityDetailsModel?.tenor,
    formData?.facilityDetailsModel?.principal,
    formData?.facilityDetailsModel?.interestRate,
    formData?.facilityDetailsModel?.capitalizationMethod,
    productDetail,
  ]);

  useEffect(() => {
    setCalcDetail(calcData?.data);
  }, [calcData, calcIsSuccess]);

  useEffect(() => {
    if (detailIsSuccess) {
      setProductDetail(detail?.data);
      setFormData({
        ...formData,
        facilityDetailsModel: {
          ...formData.facilityDetailsModel,
          investmentProductName: detail?.data?.productInfo?.productName,
        },
      });
    }
  }, [detailIsSuccess, detail]);

  useEffect(() => {
    handleFormRef({ step, setFormRef });
  }, [step]);

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
      type: "booking",
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

  useEffect(() => {
    handleRequestIsSuccess({
      activeId,
      previousData,
      process,
      requestData,
      requestIsSuccess,
      setFormData,
      type: "individual_booking",
    });
  }, [requestIsSuccess]);
  return (
    <div>
      {!stage && (
        <div className="flex flex-col min-h-[100vh] ">
          <div className="px-[37px] py-[11px] bg-white">
            <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
              New Term Deposit Product
            </h1>
            <Breadcrumbs links={handleLinks(links, process)} />
          </div>
          {/* {productData.productInfo.productName} */}
          <div className="">
            <div className="flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
              <div className="flex-1 bg-[#ffffff] rounded-md px-10 lg:px-[100px] pt-[54px] pb-[49px] oveflow-x-auto">
                <div className="pb-[49px] ">
                  <FormStepComponent
                    formStepItems={BookInvestmentFormSteps}
                    step={step}
                  />
                </div>
                <div className=" bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[87px] pt-[100px] pb-[43px] ">
                  {/* {form component} */}
                  {!requestIsLoading ? (
                    <BookInvestmentFormComponent
                      formData={formData}
                      setFormData={setFormData}
                      step={step}
                      handleNav={() => handleNav({ step, setStep, navigate, investmentType })}
                      setDisabled={setDisabled}
                      isSavingDraft={isSavingDraft}
                      setProductDetail={setProductDetail}
                      productDetail={productDetail}
                      detailLoading={detailLoading}
                    />
                  ) : (
                    <BottomBarLoader />
                  )}

                  <div className="h-px w-full bg-[#CCCCCC] mb-12 mt-16"></div>

                  <div className="flex mb-[70px]  justify-between">
                    <div>
                      {step > 1 && (
                        <Button
                          type="button"
                          onClick={() => setStep(step - 1)}
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
                          setIsSavingDraft(!isSavingDraft);
                        }}
                        className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                      >
                        Save As Draft
                      </Button>

                      <Button
                        type="submit"
                        form={formRef}
                        disabled={disabled}
                        className={
                          "bg-sterling-red-800 rounded-lg px-10 py-1 font-medium text-base"
                        }
                      >
                        {step < 3 ? "Next" : "Proceed"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {step !== 1 && productDetail && (
                <div className="w-[370px]">
                  <ProductInfoInvestmentCalc
                    productDetail={productDetail}
                    formData={formData}
                    calcDetail={calcDetail}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {stage && stage === "summary" && (
        <Preview
          productDetail={productDetail}
          formData={{ ...formData, calcDetail }}
        />
      )}

      <Loader
        isOpen={isLoading || modifyLoading || modifyRequestLoading}
        text={"Submitting"}
      />
      {/* //Modals */}
      {isConfirmOpen && (
        <Confirm
          text={Prompts.PRODUCT_DRAFT}
          subtext={Prompts.PRODUCT_DRAFT_SUBTEXT}
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={() =>
            handleDraft({
              formData,
              process,
              id,
              modifyRequest,
              setIsConfirmOpen,
              modifyProduct,
              createInvestment,
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
          action="draft"
        />
      )}
    </div>
  );
}
