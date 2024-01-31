import React, { useContext, useEffect, useState } from "react";
import { Button, Loader } from "@app/components";
import SubmitSvg from "@app/assets/images/SubmitSvg";
import ModifySvg from "@app/assets/images/ModifySvg";
import CancelSvg from "@app/assets/images/CancelSvg";
import { IoArrowUndo } from "react-icons/io5";
import ShareButton from "../ShareButton";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Confirm, Failed, Prompt, Success } from "../modals";
import { AppContext } from "@app/utils";
import {
  useApproveProductMutation,
  useRejectProductMutation,
  useApproveInvestmentMutation,
  useRejectInvestmentMutation,
} from "@app/api";
import { Messages } from "@app/constants/enums";
import Rejection from "../modals/Rejection";
import handleVerdict from "./handleVerdict";

export const handlePrint = () => {
  window.print();
};

const createProcesses = [
  "create",
  "modify",
  "continue",
  "withdraw_modify",
  "clone",
];
const validPermissions = [
  "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
  "AUTHORIZE_INVESTMENT_MANAGEMENT_REQUESTS",
];
export const handleConfirm = ({
  action,
  id,
  type,
  approveInvestment,
  approveProduct,
  setRejection,
  navigate,
  filter,
}) => {
  if (action === "approve") {
    if (type?.toLowerCase() === "individual") {
      approveInvestment({ id });
    } else {
      approveProduct({ id });
    }
  }
  if (action === "reject") {
    setRejection(true);
  }
  if (action === "cancel") {
    if (type?.toLowerCase() === "individual") {
      navigate(`/investment-management/individual`);
    } else {
      navigate(
        `/product-factory/investment?category=requests${
          filter ? "&filter=" + filter : ""
        }`
      );
    }
  }
};

export function handlePermissionType(type: string, process_type?: string) {
  if (type === "individual") {
    return process_type === "booking"
      ? "BOOK_INVESTMENT"
      : "LIQUIDATE_INVESTMENT";
  }
  if (type === "investment") {
    return "CREATE_INVESTMENT_PRODUCT";
  }
}

