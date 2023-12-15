import React, { useContext, useEffect, useState } from "react";
import { Button, Loader } from "@app/components";
import SubmitSvg from "@app/assets/images/SubmitSvg";
import ModifySvg from "@app/assets/images/ModifySvg";
import CancelSvg from "@app/assets/images/CancelSvg";
import { IoArrowUndo } from "react-icons/io5";
import ShareButton from "../ShareButton";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Confirm, Failed, Prompt, Success } from "../modals";
import { AppContext } from "@app/utils";
import { useApproveProductMutation, useRejectProductMutation } from "@app/api";
import { Messages, Prompts } from "@app/constants/enums";
import Rejection from "../modals/Rejection";

export const handlePrint = () => {
  window.print();
};

export default function Actions({
  handleSubmit,
  handleModify,
  handleCancel,
  requestDetail,
}: any) {
  const { role, permissions } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sub_type = searchParams.get("sub_type");
  const filter = searchParams.get("filter");
  const {id, process } = useParams() || {};
  const [action, setAction] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isRejection, setRejection] = useState(false);
  const [reason, setReason] = useState("");
  const [routeTo, setRouteTo] = useState<any>(null);
  const [
    approveProduct,
    {
      isSuccess: approveSuccess,
      isError: approveIsError,
      error: approveError,
      isLoading: approveLoading,
    },
  ] = useApproveProductMutation();

  const [
    rejectProduct,
    {
      isSuccess: rejectSuccess,
      isError: rejectIsError,
      error: rejectError,
      isLoading: rejectLoading,
    },
  ] = useRejectProductMutation();

  const initiateVeridict = (value) => {
    setAction(value);
    if (value === "approve" && !sub_type) {
      setConfirmText(Prompts.PRODUCT_CREATION_APPROVE);
    }
    if (value === "reject" && !sub_type) {
      setConfirmText(Prompts.PRODUCT_CREATION_REJECT);
    }

    if (value === "approve" && sub_type === "activation") {
      setConfirmText(Prompts.PRODUCT_ACTIVATION_APPROVE);
    }
    if (value === "reject" && sub_type === "activation") {
      setConfirmText(Prompts.PRODUCT_ACTIVATION_REJECT);
    }
    if (value === "approve" && sub_type === "deactivation") {
      setConfirmText(Prompts.PRODUCT_DEACTIVATION_APPROVE);
    }
    if (value === "reject" && sub_type === "deactivation") {
      setConfirmText(Prompts.PRODUCT_DEACTIVATION_REJECT);
    }
    if (value === "approve" && sub_type === "modification") {
      setConfirmText(Prompts.PRODUCT_MODIFY_APPROVE);
    }
    if (value === "reject" && sub_type === "modification") {
      setConfirmText(Prompts.PRODUCT_MODIFY_REJECT);
    }

    if (value === "cancel" && (process === "create" ||  process === "clone" ||  process === "continue") ) {
    
      setConfirmText(Prompts.CANCEL_CREATION);
    }
    if (value === "cancel" && (process === "modify" || process === "withdraw_modify")) {
      setConfirmText(Prompts.CANCEL_MODIFICATION);
    }
    if (value === "cancel" && process === "verdict") {
      setConfirmText(Prompts.CANCEL_PROCESS);
    }

    setIsConfirmOpen(true);
  };
  const handleConfirm = () => {
    if (action === "approve") {
      approveProduct({ id });
    }
    if (action === "reject") {
      setRejection(true);
    }
    if (action === "cancel") {
      navigate(
        `/product-factory/investment?category=requests${
          filter ? "&filter=" + filter : ""
        }`
      );
    }
  };

  const handleRejection = () => {
    setRejection(false);
    rejectProduct({ reason, id, routeTo });
  };
  useEffect(() => {
    if (rejectSuccess) {
      setSuccessText(Messages.PRODUCT_CREATE_REJECTED);
      setIsSuccessOpen(true);
    }
    if (approveSuccess) {
      setSuccessText(Messages.PRODUCT_CREATE_APPROVED);
      setIsSuccessOpen(true);
    }
    if (rejectIsError) {
      setFailedText(Messages.PRODUCT_REJECT_FAILED);
      setFailedSubtext(rejectError?.message?.message);
      setFailed(true);
    }

    if (approveIsError) {
      setFailedText(Messages.PRODUCT_APPROVE_FAILED);
      setFailedSubtext(approveError?.message?.message);
      setFailed(true);
    }
  }, [
    rejectSuccess,
    rejectIsError,
    rejectError,
    approveSuccess,
    approveIsError,
  ]);
  return (
    <div data-testid="actions-div" className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-[60px] py-[40px]  ">
      {/* Submission  */}
      {(process === "create" || process === "modify" || process === "continue" ||  process === "withdraw_modify" ||  process === "clone") && (
        <div className=" flex  gap-6">
          <button
            onClick={handleCancel}
            type="button"
            className="max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
          >
            <CancelSvg />

            <div className=" text-gray-500 text-base font-medium leading-normal">
              Cancel
            </div>
          </button>

          <Button
            onClick={handleModify}
            className="ml-auto max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
          >
            <ModifySvg />
            <span className="text-gray-500 text-base font-medium leading-normal">
              Modify
            </span>
          </Button>

          <button
            onClick={handleSubmit}
            disabled={false}
            type="submit"
            className="px-10 py-[5px] flex items-center gap-2 justify-center text-[#ffffff] bg-sterling-red-800 rounded-lg active:scale-95"
          >
            <SubmitSvg />
            <span className=" font-medium text-base">Submit</span>
          </button>
        </div>
      )}
      {/* Preview  */}
      {process == "preview" && (
        <div className=" flex  gap-x-6 justify-end">
          <Button
            data-testid="print"
            onClick={() => handlePrint()}
            className="cursor-pointer max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
          >
            <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.55313 2.4001C4.55313 1.92271 4.74277 1.46487 5.08033 1.12731C5.4179 0.78974 5.87574 0.600098 6.35313 0.600098H14.7531C15.2305 0.600098 15.6884 0.78974 16.0259 1.12731C16.3635 1.46487 16.5531 1.92271 16.5531 2.4001V3.0001H17.1531C17.9488 3.0001 18.7118 3.31617 19.2744 3.87878C19.8371 4.44139 20.1531 5.20445 20.1531 6.0001V12.0001C20.1531 12.4775 19.9635 12.9353 19.6259 13.2729C19.2884 13.6105 18.8305 13.8001 18.3531 13.8001H16.5531V15.6001C16.5531 16.0775 16.3635 16.5353 16.0259 16.8729C15.6884 17.2105 15.2305 17.4001 14.7531 17.4001H6.35313C5.87574 17.4001 5.4179 17.2105 5.08033 16.8729C4.74277 16.5353 4.55313 16.0775 4.55313 15.6001V13.8001H2.75313C2.27574 13.8001 1.8179 13.6105 1.48033 13.2729C1.14277 12.9353 0.953125 12.4775 0.953125 12.0001V6.0001C0.953125 5.20445 1.2692 4.44139 1.8318 3.87878C2.39441 3.31617 3.15748 3.0001 3.95312 3.0001H4.55313V2.4001ZM15.3531 2.4001C15.3531 2.24097 15.2899 2.08836 15.1774 1.97583C15.0649 1.86331 14.9123 1.8001 14.7531 1.8001H6.35313C6.194 1.8001 6.04138 1.86331 5.92886 1.97583C5.81634 2.08836 5.75313 2.24097 5.75313 2.4001V3.0001H15.3531V2.4001ZM5.75313 10.8001V15.6001C5.75313 15.7592 5.81634 15.9118 5.92886 16.0244C6.04138 16.1369 6.194 16.2001 6.35313 16.2001H14.7531C14.9123 16.2001 15.0649 16.1369 15.1774 16.0244C15.2899 15.9118 15.3531 15.7592 15.3531 15.6001V10.8001C15.3531 10.641 15.2899 10.4884 15.1774 10.3758C15.0649 10.2633 14.9123 10.2001 14.7531 10.2001H6.35313C6.194 10.2001 6.04138 10.2633 5.92886 10.3758C5.81634 10.4884 5.75313 10.641 5.75313 10.8001Z"
                fill="#636363"
              />
            </svg>

            <div className=" text-gray-500 text-base font-medium leading-normal">
              Print
            </div>
          </Button>

          <ShareButton
            title="Branch Management"
            text="Branch Process summary"
            url={window.location.href}
          />

          <Link
            to={`/product-factory/investment?category=requests${
              filter ? "&filter=" + filter : ""
            }`}
          >
            <Button
              data-testid="gotodashboard"
              className="cursor-pointer max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
            >
              <IoArrowUndo className="text-[#636363] w-[24px] h-[24px]" />

              <div className=" text-gray-500 text-base font-medium leading-normal">
                Return to dashboard
              </div>
            </Button>
          </Link>

          {/* <Button
            data-testid="request_modify"
            className="max-w-max  px-10 py-[5px] text-white rounded-lg border border-sterling-red-800 bg-sterling-red-800 justify-center items-center gap-2.5 inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3546 1.09184C10.3548 0.864339 10.284 0.642467 10.1521 0.457273C10.0202 0.272079 9.83384 0.132831 9.61905 0.0590163C9.40427 -0.0147986 9.17182 -0.0194868 8.95425 0.045608C8.73667 0.110703 8.54486 0.242323 8.40564 0.422049L0.78409 10.2398C0.63541 10.4313 0.554688 10.667 0.554688 10.9096C0.554687 11.1522 0.63541 11.3879 0.78409 11.5794L8.40564 21.3972C8.54486 21.5769 8.73667 21.7085 8.95425 21.7736C9.17182 21.8387 9.40427 21.8341 9.61905 21.7602C9.83384 21.6864 10.0202 21.5472 10.1521 21.362C10.284 21.1768 10.3548 20.9549 10.3546 20.7274V16.3749C16.2112 16.497 19.0246 17.6108 20.4379 18.8217C21.7815 19.9725 22.0275 21.3263 22.2834 22.7444L22.3498 23.1099C22.3987 23.3714 22.5412 23.6059 22.7506 23.7695C22.9601 23.933 23.2219 24.0143 23.4869 23.9979C23.752 23.9816 24.0019 23.8688 24.1897 23.6807C24.3775 23.4926 24.4902 23.2423 24.5067 22.9768C24.6929 19.9791 24.4131 15.6353 22.2997 12.0016C20.2484 8.47482 16.5542 5.76292 10.3546 5.4793V1.09184Z"
                fill="#fff"
              />
            </svg>
            <span className="text-white text-base font-medium leading-normal">
              Modify
            </span>
          </Button> */}
        </div>
      )}
      {/* Approval/ Rejection  */}
      {process === "verdict" &&
        permissions.includes(
          "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
        ) && (
          <div className="flex  gap-6">
            <Button
              onClick={() => initiateVeridict("cancel")}
              data-testid="cancel"
              className="cursor-pointer max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.4 17L12 13.4L15.6 17L17 15.6L13.4 12L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4L10.6 12L7 15.6L8.4 17ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                  fill="#636363"
                />
              </svg>

              <div className="mr-auto text-gray-500 text-base font-medium leading-normal">
                Cancel
              </div>
            </Button>

            <Button
              onClick={() => initiateVeridict("reject")}
              data-testid="reject"
              className="cursor-pointer ml-auto max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5547 0C5.95469 0 0.554688 5.4 0.554688 12C0.554688 18.6 5.95469 24 12.5547 24C19.1547 24 24.5547 18.6 24.5547 12C24.5547 5.4 19.1547 0 12.5547 0ZM12.5547 2.66667C14.6214 2.66667 16.5547 3.4 18.1547 4.53333L5.08802 17.6C3.95469 16 3.22135 14.0667 3.22135 12C3.22135 6.86667 7.42135 2.66667 12.5547 2.66667ZM12.5547 21.3333C10.488 21.3333 8.55469 20.6 6.95469 19.4667L20.0214 6.4C21.1547 8 21.888 9.93333 21.888 12C21.888 17.1333 17.688 21.3333 12.5547 21.3333Z"
                  fill="#636363"
                />
              </svg>

              <div className="text-gray-500 text-base font-medium leading-normal">
                Reject
              </div>
            </Button>

            <Button
              onClick={() => initiateVeridict("approve")}
              data-testid="approve"
              type="submit"
              className="px-10 py-[5px] flex items-center gap-2 justify-center text-[#ffffff] bg-sterling-red-800 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <g clipPath="url(#clip0_11464_1130)">
                  <path
                    d="M2.55469 3V10L17.5547 12L2.55469 14V21L23.5547 12M22.5547 15.5L19.0547 19L17.0547 17L15.5547 18.5L19.0547 22L24.0547 17L22.5547 15.5Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11464_1130">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.554688)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className=" font-medium text-base">Approve</span>
            </Button>
          </div>
        )}

      <Confirm
        text={confirmText}
        subtext={subText}
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onConfirm={() => {
          setIsConfirmOpen(false);
          handleConfirm();
        }}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
      />
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
      {isRejection && (
        <Rejection
          isOpen={isRejection}
          setIsOpen={setRejection}
          creatorId={requestDetail?.initiatorId}
          onConfirm={() => handleRejection()}
          setReason={setReason}
          reason={reason}
          setRouteTo={setRouteTo}
        />
      )}
      {(approveLoading || rejectLoading) && (
        <Loader isOpen={approveLoading || rejectLoading} text={"Submitting"} />
      )}
    </div>
  );
}
