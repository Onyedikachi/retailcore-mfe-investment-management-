import Icon from "@app/components/ui/Icon";
import { useState } from "react";
import { Corporate, Overview, Individual } from "@app/components/pages";

export default function Dashboard() {
  //   useEffect(() => {
  //     loadSimulator()
  //   }, [])
  //create array of tabs
  const dashboardTabs = ["All", "Individual", "Corporate"];
  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0]);

  const tabSelector = (tab) => {
    setSelectedTab(tab);
  };

  const headers = ["Investment Ranking", "Number of Customers", "Value (NGN)"];

  const people = [
    {
      product: "Sterling Premium Term IV",
      numberOfCustomers: 24,
      amount: "N10,000,000",
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="bg-white ">
        <div className="flex gap-[32px] ">
          {dashboardTabs.map((tab) => (
            <div
              onClick={() => tabSelector(tab)}
              key={tab}
              className={`${
                selectedTab == tab
                  ? "text-[14px] font-medium text-[#636363]"
                  : "text-[14px] font-normal text-[ #8F8F8F]"
              } flex cursor-pointer flex-col justify-between gap-[6px]`}
            >
              <div></div>
              <span>{tab}</span>
              <div
                className={`${
                  selectedTab == tab
                    ? "h-[3px] w-full rounded-lg bg-sterling-red-800 shadow-lg"
                    : "h-[0px] w-full rounded-lg bg-[#DDE2E4]"
                } `}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className=" pb-[30px] overflow-y-auto">
        <div className="">
          <div className="mt-[12px] flow-root">
            <div className=" -my-2 overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle ">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      {headers.map((header) => (
                        <th
                          scope="col"
                          className="py-3.5 pl-0 pr-3 text-left text-sm font-medium text-[#636363] sm:pl-0"
                        >
                          {header}
                        </th>
                      ))}
                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {people.map((ranking, index) => (
                      <tr
                        className="text-xs font-medium text-[#636363]"
                        key={index}
                      >
                        <td className="whitespace-nowrap py-4 pl-0 pr-3  sm:pl-0">
                          {ranking.product}
                        </td>
                        <td className="whitespace-nowrap pr-3 py-4 ">
                          {ranking.numberOfCustomers}
                        </td>
                        <td className="whitespace-nowrap pr-3 py-4 ">
                          {ranking.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
