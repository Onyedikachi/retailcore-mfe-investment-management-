import React from "react";
import Icon from "@app/components/ui/Icon";
import { DateSelect } from "@app/components/forms";

import { DonutChart } from "@app/components/Charts";
export default function ChartInfo({ labels, title }) {
  return (
    <div className="rounded-[5px] bg-white px-5 py-5 2xl:py-6 shadow-custom h-full">
      <div className="flex items-center justify-between border-b border-[#ccc] pb-1">
        <span className="text-base font-semibold text-[#636363] whitespace-nowrap">
          All Investments {title}
        </span>

        <div className="flex h-[32px] items-center gap-[8px] rounded-[6px] bg-transparent px-3 py-[4px] text-[#8F8F8F] ">
          <span className="text-sm  text-[#8F8F8F] whitespace-nowrap">
            Filter by Date
          </span>

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
        </div>
      </div>

      <div className="mt-[15px] flex items-center justify-between gap-x-6 mb-[25px]">
        <div className="flex items-center gap-[9px]">
          <span className="text-[20px] font-medium text-[#636363]">
            NGN 100,000,000
          </span>
        </div>
        <div className="text-xs font-normal text-[#8F8F8F] whitespace-nowrap">
          Sept, 2022 till date
        </div>
      </div>
      <div className="flex flex-row 2xl:flex-col mb-[18px] gap-4">
        <div className="flex items-center justify-center flex-1">
          <DonutChart labels={labels} />
        </div>
        <div className="flex 2xl:items-center justify-start 2xl:justify-between gap-y-8 2xl:gap-y-0 flex-col 2xl:flex-row">
          {labels?.map((item) => (
            <div key={item.text} className="flex items-center gap-x-[6px]">
              <div
                className={`h-[9px] w-[9px] rounded-full`}
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex flex-col gap-y-[6px] text-xs font-normal text-[#4F4F4F]">
                <span className="text-[#636363]">{item.text}</span>
                <div className="flex items-center gap-[9px]">
                  <span className="">NGN {item.amount}</span>

                  {/* <span>
                  {investment.name.toLowerCase() == 'commercial paper' &&
                    'true'}
                </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
