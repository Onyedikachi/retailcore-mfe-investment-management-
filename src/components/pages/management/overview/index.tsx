import React, { useState } from "react";
import {
  OverviewDonutChartInfo,
  InvestmentVolume,
} from "@app/components/Charts";
import { OverviewContext, defaultOverviewContext } from "@app/utils";
import { OverviewDiv, QuickLinks } from "@app/components";
import { InvestmentsRanking } from "@app/components/management";

import { WithdrawSvg, UserSvg, InvestmentSvg } from "@app/assets/images";

// import { createOverviewState } from '../../../utils'
export default function Overview() {
  const [overviewState, setOverviewState] = useState(defaultOverviewContext);
  const tabs = [
    {
      title: "All Investments",
      amount: "NGN 900,000,000.00",
      description: "1004 total investments",
      icon: <InvestmentSvg />,
    },
    {
      title: "Active Investments",
      amount: "NGN 1, 900,000,000.00",
      description: "2994 active investments",
      icon: <UserSvg />,
    },
    {
      title: "Liquidated Investments",
      amount: "NGN 40,000,000.00",
      description: "104 liquidated investments",
      icon: <WithdrawSvg />,
    },
  ];
  const portFolioLabels = [
    { text: "Term Deposit", color: "#F8961E", amount: "20,000.00", data: 20 },
    { text: "Treasury Bill", color: "#F94144", amount: "20,000.00", data: 50 },
    {
      text: "Commercial Paper",
      color: "#837777",
      amount: "20,000.00",
      data: 35,
    },
  ];
  const allocationLabels = [
    { text: "Individual", color: "#F8961E", amount: "20,000.00", data: 20 },
    { text: "Coorporate", color: "#837777", amount: "20,000.00", data: 60 },
  ];

  const dataChange = (tab) => {
    console.log(tab);
    setOverviewState({ name: tab.title });
    // state?.setData('name', tab.title)
  };
  return (
    <OverviewContext.Provider value={overviewState}>
      <div className="flex gap-x-5 w-full flex-1">
        <div className="flex flex-col gap-[25px] flex-1">
          <div className="flex  gap-[25px]">
            <div className="grid w-full max-w-[350px]  gap-5">
              {tabs.map((tab) => (
                <div
                  onClick={() => {
                    dataChange(tab);
                  }}
                  key={tab.title}
                  className="flex gap-3 rounded-[5px] bg-[#FFFFFF] px-6 py-8 shadow-custom"
                >
                  <div className="flex items-center">
                    <div className="h-[45px] w-[45px] rounded-full bg-[#D4F7DC] flex items-center justify-center">
                      {tab.icon}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <span className="mb-[7px] text-sm text-[#636363]">
                      {tab.title}
                    </span>
                    <span className="text-[20px] font-semibold text-[#636363]">
                      {tab.amount}
                    </span>
                    <span className="text-xs text-[#63636380]">
                      {tab.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <OverviewDonutChartInfo
                labels={portFolioLabels}
                title="Portfolio"
              />
            </div>
            <div className="flex-1">
              <OverviewDonutChartInfo
                labels={allocationLabels}
                title="Allocation"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[28px]">
            <div className="">
              <InvestmentVolume />
            </div>
            <div className="">
              <OverviewDiv title={"Investments Ranking"}>
                <InvestmentsRanking />
              </OverviewDiv>
            </div>
          </div>
        </div>
        <QuickLinks />
      </div>
    </OverviewContext.Provider>
  );
}
