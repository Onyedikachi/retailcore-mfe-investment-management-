import React, { useContext, useEffect, useState } from "react";
import {
  ProcessingStatusSlider,
  ActivityLog,
  Actions,
  MiniTermDepositDetail,
  ProductDetail,
  ReviewStatus,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useGetProductActivityLogQuery,
  useCreateProductMutation,
  useModifyProductMutation,
} from "@app/api";
import { Confirm, Failed, Success } from "@app/components/modals";

import { Messages, Prompts } from "@app/constants/enums";
import { AppContext } from "@app/utils";
import { summaryLinks } from "@app/constants";
export function Container({ children }) {
  return (
    <div className="rounded-[10px] border border-[#EEE] px-12 py-10">
      {children}
    </div>
  );
}
export default function Preview({ formData, oldData = null }: any) {
  console.log("🚀 ~ file: preview.tsx:36 ~ Preview ~ formData:", formData)
  const { role } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { type, process } = useParams();
  const id = searchParams.get("id");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");

  const [state, setState] = useState();

  const { data: activityData, isLoading: activityIsLoading } =
    useGetProductActivityLogQuery(
      { productid: id },
      { ski: process === "create" }
    );

  const [
    createProduct,
    { isLoading: createProductLoading, isSuccess, isError, reset, error },
  ] = useCreateProductMutation();
  const [
    modifyProduct,
    {
      isLoading: modifyLoading,
      isSuccess: modifySuccess,
      isError: modifyIsError,
      error: modifyError,
    },
  ] = useModifyProductMutation();

  const handleModify = () => {
    navigate(-1);
  };
  const handleCancel = () => {
    setConfirmText(Prompts.CANCEL_CREATION);
    setIsConfirmOpen(true);
    return;
  };
  const handleSubmit = () => {
    if (process === "modify") {
      modifyProduct({ ...formData, isDraft: false, id,  });
    } else {
      createProduct({ ...formData, isDraft: false });
    }

    // navigate(paths.INVESTMENT_DASHBOARD);
  };
  useEffect(() => {
    if (isSuccess || modifySuccess) {
      setSuccessText(
        role === "superadmin"
          ? Messages.PRODUCT_CREATE_SUCCESS
          : Messages.ADMIN_PRODUCT_CREATE_SUCCESS
      );
      setIsSuccessOpen(true);
    }

    if (isError || modifyIsError) {
      setFailedText(Messages.ADMIN_PRODUCT_CREATE_FAILED);
      setFailedSubtext(
        isError ? error?.message?.message : modifyError?.message?.message
      );
      setFailed(true);
    }
  }, [isSuccess, isError, error, modifySuccess, modifyIsError, modifyError]);

  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Process summary
        </h1>
        <Breadcrumbs
          links={summaryLinks.map((i) =>
            i.id === 3 ? { ...i, title: type } : i
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
            {process !== "create" && (
              <ReviewStatus status={"r"} reason={"r"} type={""} text="failed" />
            )}
            <Container>
              <ProductDetail detail={formData} oldData={oldData} />
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
      <Loader isOpen={false} text={""} />
      {isConfirmOpen && (
        <Confirm
          text={confirmText}
          subtext={subText}
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          onConfirm={() => {
            setIsConfirmOpen(false);
            navigate("/product-factory/investment");
          }}
          onCancel={() => {
            setIsConfirmOpen(false);
          }}
        />
      )}
      {isSuccessOpen && (
        <Success
          text={successText}
          isOpen={isSuccessOpen}
          setIsOpen={setIsSuccessOpen}
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
        isOpen={createProductLoading || modifyLoading}
        text={"Submitting"}
      />
    </div>
  );
}
