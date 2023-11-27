import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import DropDown from "@app/components/DropDown";
import { MultiSelect, DateSelect } from "@app/components/forms";
import moment from "moment";
import { BsFunnel } from "react-icons/bs";
import { onChange } from "../forms/DateSelect";
import BottomBarLoader from "../BottomBarLoader";
import { AppContext, InvestmentContext, handleColorState } from "@app/utils";
import { FaBars } from "react-icons/fa";
import { Prompts } from "@app/constants/enums";

interface TableProps {
  headers: any[];
  tableRows: any[];
  page: number;
  total: number;
  fetchMoreData: () => void;
  hasMore: boolean;
  ActiveFilterOptions?: any;
  DateFilterOptions?: any;
  getStateOptions?: any;
  isLoading?: boolean;
  DropDownOptions?: any;
  dropDownClick?: any;
}

// Extract Dropdown component for reusability
export const DropdownButton = ({ options, handleClick }: any) => {
  return (
    <DropDown options={options} handleClick={handleClick}>
      <FaBars className="text-sterling-red-800" />
    </DropDown>
  );
};
export const handleDropdown = (
  status: string,
  isChecker,
  DropDownOptions,
  handleStatusView,
  locked = false,
  permissions = []
): string[] => {
  if (locked)
    return DropDownOptions[handleStatusView(status)].filter(
      (i: any) => i.text.toLowerCase() === "view"
    );
  if (!status) return [];
  if (isChecker) {
    return DropDownOptions[handleStatusView(status)].filter(
      (i: any) => i.text.toLowerCase() === "view"
    );
  } else {
    let options = DropDownOptions[handleStatusView(status)];
    if (!permissions?.includes("CREATE_BRANCH")) {
      options = options.filter(
        (i: any) =>
          i.text.toLowerCase() !== "deactivate" &&
          i.text.toLowerCase() !== "activate"
      );
    }
    if (!permissions?.includes("CREATE_BRANCH")) {
      options = options.filter((i: any) => i.text.toLowerCase() !== "modify");
    }
    return options;
  }
};

export function handleStatusView(value: string) {
  switch (value) {
    case "P":
      return "inactive";
    case "D":
      return "inactive";
    case "R":
      return "inactive";
    case "A":
      return "active";
    case "I":
      return "inactive";
    default:
      return value;
  }
}

export default function TableComponent<TableProps>({
  headers,
  tableRows,
  page,
  total,
  fetchMoreData,
  hasMore,
  getStateOptions,
  DateFilterOptions,
  ActiveFilterOptions,
  isLoading,
  dropDownOptions,
  dropDownClick,
}) {
  const { role, permissions } = useContext(AppContext);
  const { isChecker } = useContext(InvestmentContext);
  const onChangeDate = (value: any) => {
    console.log("🚀 ~ file: index.tsx:34 ~ onChangeDate ~ value:", value);
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={tableRows?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={""}
      >
        <div className="w-full min-h-[500px] max-h-[700px] overflow-auto">
          <table className="w-full relative">
            <thead
              className={`${
                tableRows?.length > 0 ? "sticky" : "relative"
              } top-0 bg-white border-b border-[#C2C9D1]/30 z-[10]`}
            >
              <tr>
                {headers.map(({ label, options, hasSelect, hasDateSelect }) => (
                  <th
                    key={label}
                    className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
                  >
                    <div className="relative flex items-center gap-x-20 justify-between">
                      <span className="relative">{label}</span>

                      <span>
                        {hasSelect && (
                          <MultiSelect
                            options={options}
                            getOptions={(e: any) => getStateOptions(e, label)}
                          >
                            <span className="w-4 h-4 flex items-center justify-center">
                              <BsFunnel />
                            </span>
                          </MultiSelect>
                        )}
                        {hasDateSelect && (
                          <DateSelect onChangeDate={onChangeDate}>
                            <span className="w-4 h-4 flex items-center justify-center">
                              <BsFunnel />
                            </span>
                          </DateSelect>
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {tableRows?.length > 0 && !isLoading && (
              <tbody>
                {tableRows.map((item: any, index) => (
                  <tr
                    key={item.id + index}
                    className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
                  >
                    {headers.map((key, idx) =>
                      key !== "actions" ? (
                        <td
                          className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate"
                          key={idx}
                        >
                          <span className="relative">{item[key] || "-"}</span>
                        </td>
                      ) : (
                        <td className="px-4 py-6" key={idx}>
                          <DropdownButton
                            options={dropDownOptions}
                            handleClick={(e: any) => dropDownClick(e, item)}
                          />
                        </td>
                      )
                    )}
                    {/* <td className="text-base font-medium text-[#636363] px-4 py-5  uppercase">
                      {item.code}
                    </td>
                    <td className="text-base font-medium text-[#636363] px-4 py-5  max-w-[284px] truncate capitalize">
                      {item?.city}, {item?.state}, {item?.country}
                    </td>
                    <td className="text-base font-medium text-[#636363] px-4 py-5  max-w-[284px] truncate">
                      {item.description || "-"}
                    </td>

                    <td className="text-base font-medium text-[#636363] px-4 py-5">
                      <span
                        className={`font-medium px-2 py-[1px] rounded capitalize relative ${handleColorState(
                          item.status
                        )}`}
                      >
                        {handleStatusView(item.status)}
                      </span>
                    </td>
                    <td className="text-base font-medium text-[#636363] px-4 py-5">
                      {moment(item.updated_at).format("lll")}
                    </td>

                    <td className=" px-4 py-6">
                      <DropdownButton
                        options={dropDownOptions}
                        handleClick={(e: any) => dropDownClick(e, item)}
                      />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {isLoading && <BottomBarLoader />}
          {!tableRows?.length && !isLoading && (
            <div className="text-sm text-center p-10 opacity-80">
              No data available
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