export const handleMessages = ({
  rejectSuccess,
  approveSuccess,
  rejectIsError,
  approveIsError,
  setSuccessText,
  setIsSuccessOpen,
  setFailedText,
  setFailedSubtext,
  setFailed,
  approveError,
  rejectError,
  investmentApproveSuccess,
  investmentApproveIsError,
  investmentApproveError,
  investmentRejectSuccess,
  investmentRejectIsError,
  investmentRejectError,
}) => {
  if (rejectSuccess) {
    setSuccessText(Messages.PRODUCT_CREATE_REJECTED);
    setIsSuccessOpen(true);
  }
  if (investmentRejectSuccess) {
    setSuccessText(Messages.BOOKING_CREATE_REJECTED);
    setIsSuccessOpen(true);
  }
  if (approveSuccess) {
    setSuccessText(Messages.PRODUCT_CREATE_APPROVED);
    setIsSuccessOpen(true);
  }
  if (investmentApproveSuccess) {
    setSuccessText(Messages.BOOKING_CREATE_APPROVED);
    setIsSuccessOpen(true);
  }
  if (rejectIsError) {
    setFailedText(Messages.PRODUCT_REJECT_FAILED);
    setFailedSubtext(
      rejectError?.message?.message || rejectError?.message?.Message
    );
    setFailed(true);
  }

  if (approveIsError) {
    setFailedText(Messages.PRODUCT_APPROVE_FAILED);
    setFailedSubtext(
      approveError?.message?.message || approveError?.message?.Message
    );
    setFailed(true);
  }
  if (investmentApproveIsError) {
    setFailedText(Messages.BOOKING_APPROVE_FAILED);
    setFailedSubtext(
      investmentApproveError?.message?.message ||
        investmentApproveError?.message?.Message
    );
    setFailed(true);
  }
  if (investmentRejectIsError) {
    setFailedText(Messages.BOOKING_REJECT_FAILED);
    setFailedSubtext(
      investmentRejectError?.message?.message ||
        investmentRejectError?.message?.Message
    );
    setFailed(true);
  }
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
  const location = useLocation();
  const sub_type = searchParams.get("sub_type");
  const process_type = searchParams.get("process_type");
  const filter = searchParams.get("filter");
  const { id, process, type } = useParams() || {};
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
    approveInvestment,
    {
      isSuccess: investmentApproveSuccess,
      isError: investmentApproveIsError,
      error: investmentApproveError,
      isLoading: investmentApproveLoading,
    },
  ] = useApproveInvestmentMutation();

  const [
    rejectProduct,
    {
      isSuccess: rejectSuccess,
      isError: rejectIsError,
      error: rejectError,
      isLoading: rejectLoading,
    },
  ] = useRejectProductMutation();

  const [
    rejectInvestment,
    {
      isSuccess: investmentRejectSuccess,
      isError: investmentRejectIsError,
      error: investmentRejectError,
      isLoading: investmentRejectLoading,
    },
  ] = useRejectInvestmentMutation();

  const initiateVerdict = (value) => {
    handleVerdict({
      value,
      type,
      sub_type,
      process,
      setConfirmText,
      setAction,
      setIsConfirmOpen,
    });
  };

  const handleRejection = () => {
    setRejection(false);
    if (type.toLowerCase() === "individual") {
      rejectInvestment({ reason, id, routeTo });
    } else {
      rejectProduct({ reason, id, routeTo });
    }
  };
  useEffect(() => {
    handleMessages({
      rejectSuccess,
      approveSuccess,
      rejectIsError,
      approveIsError,
      setSuccessText,
      setIsSuccessOpen,
      setFailedText,
      setFailedSubtext,
      setFailed,
      approveError,
      rejectError,
      investmentApproveSuccess,
      investmentApproveIsError,
      investmentApproveError,
      investmentRejectSuccess,
      investmentRejectIsError,
      investmentRejectError,
    });
  }, [
    rejectSuccess,
    rejectIsError,
    rejectError,
    approveSuccess,
    approveIsError,
    investmentApproveSuccess,
    investmentApproveIsError,
    investmentRejectSuccess,
    investmentRejectIsError,
  ]);
  const factoryDashboard = `/product-factory/investment?category=requests${
    filter ? "&filter=" + filter : ""
  }`;
  const individualDashboard = `/investment-management/individual?category=requests${
    filter ? "&filter=" + filter : ""
  }`;

  const handleNavigation = () => {
    if (location.pathname.includes("management")) return individualDashboard;
    if (!location.pathname.includes("management")) return factoryDashboard;
  };
  return (
    <div
      data-testid="actions-div"
      className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-[60px] py-[40px]  "
    >
      {/* Preview  */}
      {((process !== "verdict" && !createProcesses.includes(process)) ||
        (process == "verdict" &&
          !permissions.some((permission) =>
            validPermissions.includes(permission)
          ))) && (
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

          <Link to={handleNavigation()}>
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
        </div>
      )}
      {/* Submission/creation  */}
      {createProcesses.includes(process) && (
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

      {/* Approval/ Rejection  */}
      {process === "verdict" &&
        permissions.some((permission) =>
          validPermissions.includes(permission)
        ) && (
          <div className="flex  gap-6">
            <Button
              onClick={() => initiateVerdict("cancel")}
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
              onClick={() => initiateVerdict("reject")}
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
              onClick={() => initiateVerdict("approve")}
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
          handleConfirm({
            action,
            id,
            type,
            approveInvestment,
            approveProduct,
            setRejection,
            navigate,
            filter,
          });
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
          permissionType={handlePermissionType(type, process_type)}
        />
      )}
      {(approveLoading ||
        rejectLoading ||
        investmentApproveLoading ||
        investmentRejectLoading) && (
        <Loader
          isOpen={
            approveLoading ||
            rejectLoading ||
            investmentApproveLoading ||
            investmentRejectLoading
          }
          text={"Submitting"}
        />
      )}
    </div>
  );
}
