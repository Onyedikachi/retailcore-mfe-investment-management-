import React from "react";
import Icon from "@app/components/ui/Icon";
import { DateSelect } from "@app/components/forms";


type OverviewDivProps = {
  children: any;
  title: string;
  hasDateFilter?: boolean;
};
export default function OverviewDiv({
  children,
  title,
  hasDateFilter,
}: OverviewDivProps) {

  return (
    <div className="rounded-[5px] bg-white px-5 py-6 shadow-custom h-full">
      <div className="flex items-center justify-between border-b border-[#636363] pb-2">
        <span className="text-base font-semibold text-[#636363]">{title}</span>
        {hasDateFilter && (
          <button className="flex h-[32px] items-center gap-[8px] rounded-[6px] bg-transparent px-3 py-[4px] text-[#8F8F8F] ">
            <span className="text-sm  text-[#8F8F8F]">Filter by Date</span>

            <DateSelect
              onChangeDate={(value) => {
                console.log(value);
              }}
            >
              <span className="text-[#636363]">
                {" "}
                <Icon icon="ep:filter" />
              </span>
            </DateSelect>
          </button>
        )}
      </div>

      <div className=" flex items-center justify-end">
        {hasDateFilter && (
          <div className="mt-[15px] text-xs font-normal text-[#8F8F8F]">
            Sept, 2022 till date
          </div>
        )}
      </div>
      <div className="mb-[18px] mt-[25px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
