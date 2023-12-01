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
}

export default function SelectRequirements({
  header,
  subtext,
  onCancel,
  onConfirm,
  isOpen,
  setIsOpen,
  children,
}: SelectRequirementsProps): React.JSX.Element {
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-[555px] p-6 rounded-lg bg-white text-left shadow-[0px_20px_24px_0px_rgba(16,24,40,0.08),_0px_8px_8px_0px_rgba(16,24,40,0.03)]">
        <div className="flex justify-between items-start mb-[10px]">
          <div className="flex-1 items-center flex pb-5 border-b uppercase">
            <span className="text-[#747373] font-bold text-[24px]"></span>{" "}
            {header}
          </div>{" "}
          <button
            data-testid="cancel-btn"
            onClick={() => setIsOpen(false)}
            className="p-2 outline-none bg-transparent absolute right-6"
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        </div>
        {subtext && (
          <p className="mb-[20px] font-normal text-base">{subtext}</p>
        )}
        {children}
        <div className="flex items-center justify-center">
          <Button
            type="button"
            data-testid="submit-btn"
            onClick={() => {
              onConfirm();
            }}
            className="rounded-lg text-base font-medium py-[5px] h-[44px] bg-sterling-red-800 border border-sterling-red-800 text-white w-[126px] px-10"
          >
            Select
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
