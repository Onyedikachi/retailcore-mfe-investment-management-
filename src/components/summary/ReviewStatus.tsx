import React from "react";
import { FaClock } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";

interface LastRequestReviewStatusProps {
  status: string;
  reason: string;
  type: string;
  text: string;
}
export default function ReviewStatus({
  status,
  reason,
  type,
  text,
}: LastRequestReviewStatusProps) {
  return (
    <div className="bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-[60px] pt-[40px] pb-[40px]">
      <div className="">
        <p className="text-[#636363] text-lg font-semibold">
          Last request review status:
        </p>

        <div className="px-6 py-10">
          <div className="flex gap-x-6 mb-10">
            <div className="">
              {status === "a" && (
                <IoCheckmarkCircleSharp className="text-[26px]  mb-6 text-[#2FB755]" />
              )}
              {status === "r" && (
                <RiErrorWarningFill className="text-[26px] text-sterling-red-800" />
              )}
              {status === "p" && (
                <FaClock className="text-[26px] text-[#636363]" />
              )}
            </div>
            <span className="text-base text-[#636363">{text}</span>
          </div>
          {status === "r" && (
            <div className="flex gap-x-5">
              <span className="text-[#636363] text-base font-semibold w-[198px]">
                Reason for rejection
              </span>
              {reason && (
                <span className="text-[#636363] text-base">{reason}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
