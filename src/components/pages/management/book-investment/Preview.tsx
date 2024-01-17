import React, { useContext, useEffect, useState } from "react";
import {
  ProcessingStatusSlider,
  ActivityLog,
  Actions,
  MiniTermDepositDetail,
  BookingDetail,
  ReviewStatus,
  InvestmentCalculation,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useGetInvestmentActivityLogQuery,
  useModifyInvestmentMutation,
  useModifyInvestmentRequestMutation,
  useCreateInvestmentMutation,
} from "@app/api";
import { Confirm, Failed, Success } from "@app/components/modals";

import { Messages, Prompts } from "@app/constants/enums";
import { AppContext } from "@app/utils";
import { summaryLinks } from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
export function Container({ children }) {
  return (
    <div className="rounded-[10px] border border-[#EEE] px-12 py-10">
      {children}
    </div>
  );
}

export const handleSuccessMessage = (
  isSuccess,
  setSuccessText,
  setIsSuccessOpen,
  setSubText,
  role,
  text = ""
) => {
  setSuccessText(
    role === "superadmin"
      ? isSuccess
        ? Messages.BOOKING_CREATE_SUCCESS
        : Messages.BOOKING_MODIFY_SUCCESS
      : Messages.ADMIN_BOOKING_CREATE_SUCCESS
  );
  if (text) {
    setSubText(text);
  }
  setIsSuccessOpen(true);
};

export const handleErrorMessage = (
  error,
  modifyError,
  modifyRequestError,
  isError,
  setFailedText,
  setFailedSubtext,
  setFailed
) => {
  setFailedText(
    isError
      ? Messages.ADMIN_BOOKING_CREATE_FAILED
      : Messages.ADMIN_BOOKING_MODIFY_FAILED
  );
  setFailedSubtext(
    error?.message?.message ||
      modifyError?.message?.message ||
      modifyRequestError?.message?.message ||
      error?.message?.Message ||
      modifyError?.message?.Message ||
      modifyRequestError?.message?.Message
  );
  setFailed(true);
};

export const cancelProcess = (process, setConfirmText, setIsConfirmOpen) => {
  if (process === "create") {
    setConfirmText(Prompts.CANCEL_INVESTMENT_CREATION);
  }
  if (process === "modify" || process === "withdraw_modify") {
    setConfirmText(Prompts.CANCEL_INVESTMENT_MODIFICATION);
  }
  if (process === "verdict" || process === "continue") {
    setConfirmText(Prompts.CANCEL_PROCESS);
  }
  setIsConfirmOpen(true);
  return;
};

export const submitForm = (
  formData,
  modifyProduct,
  modifyRequest,
  createProduct,
  process,
  id,
  previousData
) => {
  if (process === "modify") {
    modifyProduct({
      ...formData,
      isDraft: false,
      id,
      recentlyUpdatedMeta: previousData ? JSON.stringify(previousData) : null,
    });
  }
  if (process === "withdraw_modify" || process === "continue") {
    modifyRequest({
      ...formData,
      isDraft: false,
      id,
      recentlyUpdatedMeta: previousData ? JSON.stringify(previousData) : null,
    });
  }

  if (process === "create" || process === "clone") {
    createProduct({ ...formData, isDraft: false });
  }

  // navigate(paths.INVESTMENT_DASHBOARD);
};

export default function Preview({
  formData,
  productDetail,
  previousData = null,
}: any) {
  const { role, currencies } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { investmentType, process } = useParams();
  const id = searchParams.get("id");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [subText, setSubText] = useState("");
  const [failedSubText, setFailedSubtext] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedText, setFailedText] = useState("");
  const [state, setState] = useState();

  const { data: activityData, isLoading: activityIsLoading } =
    useGetInvestmentActivityLogQuery(
      { bookingrequestId: id },
      { skip: process === "create" }
    );

  const [
    createProduct,
    { isLoading: createProductLoading, isSuccess, isError, reset, error },
  ] = useCreateInvestmentMutation();
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

  const handleModify = () => {
    navigate(-1);
  };
  const handleCancel = () =>
    cancelProcess(process, setConfirmText, setIsConfirmOpen);

  const handleSubmit = () =>
    submitForm(
      formData,
      modifyProduct,
      modifyRequest,
      createProduct,
      process,
      id,
      previousData
    );
  useEffect(() => {
    if (isSuccess || modifySuccess || modifyRequestSuccess) {
      let text;
      if (process === "create" && role === "superadmin") {
        text = `${currencyFormatter(
          formData?.facilityDetailsModel?.principal,
          handleCurrencyName(productDetail?.productInfo?.currency, currencies)
        )} will be deducted from ${
          formData?.transactionSettingModel?.accountForLiquidation
        }, once approval is granted`;
        setSubText(text);
      }

      handleSuccessMessage(
        isSuccess,
        setSuccessText,
        setIsSuccessOpen,
        setSubText,
        role,
        text
      );
    }

    if (isError || modifyIsError || modifyRequestIsError) {
      handleErrorMessage(
        error,
        modifyError,
        modifyRequestError,
        isError,
        setFailedText,
        setFailedSubtext,
        setFailed
      );
    }
  }, [
    isSuccess,
    isError,
    error,
    modifySuccess,
    modifyIsError,
    modifyError,
    modifyRequestError,
    modifyRequestIsError,
    modifyRequestSuccess,
  ]);
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
    {
      id: 4,
      title: "Process summary",
      url: "#",
    },
  ];
  return (
    <div data-testid="preview" className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Process summary
        </h1>
        <Breadcrumbs
          links={links.map((i) =>
            i.id === 3 ? { ...i, title: investmentType } : i
          )}
        />
      </div>{" "}
      <div className="w-full flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
        <div className="flex-1   bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] flex flex-col gap-5">
          <div className="max-h-[600px] overflow-y-auto flex flex-col gap-5">
            <ProcessingStatusSlider
              rangeLabels={["Pending submission", "Approved"]}
              rightClass="opacity-50"
            />
            {process === "preview" && (
              <ReviewStatus status={"r"} reason={"r"} type={""} text="failed" />
            )}
            <Container>
              <InvestmentCalculation
                detail={formData}
                productDetail={productDetail}
              />
            </Container>
            <Container>
              <BookingDetail
                detail={formData}
                productDetail={productDetail}
                previousData={previousData}
                type="individual"
              />
            </Container>
          </div>
          <Actions
            handleCancel={handleCancel}
            handleModify={handleModify}
            handleSubmit={handleSubmit}
          />
        </div>

        <ActivityLog
          isFetching={false}
          isLoading={activityIsLoading}
          activities={activityData?.results}
        />
      </div>
      {isSuccessOpen && (
        <Success
          text={successText}
          isOpen={isSuccessOpen}
          setIsOpen={setIsSuccessOpen}
          canCreate={process === "create"}
          subtext={subText}
        />
      )}
      {isConfirmOpen && (
        <Confirm
          text={confirmText}
          subtext={subText}
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          onConfirm={() => {
            setIsConfirmOpen(false);
            // navigate("/product-factory/investment?category=requests");
          }}
          onCancel={() => {
            setIsConfirmOpen(false);
          }}
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
      <Loader
        isOpen={createProductLoading || modifyLoading || modifyRequestLoading}
        text={"Submitting"}
      />
    </div>
  );
}
