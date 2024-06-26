import React from "react";
import { IoArrowUndo } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";
import Button from "@app/components/Button";

interface SelectRequirementsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  header: string;
  subtext?: string;
  onCancel?: () => void;
  onConfirm: () => void;
  children?: any;
  actionFn: () => void;
  disabled?: boolean;
  hideBtn?: boolean
}

export default function SelectRequirements({
  header,
  subtext,
  onCancel,
  onConfirm,
  isOpen,
  setIsOpen,
  children,
  actionFn,
  disabled,
  hideBtn
}: SelectRequirementsProps): React.JSX.Element {
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div data-testid="select-requirement-modal" className="w-[527px] p-6 rounded-lg bg-white text-left shadow-[0px_20px_24px_0px_rgba(16,24,40,0.08),_0px_8px_8px_0px_rgba(16,24,40,0.03)]">
        <div className="flex justify-between items-start mb-[12px]">
          <div className="flex-1 items-center flex  border-b uppercase pb-3">
            <span className="text-[#747373] font-bold text-[24px]">
              {header}
            </span>{" "}
          </div>{" "}
          <button
            type="button"
            data-testid="cancel-btn"
            onClick={() => setIsOpen(false)}
            className="p-2 outline-none bg-transparent absolute right-6"
          >
            <FaTimes className="text-[#525252;] opacity-60 hover:opacity-50" />
          </button>
        </div>
        {subtext && (
          <p className="mb-[20px] font-normal text-base">{subtext}</p>
        )}
        {children}
       {!hideBtn && <div className="flex items-center justify-center">
          <Button
            type="button"
            data-testid="submit-btn"
            onClick={actionFn}
            disabled={disabled}
            className="rounded-lg text-base font-medium py-[5px] h-[44px] bg-sterling-red-800 border border-sterling-red-800 text-white w-[126px] px-10 disabled:border-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-[#636363]"
          >
            Select
          </Button>
        </div>
}
      </div>
    </ModalLayout>
  );
}
