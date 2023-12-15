import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";
import Button from "../Button";

interface ConfirmProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  subtext?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

export default function Confirm({
  text,
  subtext,
  onCancel,
  onConfirm,
  isOpen,
  setIsOpen,
}: ConfirmProps): React.JSX.Element {
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        data-testid="confirm-modal"
        className="w-[400px] p-6 rounded-lg bg-white text-left shadow-[0px_20px_24px_0px_rgba(16,24,40,0.08),_0px_8px_8px_0px_rgba(16,24,40,0.03)]"
      >
        <div className="flex justify-between items-center mb-[15px]">
          <RiErrorWarningFill className="text-[30px] text-sterling-red-800" />
          <button
            onClick={() => setIsOpen(false)}
            data-testid="cancel-btn"
            className="p-2 outline-none bg-transparent"
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        </div>
        <p className="mb-[20px] font-medium text-lg">{text}</p>
        {subtext && (
          <p className="mb-[20px] font-normal text-base">{subtext}</p>
        )}
        <div className="flex justify-between items-center gap-x-[6px] mt-[10px]">
          <Button
            type="button"
            data-testid="cancel-btn-2"
            onClick={() => {
              onCancel();
            }}
            className="rounded-lg text-base font-medium py-[5px] h-[44px] bg-white border border-[#D8DAE5] text-[#667085] w-full px-10"
          >
            Cancel
          </Button>{" "}
          <Button
            type="button"
            data-testid="submit-btn"
            onClick={() => {
              onConfirm();
            }}
            className="rounded-lg text-base font-medium py-[5px] h-[44px] bg-sterling-red-800 border border-sterling-red-800 text-white w-full px-10"
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
