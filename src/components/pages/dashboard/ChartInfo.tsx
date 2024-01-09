import React from "react";
import Icon from "../../ui/Icon";
import { DateSelect } from "@app/components/forms";

import { useOverviewContext } from "@app/utils";
import { OverviewChart } from "@app/components/Charts";
export default function ChartInfo() {
  const overviewState = useOverviewContext();
  const amountValues = [
    {
      name: "Term Deposit",
      amount: "20,000.00",
    },
    {
      name: "Treasury Bill",
      amount: "20,000.00",
    },
    {
      name: "Commercial Paper",
      amount: "20,000.00",
    },
  ];

  return (
    <div className="rounded-[5px] bg-white px-5 py-6 shadow-custom">
      <div className="flex items-center justify-between border-b border-[#636363] pb-2">
        <span className="text-base font-semibold text-[#636363]">
          {overviewState.name} Portfolio
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
        <OverviewChart />
      </div>
      <div className="flex items-center justify-between ">
        {amountValues?.map((investment) => (
          <div key={investment.name} className="flex items-center gap-[6px]">
            <div
              className={`h-[9px] w-[9px] rounded-full ${
                investment.name.toLowerCase() == "term deposit" &&
                "bg-[#F8961E]"
              }${
                investment.name.toLowerCase() == "treasury bill" &&
                "bg-[#F94144]"
              }${
                investment.name.toLowerCase() == "commercial paper" &&
                "bg-[#837777]"
              }`}
            ></div>
            <div className="flex flex-col gap-[6px] text-xs font-normal text-[#000000]">
              <span className="">{investment.name}</span>
              <div className="flex items-center gap-[9px]">
                <span className="">NGN</span>
                <span className="">{investment.amount}</span>

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
