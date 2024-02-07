import React, { useState, useMemo, useEffect } from "react";
import {
  OverviewDonutChartInfo,
  InvestmentVolume,
} from "@app/components/Charts";
import { OverviewContext } from "@app/utils";
import { OverviewDiv, QuickLinks } from "@app/components";
import { InvestmentsRanking } from "@app/components/management";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInvestmentDashboardStatsQuery } from "@app/api";
import { WithdrawSvg, UserSvg, InvestmentSvg } from "@app/assets/images";
import { currencyFormatter } from "@app/utils/formatCurrency"


export const updateInvestmentTabs = (data, tabs) => {
  return tabs.map((tab) => {
    let key;
    if (tab.title === "All Investments") {
      key = "All";
    } else if (tab.title === "Active Investments") {
      key = "A";
    } else if (tab.title === "Liquidated Investments") {
      key = "L";
    }

    const tabData = data[key] || { count: 0, totalValue: 0 };

    return {
      ...tab,
      amount: ` ${tabData.totalValue}`,
      totalValue: `${tabData.count} total investments`,
    };
  });
};

// import { createOverviewState } from '../../../utils'
export default function Overview() {
  const [overviewTabStats, setOverviewTabStats] = useState(null);
  const navigate = useNavigate();
  const {
    data: dashboardStats,
    refetch: getStats,
    isLoading: isLoadingDashboardStats,
    isSuccess: isDashboardStatsSuccess,
  } = useGetInvestmentDashboardStatsQuery();
  const [tabs, setTabs] = useState([
    {
      title: "All Investments",
      amount: 0.00,
      totalValue: "",
      icon: <InvestmentSvg />,
    },
    {
      title: "Active Investments",
      amount: 0.00,
      totalValue: "",
      icon: <UserSvg />,
    },
    {
      title: "Liquidated Investments",
      amount: 0.00,
      totalValue: "",
      icon: <WithdrawSvg />,
    },
  ]);
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
    navigate(`/investment-management/products/${tab.title}`);

    // setOverviewState({ name: tab.title });
    // state?.setData('name', tab.title)
  };



  useEffect(() => {
    if (dashboardStats) {
 
      setOverviewTabStats(dashboardStats.data);
    }
  }, [dashboardStats, isDashboardStatsSuccess]);

  useEffect(() => {
    if (overviewTabStats) {
      setTabs(updateInvestmentTabs(overviewTabStats, tabs));
    }
  }, [overviewTabStats]);


  const value = useMemo(
    () => ({
      overviewTabStats,
      setOverviewTabStats,
      getStats,
    }),
    [overviewTabStats, setOverviewTabStats, getStats]
  );
  return (
    <OverviewContext.Provider value={value}>
      <div className="flex gap-x-5 w-full flex-1">
        <div className="flex flex-col gap-[25px] flex-1 overflow-x-auto no-scrollbar">
          <div className="flex  gap-[25px]">
            <div className="grid w-full max-w-[350px]  gap-5">
              {tabs.map((tab) => (
                <div

                  onClick={() => {
                    dataChange(tab);
                  }}
                  key={tab.title}
                  className={`${isLoadingDashboardStats ? 'animate-pulse opacity-50' : ''}  cursor-pointer flex gap-3 rounded-[5px] bg-[#FFFFFF] px-6 py-8 shadow-custom`}
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
                      {currencyFormatter(tab.amount, 'NGN')}
                    </span>
                    <span className="text-xs text-[#63636380]">
                      {tab.totalValue}
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
