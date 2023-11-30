import React from "react";
import { SideLabelSearchSelect } from "@app/components/forms";
export default function AccountingEntriesAndEvents() {
  return (
    <div>
      <div
        style={{
          boxShadow:
            "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
        }}
        className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
      >
        <div className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]">
          <span className="text-[18px] text-[#636363] font-semibold">
            Product to GL Mapping
          </span>
          <span className="font-normal text-sm text-[#AAA] italic underline">
            Clear all entries
          </span>
        </div>
        <div className="flex flex-col gap-4 px-[30px] py-5">
          <SideLabelSearchSelect />
        </div>
      </div>
    </div>
  );
}
