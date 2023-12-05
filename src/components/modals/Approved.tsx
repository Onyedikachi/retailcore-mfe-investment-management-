import React from "react";
import { IoArrowUndo } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";

interface ApprovedProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  subtext?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

export default function Approved({
  text,
  subtext,
  onCancel,
  onConfirm,
  isOpen,
  setIsOpen,
}: ApprovedProps): React.JSX.Element {
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-[555px] p-6 rounded-lg bg-white text-left shadow-[0px_20px_24px_0px_rgba(16,24,40,0.08),_0px_8px_8px_0px_rgba(16,24,40,0.03)]">
        <div className="flex justify-between items-start mb-[98px]">
          <div className="flex-1 items-center flex justify-center">
            <svg
              width="81"
              height="80"
              viewBox="0 0 81 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M66.8984 39.5C66.8984 53.5833 55.2578 65 40.8984 65C26.539 65 14.8984 53.5833 14.8984 39.5C14.8984 25.4167 26.539 14 40.8984 14C55.2578 14 66.8984 25.4167 66.8984 39.5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M40.8984 0C18.8075 0 0.898438 17.9091 0.898438 40C0.898438 62.0909 18.8075 80 40.8984 80C62.9893 80 80.8984 62.0909 80.8984 40C80.8984 17.9091 62.9893 0 40.8984 0ZM58.2366 33.2364C58.5559 32.8714 58.7989 32.4463 58.9515 31.9861C59.104 31.5258 59.163 31.0397 59.1249 30.5563C59.0868 30.0729 58.9524 29.6021 58.7296 29.1714C58.5069 28.7407 58.2002 28.3589 57.8277 28.0485C57.4552 27.7381 57.0244 27.5053 56.5606 27.3639C56.0968 27.2224 55.6094 27.1751 55.1271 27.2248C54.6448 27.2745 54.1773 27.4202 53.7521 27.6532C53.3269 27.8863 52.9526 28.202 52.6512 28.5818L37.0148 47.3418L28.9239 39.2473C28.2381 38.5849 27.3195 38.2184 26.3661 38.2266C25.4126 38.2349 24.5006 38.6174 23.8264 39.2916C23.1522 39.9658 22.7697 40.8778 22.7614 41.8313C22.7532 42.7847 23.1197 43.7033 23.7821 44.3891L34.6912 55.2982C35.0485 55.6553 35.4762 55.934 35.9472 56.1166C36.4182 56.2992 36.9221 56.3817 37.4267 56.3587C37.9313 56.3358 38.4256 56.208 38.8781 55.9834C39.3306 55.7589 39.7313 55.4425 40.0548 55.0545L58.2366 33.2364Z"
                fill="#2FB755"
              />
            </svg>
          </div>{" "}
          <button
            data-testid="cancel-btn"
            onClick={() => setIsOpen(false)}
            className="p-2 outline-none bg-transparent absolute right-6"
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        </div>
        <p className="mb-[20px] font-medium text-lg text-center">{text}</p>
        {subtext && (
          <p className="mb-[20px] font-normal text-base">{subtext}</p>
        )}
        <button
          onClick={() => onConfirm()}
          data-testid="submit-btn"
          className="cursor-pointer mt-[98px] flex items-center justify-center gap-[10px] "
        >
          <IoArrowUndo className="text-[#CF2A2A] w-[28px] h-[24px]" />
          Return to dashboard
        </button>
      </div>
    </ModalLayout>
  );
}
