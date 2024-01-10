import React from "react";
import Icon from "@app/components/ui/Icon";
import { DateSelect } from "@app/components/forms";

import { useOverviewContext } from "@app/utils";
import Chart from "react-apexcharts";
export default function ChartInfo() {
  const overviewState = useOverviewContext();
  function formatYAxis(value) {
    if (value === 0) {
      return '0';
    }
  
    const suffixes = ['', 'k', 'm', 'b'];
  
    const suffixIndex = Math.floor(Math.log10(Math.abs(value)) / 3);
    const scaledValue = value / Math.pow(10, suffixIndex * 3);
  
    const formattedValue =
      suffixIndex < suffixes.length
        ? scaledValue.toFixed(2).replace(/((\.\d*?[1-9])0*|(\.0*))$/, '$2') + suffixes[suffixIndex]
        : value;
  
    return formattedValue;
  }
  
  const labels = [
    { text: "Term Deposit", color: "#F8961E", amount: "20,000.00" },
    { text: "Treasury Bill", color: "#F94144", amount: "20,000.00" },
    { text: "Commercial Paper", color: "#837777", amount: "20,000.00" },
  ];
  const state = {
    options: {
      chart: {
        id: "basic-bar",
        height: 350,
        toolbar: {
          show: false,
        },

        stroke: {
          width: 3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 5,
      },
      colors: labels?.map((i) => i.color),
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return formatYAxis(value);
          },
        },
      },
      legend: {
        show: false,
      },
    },

    series: [
      {
        name: "Term Deposit",
        data: [100, 41000, 350000, 510000, 490000, 620000, 6900, 910000, 1480000],
      },
      {
        name: "Treasury Bill",
        data: [1500, 390000, 450000, 210000, 5900, 63000, 190000, 91000, 180000],
      },
      {
        name: "Commercial Paper",
        data: [100000, 4100, 350000, 210000, 490000, 620000, 790000, 910000, 1680000],
      },
    ],
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
        <div className="w-full">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="100%"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
