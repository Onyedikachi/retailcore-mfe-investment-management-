import React from "react";
import Icon from "@app/components/ui/Icon";
import { DateSelect } from "@app/components/forms";

import { useOverviewContext } from "@app/utils";
import { DonutChart } from "@app/components/Charts";
export default function ChartInfo({labels, title}) {
  const overviewState = useOverviewContext();

  return (
    <div className="rounded-[5px] bg-white px-5 py-6 shadow-custom h-full">
      <div className="flex items-center justify-between border-b border-[#ccc] pb-1">
        <span className="text-base font-semibold text-[#636363]">
          {overviewState.name} {title}
        </span>

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
      </div>

      <div className="mt-[15px] flex items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <span className="text-xs font-normal text-[#4F4F4F]">NGN</span>
          <span className="text-[20px] font-medium text-[#636363]">
            100,000,000.00
          </span>
        </div>
        <div className="text-xs font-normal text-[#8F8F8F]">
          Sept, 2022 till date
        </div>
      </div>
      <div className="mb-[18px] mt-[25px] flex items-center justify-center">
        <DonutChart labels={labels} />
      </div>
      <div className="flex items-center justify-between ">
        {labels?.map((item) => (
          <div key={item.text} className="flex items-center gap-x-[6px]">
            <div className={`h-[9px] w-[9px] rounded-full`} style={{backgroundColor: item.color}}></div>
            <div className="flex flex-col gap-y-[6px] text-xs font-normal text-[#000000]">
              <span className="">{item.text}</span>
              <div className="flex items-center gap-[9px]">
                <span className="">NGN</span>
                <span className="">{item.amount}</span>

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
  );
}
