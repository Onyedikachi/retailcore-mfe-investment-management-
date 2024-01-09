import React from "react";
import Icon from "@app/components/ui/Icon";
import { DateSelect } from "@app/components/forms";

import { useOverviewContext } from "@app/utils";
import Chart from "react-apexcharts";
export default function ChartInfo() {
  const overviewState = useOverviewContext();
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    // series: [
    //   {
    //     name: 'series-1',
    //     data: [30]
    //   }
    // ]
    series: [90, 30, 50],
    labels: ["Term Deposit", "Treasury Bill", "Commercial Paper"],
  };
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
          Investment Volume
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

      <div className="mt-[15px] flex items-center justify-end">
      
        <div className="text-xs font-normal text-[#8F8F8F]">
          Sept, 2022 till date
        </div>
      </div>
      <div className="mb-[18px] mt-[25px] flex items-center justify-center">
        <div>
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            
          />
        </div>
      </div>
     
    </div>
  );
}
