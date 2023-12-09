import React, { useContext, useEffect, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";
import { Failed, Success } from ".";
import Button from "../Button";
import Loader from "../Loader";
import { FormUpload } from "../forms";
import { RedDot } from "@app/components/forms";
import { useDeactivateProductMutation } from "@app/api";
import { Messages } from "@app/constants/enums";
import { AppContext } from "@app/utils";

interface ApprovedProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text?: string;
  subtext?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  detail?: any;
}

export default function RequestDeactivation({
  onCancel,
  detail,
  isOpen,
  setIsOpen,
}: ApprovedProps): React.JSX.Element {
  const { role } = useContext(AppContext);
  const [reason, setReason] = useState("");
  const [url, setUrl] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [deactivateProduct, { isSuccess, isError, error, isLoading }] =
    useDeactivateProductMutation();

  function handleDeactivate() {
    deactivateProduct({ investmentProductId: detail.id, reason, url });
  }

  useEffect(() => {
    if (isSuccess) {
      setSuccessText(
        role === "superadmin"
          ? Messages.PRODUCT_DEACTIVATE_SUCCESS
          : Messages.ADMIN_PRODUCT_DEACTIVATE_SUCCESS
      );
      setIsSuccessOpen(true);
    }
    if (isError) {
      setFailedText(Messages.PRODUCT_DEACTIVATE_FAILED);
      setFailedSubtext(error?.message?.message);
      setFailed(true);
    }
  }, [isSuccess, isError, error]);

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="bg-white rounded-[11px] w-[704px] pb-10 px-10 py-7">
        <div className="">
          <div className="flex justify-between">
            <h1 className="text-2xl text-[#747373] font-bold mb-5 uppercase">
              DEACTIVATION Request
            </h1>
            <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </span>
          </div>
          <hr className="my-4 mb-16 border-[#CCCCCC]" />
          <div className="mb-14">
            <label
              htmlFor="reason"
              className="flex gap-x-1 text-[#333333] mb-2"
            >
              Provide justification for deactivation
              <RedDot />
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              required
              className="outline-none border border-[#AAAAAA] rounded-lg px-3 py-[11px] w-full resize-none"
              placeholder="Reason"
              data-testid="reason-input"
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-[90px]">
            <label htmlFor="upload" className="block text-[#333333] mb-2">
              Upload Supporting Documents
            </label>
            <FormUpload
              data-testid="input"
              accept={["jpg", "docx", "csv", "xlsx"]}
              onUploadComplete={(value) => {
                setUrl(value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button
            onClick={() => handleDeactivate()}
            type="button"
            data-testid="submit-btn"
            className="rounded-lg text-base font-medium py-[5px] bg-sterling-red-800 border border-[#D8DAE5] disabled:opacity-60 disabled:bg-[#808080] text-white px-10"
          >
            Submit
          </Button>
        </div>
        {isSuccessOpen && (
          <Success
            text={successText}
            isOpen={isSuccess}
            setIsOpen={setIsSuccessOpen}
          />
        )}
        {isFailed && (
          <Failed
            text={failedText}
            subtext={failedSubText}
            canRetry
            isOpen={isFailed}
            setIsOpen={setFailed}
          />
        )}
        <Loader isOpen={isLoading} text="Submitting" />
      </div>
    </ModalLayout>
  );
}
