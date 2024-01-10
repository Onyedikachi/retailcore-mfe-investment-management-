import React, { useContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import DropDown from "@app/components/DropDown";
import { MultiSelect, DateSelect } from "@app/components/forms";
import moment from "moment";
import { BsFunnel } from "react-icons/bs";
import BottomBarLoader from "../BottomBarLoader";
// import Tooltip from "@app/components/ui/Tooltip";
import {
  AppContext,
  InvestmentContext,
  handleColorState,
  handleDropdown,
  handleUserView,
} from "@app/utils";
import { FaBars, FaEye } from "react-icons/fa";
import { Actions, Messages, Prompts } from "@app/constants/enums";
import { Confirm, Failed, Success } from "../modals";
import Loader from "../Loader";
import RequestDeactivation from "../modals/RequestDeactivation";
import ProductDetail from "../modals/ProductDetail";
import { StatusCategoryType } from "@app/types";
import { useNavigate } from "react-router-dom";
import {
  useActivateProductMutation,
  useDeleteProductRequestMutation,
} from "@app/api";
import Button from "../Button";
import { ActiveFilterOptions } from "@app/constants";
import MessagesComponent from "./MessagesComponent";
import { actionHandler } from "./actionHandler";
import { confirmationHandler } from "./confirmationHandler";

interface TableProps {
  headers: any[];
  tableRows: any[];
  page: number;
  total: number;
  fetchMoreData: () => void;
  hasMore: boolean;
  ActiveFilterOptions?: any;
  DateFilterOptions?: any;
  getOptionData?: any;
  isLoading?: boolean;
  DropDownOptions?: any;
  dropDownClick?: any;
  onChangeDate?: any;
  type?: string;
  noData?: string;
}

export const statusHandler = ({
  isSuccess,
  setSuccessText,
  setIsSuccessOpen,
  activateSuccess,
  isError,
  setFailedText,
  setFailed,
  activateIsError,
  activateError,
  setFailedSubtext,
  error,
  role,
}) => {
  if (isSuccess) {
    setSuccessText(Messages.PRODUCT_DELETE_SUCCESS);
    setIsSuccessOpen(true);
  }
  if (activateSuccess) {
    setSuccessText(
      role === "superadmin"
        ? Messages.PRODUCT_ACTIVATE_SUCCESS
        : Messages.ADMIN_PRODUCT_ACTIVATE_SUCCESS
    );
    setIsSuccessOpen(true);
  }
  if (isError) {
    setFailedText(Messages.PRODUCT_DELETE_FAILED);
    setFailedSubtext(error?.message?.message || error?.message?.Message);
    setFailed(true);
  }

  if (activateIsError) {
    setFailedText(Messages.PRODUCT_ACTIVATE_FAILED);
    setFailedSubtext(
      activateError?.message?.message || activateError?.message?.Message
    );
    setFailed(true);
  }
};

export function handleUpdated(key, value, options) {
  if (!options || !value) return;

  const parseOptions = JSON.parse(options);
  if (!parseOptions[key]) return;

  if (key === "state") {
    // const newState = ActiveFilterOptions.find(
    //   (n) => parseOptions[key] === n.value
    // )?.name;

    if (parseOptions[key] === value) return null;
  }
  return value !== parseOptions[key]
    ? `Updated on ${moment(parseOptions[key]?.date).format(
        "DD MMM YYYY, hh:mm A"
      )}`
    : null;
}

// Extract Dropdown component for reusability
export const DropdownButton = ({ options, handleClick }: any) => {
  return (
    <DropDown options={options} handleClick={handleClick}>
      <FaBars className="text-sterling-red-800" />
    </DropDown>
  );
};

export const handleProductsDropdown = (
  status: string,
  isChecker,
  DropDownOptions,
  locked = false,
  permissions: string[] = [],
  created_By_Id,
  userId
): any => {
  if (!status) return [];
  if (isChecker) {
    return DropDownOptions[status]?.filter(
      (i: any) => i.text.toLowerCase() === "view"
    );
  } else {
    let options = DropDownOptions[status];
    if (!permissions?.includes("RE_OR_DEACTIVATE_INVESTMENT_PRODUCT")) {
      options = options?.filter(
        (i: any) =>
          i.text.toLowerCase() !== "deactivate" &&
          i.text.toLowerCase() !== "activate"
      );
    }
    if (
      !permissions?.includes("CREATE_INVESTMENT_PRODUCT") ||
      (permissions?.includes("CREATE_INVESTMENT_PRODUCT") &&
        !permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_RECORDS") &&
        created_By_Id !== userId)
    ) {
      options = options?.filter((i: any) => i.text.toLowerCase() === "view");
    }
    return options;
  }
};

export const TextCellContent = ({ value }) => (
  <span className="relative">
    <span className="relative">{value || "-"}</span>
  </span>
);

export const ProductNameCellContent = ({ value }) => (
  <>
    <br />
    <span className="relative font-medium text-sm text-[#aaaaaa] uppercase">
      {value?.productCode || "-"}
    </span>
  </>
);

export const UpdatedOnCellContent = ({ value }) => (
  <span className="relative">
    <span className=" relative">
      {moment(value).format("DD MMM YYYY, hh:mm A")}
    </span>
  </span>
);

export const StateCellContent = ({ value }) => (
  <span
    className={`font-medium px-2 py-[4px] rounded capitalize max-h-[26px] relative leading-[24px] ${handleColorState(
      value
    )}`}
  >
    {value}
  </span>
);
export const StatusCellContent = ({ value, isChecker }) => (
  <span
    className={`font-medium px-2 py-[3px] flex gap-x-[7px] max-h-[26px]  max-w-max items-center rounded capitalize relative leading-[24px] ${handleColorState(
      value
    )}`}
  >
    {handleUserView(value, isChecker)} <FaEye />
  </span>
);

export const ActionsCellContent = ({ dropDownOptions, onClick }) => (
  <DropdownButton options={dropDownOptions} handleClick={onClick} />
);
export default function TableComponent<TableProps>({
  headers,
  tableRows,
  page,
  total,
  fetchMoreData,
  hasMore,
  getOptionData,
  isLoading,
  dropDownOptions,
  dropDownClick,
  onChangeDate,
  type = "",
  noData = "No data available",
}) {
  const { role, permissions, userId, isChecker } = useContext(AppContext);
  const { category, selected, isDetailOpen, setDetailOpen, detail, setDetail } =
    useContext(InvestmentContext);
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  const previousData = useRef({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");

  // function getdata(item, key) {}
  // @ts-ignore
  const handleAction = (action, items) => {
    actionHandler({
      action,
      items,
      category,
      setAction,
      setDetail,
      setSubText,
      dropDownClick,
      previousData,
      setConfirmText,
      setIsConfirmOpen,
      setDetailOpen,
      navigate,
      selected,
    });
  };

  const [
    deleteRequest,
    { isSuccess, isError, error, isLoading: deleteLoading },
  ] = useDeleteProductRequestMutation();
  const [
    activateProduct,
    {
      isSuccess: activateSuccess,
      isError: activateIsError,
      error: activateError,
      isLoading: activateIsLoading,
    },
  ] = useActivateProductMutation();

  const handleConfirm = () =>
    confirmationHandler({
      action,
      detail,
      permissions,
      selected,
      previousData,
      deleteRequest,
      setIsDeactivationOpen,
      activateProduct,
      navigate,
    });

  useEffect(() => {
    statusHandler({
      isSuccess,
      setSuccessText,
      setIsSuccessOpen,
      activateSuccess,
      isError,
      setFailedText,
      setFailed,
      activateIsError,
      activateError,
      setFailedSubtext,
      error,
      role,
    });
  }, [isSuccess, isError, error, activateSuccess, activateIsError]);

  return (
    <div>
      {" "}
      <div id="tableContainer" className="relative min-h-[400px]">
        <InfiniteScroll
          dataLength={tableRows?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={""}
          // loader={
          //   <div className="text-xs text-center py-6 text-gray-500 relative flex itemx-center justify-center gap-x-1">
          //     Loading data...
          //     <span className="spinner-border h-4 w-4 border-t border-gray-500 rounded-full animate-spin"></span>
          //   </div>
          // }
          endMessage={
            !isLoading && (
              <div className="text-xs text-center py-6 text-gray-500">
                No more data
              </div>
            )
          }
          scrollableTarget="tableContainer"
          height="70vh"
        >
          <table className="w-full relative">
            <thead
              className={`${
                tableRows?.length > 0 ? "sticky" : "relative"
              } top-0 bg-white border-b border-[#C2C9D1]/30 z-[10]`}
            >
              <tr>
                {headers.map(
                  ({ label, options, hasSelect, hasDateSelect, key }) => (
                    <th
                      key={label}
                      className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
                    >
                      <div className="relative flex items-center gap-x-20 justify-between">
                        <span className="relative">
                          {label}{" "}
                          {/* {key === "updated_At" && (
                            <span className="absolute block bg-[#CF2A2A] h-[6px] w-[6px] rounded-full -right-[6px] top-[1px]"></span>
                          )} */}
                        </span>

                        <span>
                          {hasSelect && (
                            <MultiSelect
                              options={options}
                              getOptions={(e: any) => getOptionData(e, label)}
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
                  )
                )}
              </tr>
            </thead>
            {tableRows?.length > 0 && (
              <tbody>
                {tableRows.map((item: any, index) => (
                  <tr
                    key={item.id + index.toString()}
                    className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
                  >
                    {headers.map((header, idx) => (
                      <td
                        className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative"
                        key={idx.toString() + header.key}
                      >
                        <div className="relative max-w-max">
                          {header.key !== "actions" ? (
                            <>
                              {typeof item[header.key] !== "object" &&
                                header.key !== "state" &&
                                header.key !== "updated_At" &&
                                header.key !== "requestStatus" && (
                                  <TextCellContent
                                    value={item[header.key] || "-"}
                                  />
                                )}
                              {header.key === "state" && (
                                <StateCellContent value={item[header.key]} />
                              )}
                              {header.key === "requestStatus" && (
                                <span
                                  onClick={() => handleAction("view", item)}
                                >
                                  <StatusCellContent
                                    value={item[header.key]}
                                    isChecker={isChecker}
                                  />
                                </span>
                              )}
                              {header.key === "updated_At" && (
                                <UpdatedOnCellContent
                                  value={item[header.key]}
                                />
                              )}
                              {header.key === "productName" && (
                                <ProductNameCellContent value={item} />
                              )}
                            </>
                          ) : (
                            <div>
                              {!isChecker ? (
                                <ActionsCellContent
                                  dropDownOptions={
                                    type === StatusCategoryType.AllProducts ||
                                    type === StatusCategoryType.Investments
                                      ? handleProductsDropdown(
                                          item.state,
                                          isChecker,
                                          dropDownOptions,
                                          item.islocked,
                                          permissions,
                                          item.created_By_Id,
                                          userId
                                        )
                                      : handleDropdown(
                                          item.requestStatus,
                                          item.requestType,
                                          permissions,
                                          item.created_By_Id,
                                          userId
                                        )
                                  }
                                  onClick={(e: any) => handleAction(e, item)}
                                />
                              ) : (
                                <>
                                  {item?.requestStatus === "in-review" ? (
                                    <Button
                                      onClick={() =>
                                        handleAction("review", item)
                                      }
                                      className="px-[7px] py-[6px] text-sm font-normal bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] text-[#636363]"
                                    >
                                      Review
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => handleAction("view", item)}
                                      className="px-[7px] py-[6px] text-sm font-normal bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] text-[#636363]"
                                    >
                                      View
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                          {handleUpdated(
                            header.key,
                            item[header.key],
                            item.recentlyUpdatedMeta
                          ) && (
                            <Tooltip
                              size="small"
                              arrow
                              theme="light"
                              distance={40}
                              className="bg-white"
                              html={
                                <div className="text-[#636363] text-[10px] z-[999] whitespace-nowrap">
                                  {handleUpdated(
                                    header.key,
                                    item[header.key],
                                    item.recentlyUpdatedMeta
                                  )}
                                </div>
                              }
                            >
                              <div className="h-[10px] w-[10px] flex items-center justify-center cursor-pointer">
                                <span className="absolute h-[6px] w-[6px] -right-[6px] top-[1px] rounded-full bg-[#CF2A2A]"></span>
                              </div>
                            </Tooltip>
                          )}{" "}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
            {tableRows?.length == 0 && !isLoading && (
              <tbody>
                {Array.from(Array(10)).map((item: any, index) => (
                  <tr
                    key={item + index.toString()}
                    className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
                  >
                    {headers.map((it, idxx) => (
                      <td
                        key={`key-${idxx}`}
                        className="text-sm font-medium text-[#aaa] px-4 py-5 capitalize max-w-[290px] truncate relative text-left"
                      >
                        {idxx === 0 && index === 0 && noData}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {isLoading && (
            <div className="text-xs text-center py-6 text-gray-500 relative flex itemx-center justify-center gap-x-1">
              Loading data...
              <span className="spinner-border h-4 w-4 border-t border-gray-500 rounded-full animate-spin"></span>
            </div>
          )}
        </InfiniteScroll>
      </div>
      {/* @ts-ignore */}
      <MessagesComponent
        isConfirmOpen={isConfirmOpen}
        isSuccessOpen={isSuccessOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        isFailed={isFailed}
        isDeactivationOpen={isDeactivationOpen}
        isDetailOpen={isDetailOpen}
        deleteLoading={deleteLoading}
        activateIsLoading={activateIsLoading}
        confirmText={confirmText}
        detail={detail}
        subText={subText}
        successText={successText}
        failedText={failedText}
        failedSubText={failedSubText}
        handleConfirm={handleConfirm}
        setIsSuccessOpen={setIsSuccessOpen}
        setFailed={setFailed}
        setIsDeactivationOpen={setIsDeactivationOpen}
        setDetailOpen={setDetailOpen}
        handleAction={handleAction}
      />
    </div>
  );
}
