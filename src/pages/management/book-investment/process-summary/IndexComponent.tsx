import React, { useEffect, useState, useRef } from "react";
import { BookInvestmentFormSteps } from "@app/constants";
import { ProductInfoInvestmentCalc } from "@app/components/management";
import { HiShare ,HiPrinter} from "react-icons/hi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import handleFormRef from "./handleFormRef";
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
import { PdfViewer } from "./PdfPreviewComponent";

export function handleNext(step, setStep, BookInvestmentFormSteps) {
  step < BookInvestmentFormSteps.length && setStep(step + 1);
}

export function handleNav({
  step,
  setStep,
  navigate,
  investmentType,
  process,
  id,
  formData,
}) {
  if (!formData?.customerBookingInfoModel?.customerId) return;

  step < BookInvestmentFormSteps.length
    ? handleNext(step, setStep, BookInvestmentFormSteps)
    : navigate(
        `/investment-management/${process}/${investmentType}?stage=summary&id=${
          formData?.id || id
        }`
      );
}

export function handleLinks(links, process) {
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
      currencyId: "",
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
      intMin: 0,
      intMax: 100,
      tenorUnit: 1,
    },
    transactionSettingModel: {
      accountName: "",
      accountForLiquidation: "",
      notifyCustomerOnMaturity: false,
      rollOverAtMaturity: false,
      rollOverOption: 0,
      accountForLiquidationLedgerId: "",
    },
    isDraft: false,
    recentUpdated: false,
    recentlyUpdatedMeta: "",
  });

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/investment-management/overview",
    },
    {
      id: 2,
      title: "book new Investment",
      url: "/investment-management/individual",
    },
    {
      id: 3,
      title: investmentType,
      url: `/investment-management/create/${investmentType}`,
    },
    {
      id: 4,
      title: "PROCESS SUMMARY",
      url: `/investment-management/create/${investmentType}/process-summary`,
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
  const [preCreateInvestment, { data: preData, isSuccess: preSuccess }] =
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

  const [preModifyRequest] = useModifyInvestmentRequestMutation();

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
      tenorUnit: formData?.facilityDetailsModel?.tenorUnit,
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
    formData?.facilityDetailsModel?.tenorUnit,
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
    if (preSuccess && !formData.id) {
      setFormData({
        ...formData,
        id: preData?.data,
      });
    }
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
    data,
    isSuccess,
    isError,
    error,
    modifyIsError,
    modifySuccess,
    modifyError,
    modifyRequestSuccess,
    modifyRequestIsError,
    preSuccess,
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
      formData,
      id
    });
  }, [requestIsSuccess]);

  const handlePrint = (pdfUrl) => {
    const iframe = document.createElement('iframe');
    iframe.src = pdfUrl;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.contentWindow.onload = () => {
      iframe.contentWindow.print();
    };
  };

  return (
    <div>
      {!stage && (
        <div className="flex flex-col min-h-[100vh] ">
          <div className="px-[37px] py-[11px] bg-white">
            <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
             PROCESS SUMMARY
            </h1>
            <Breadcrumbs links={handleLinks(links, process)} />
          </div>
        {/* 
        
        */}

<div className="flex gap-x-5 w-full flex-1 p-8">
<div className="bg-white pt-6 px-[30px] py-4 border border-[#E5E9EB] rounded-lg flex-1 w-full pb-16">

  <div className="flex justify-end gap-5">
  <button
            onClick={() => handlePrint("https://pdfobject.com/pdf/sample.pdf")}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiPrinter className="text-lg" /> Print
          </button>
  <button
            onClick={() => {}}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiShare className="text-lg" /> Share
          </button>
 
  </div>

  <div className="h-[649px]	my-auto py-10	 overflow-hidden w-full">
    <PdfViewer pdfUrl={"https://pdfobject.com/pdf/sample.pdf"} />
     </div>
  <div className="flex justify-end gap-5">
  <button
            data-testid="refresh-btn"
            onClick={() => {}}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4332 1.09184C11.4334 0.864339 11.3508 0.642467 11.197 0.457273C11.0431 0.272079 10.8257 0.132831 10.5751 0.0590163C10.3245 -0.0147986 10.0533 -0.0194868 9.79949 0.045608C9.54565 0.110703 9.32186 0.242323 9.15944 0.422049L0.267636 10.2398C0.0941762 10.4313 0 10.667 0 10.9096C0 11.1522 0.0941762 11.3879 0.267636 11.5794L9.15944 21.3972C9.32186 21.5769 9.54565 21.7085 9.79949 21.7736C10.0533 21.8387 10.3245 21.8341 10.5751 21.7602C10.8257 21.6864 11.0431 21.5472 11.197 21.362C11.3508 21.1768 11.4334 20.9549 11.4332 20.7274V16.3749C18.2659 16.497 21.5483 17.6108 23.1971 18.8217C24.7646 19.9725 25.0516 21.3263 25.3502 22.7444L25.4276 23.1099C25.4846 23.3714 25.6509 23.6059 25.8953 23.7695C26.1396 23.933 26.4451 24.0143 26.7543 23.9979C27.0635 23.9816 27.3551 23.8688 27.5742 23.6807C27.7933 23.4926 27.9248 23.2423 27.944 22.9768C28.1612 19.9791 27.8348 15.6353 25.3692 12.0016C22.976 8.47482 18.6661 5.76292 11.4332 5.4793V1.09184Z" fill="#CF2A2A"/>
</svg>
 Return to dashboard
          </button>
  <button
            data-testid="refresh-btn"
            onClick={() => {}}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3636 10.5H21.6364C21.9739 10.5 22.2976 10.342 22.5363 10.0607C22.775 9.77936 22.9091 9.39783 22.9091 9V7.5C22.9091 7.10217 22.775 6.72064 22.5363 6.43934C22.2976 6.15803 21.9739 6 21.6364 6H20.3636C20.0261 6 19.7024 6.15803 19.4637 6.43934C19.225 6.72064 19.0909 7.10217 19.0909 7.5V9C19.0909 9.39783 19.225 9.77936 19.4637 10.0607C19.7024 10.342 20.0261 10.5 20.3636 10.5ZM6.36364 12H12.7273C13.0648 12 13.3885 11.842 13.6272 11.5607C13.8659 11.2794 14 10.8978 14 10.5C14 10.1022 13.8659 9.72064 13.6272 9.43934C13.3885 9.15804 13.0648 9 12.7273 9H6.36364C6.02609 9 5.70237 9.15804 5.46368 9.43934C5.225 9.72064 5.09091 10.1022 5.09091 10.5C5.09091 10.8978 5.225 11.2794 5.46368 11.5607C5.70237 11.842 6.02609 12 6.36364 12ZM26.7273 0H1.27273C0.935179 0 0.611456 0.158036 0.372773 0.43934C0.13409 0.720645 0 1.10218 0 1.5V22.5C0 22.8978 0.13409 23.2794 0.372773 23.5607C0.611456 23.842 0.935179 24 1.27273 24H26.7273C27.0648 24 27.3885 23.842 27.6272 23.5607C27.8659 23.2794 28 22.8978 28 22.5V1.5C28 1.10218 27.8659 0.720645 27.6272 0.43934C27.3885 0.158036 27.0648 0 26.7273 0ZM26.7273 12.3636C26.7273 17.9618 22.1891 22.5 16.5909 22.5H13.6272H11.4148C5.7594 22.5 1.12259 18.0158 0.933333 12.3636C0.933333 6.36381 5.79715 1.5 11.797 1.5H15.8636C21.8635 1.5 26.7273 6.36381 26.7273 12.3636ZM6.36364 18H12.7273C13.0648 18 13.3885 17.842 13.6272 17.5607C13.8659 17.2794 14 16.8978 14 16.5C14 16.1022 13.8659 15.7206 13.6272 15.4393C13.3885 15.158 13.0648 15 12.7273 15H6.36364C6.02609 15 5.70237 15.158 5.46368 15.4393C5.225 15.7206 5.09091 16.1022 5.09091 16.5C5.09091 16.8978 5.225 17.2794 5.46368 17.5607C5.70237 17.842 6.02609 18 6.36364 18Z" fill="#CF2A2A"/>
</svg>
 Create new investment
          </button>
 
  </div>
</div>
<div className="bg-white pt-6 px-[30px] py-4 border border-[#E5E9EB] rounded-lg  w-[300px] pb-16">
<div className="flex-col gap-5">
<h1 className="text-[#747373] text-base font-medium mb-7 uppercase">
            INVESTMENT CERTIFICATE
            </h1>


            <div className="gap-3 text-sm">
              <p>Initiator</p>
            <p>Uzoma Okoro</p>
              </div>

            <div className="gap-3 text-sm mt-6">
            <p>Initiation date and time</p>
              </div>


</div>
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
