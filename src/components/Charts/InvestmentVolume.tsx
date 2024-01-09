import React from "react";
import Icon from "@app/components/ui/Icon";
import { DateSelect } from "@app/components/forms";

import { useOverviewContext } from "@app/utils";
import Chart from "react-apexcharts";
export default function ChartInfo() {
  const overviewState = useOverviewContext();
  const series = [
    {
      name: "Term Deposit",
      data: [19, 22, 20, 26],
    },
    //additional data in this array..
    {
      name: "Treasury Bill",
      data: [103, 105, 98, 83],
    },
    {
      name: "Commercial Paper",
      data: [12, 145, 44, 83],
    },
  ];
  const options = {
    xaxis: {
      categories: ["2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04"]
    }
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
      <div className="mb-[18px] mt-[25px] flex items-center justify-center w-full ">
        <div className=" w-full h-[300px]">
          <Chart options={options} series={series} type="line" width="100%" height='100%' toolbar={{  toolbar: {
        show: false,}}}/>
        </div>
      </div>
    </div>
  );
}
