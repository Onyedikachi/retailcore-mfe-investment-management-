import React, { useContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import DropDown from "@app/components/DropDown";
import { MultiSelect, DateSelect } from "@app/components/forms";
import moment from "moment";
import { currencyFormatter } from "@app/utils/formatCurrency";

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
import { InvestmentBookingStatus } from "@app/constants/investment";
import { Confirm, Failed, Success } from "../modals";
import Loader from "../Loader";
import RequestDeactivation from "../modals/RequestDeactivation";
import ProductDetail from "../modals/ProductDetail";
import { StatusCategoryType } from "@app/types";
import { useNavigate } from "react-router-dom";
import {
  useActivateProductMutation,
  useDeleteProductRequestMutation,
  useDeleteInvestmentRequestMutation,
} from "@app/api";
import Button from "../Button";
import { ActiveFilterOptions } from "@app/constants";
import MessagesComponent from "./MessagesComponent";
import { actionHandler } from "./actionHandler";
import { confirmationHandler } from "./confirmationHandler";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";

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
  handleRefresh?: () => void;
}

export const statusHandler = ({
  isDeleteInvestmentRequestSuccess,
  isDeleteInvestmentRequestError,
  deleteInvestmentRequestError,
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
  if (isDeleteInvestmentRequestSuccess) {
    setSuccessText(Messages.PRODUCT_DELETE_SUCCESS);
    setIsSuccessOpen(true);
  }
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
  if (isDeleteInvestmentRequestError) {
    setFailedText(Messages.PRODUCT_DELETE_FAILED);
    setFailedSubtext(
      deleteInvestmentRequestError?.message?.message ||
        deleteInvestmentRequestError?.message?.Message
    );
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
  statusType = "",
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
    return DropDownOptions[
      statusType === StatusCategoryType.Investments
        ? InvestmentBookingStatus[status].toLowerCase()
        : status
    ]?.filter((i: any) => i.text.toLowerCase() === "view");
  } else {
    let options =
      DropDownOptions[
        statusType === StatusCategoryType.Investments
          ? InvestmentBookingStatus[status].toLowerCase()
          : status
      ];
    if (!permissions?.includes("RE_OR_DEACTIVATE_INVESTMENT_PRODUCT")) {
      options = options?.filter(
        (i: any) =>
          i.text.toLowerCase() !== "deactivate" &&
          i.text.toLowerCase() !== "activate"
      );
    }
    if (!permissions?.includes("LIQUIDATE_INVESTMENT")) {
      options = options?.filter(
        (i: any) =>
          i.text.toLowerCase() !== "part liquidate" &&
          i.text.toLowerCase() !== "early liquidate"
      );
    }
    if (!permissions?.includes("BOOK_INVESTMENT")) {
      options = options?.filter(
        (i: any) => i.text.toLowerCase() !== "restructure"
      );
    }
    if (
      !permissions?.includes("CREATE_INVESTMENT_PRODUCT") ||
      !permissions?.includes("BOOK_INVESTMENT") ||
      ((permissions?.includes("CREATE_INVESTMENT_PRODUCT") ||
        !permissions?.includes("BOOK_INVESTMENT")) &&
        !permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_RECORDS") &&
        created_By_Id !== userId)
    ) {
      options = options?.filter((i: any) => i.text.toLowerCase() === "view");
    }
    return options;
  }
};

export const TextCellContent = ({
  value,
  isCurrencyValue = false,
  currency,
}: {
  value: any;
  isCurrencyValue?: boolean;
  currency?: string;
}) => {
  const { currencies } = useContext(AppContext);
  return (
    <span className="relative">
      <span className="relative max-w-[290px] whitespace-normal">
        {`${
          isCurrencyValue
            ? currencyFormatter(value, handleCurrencyName(currency, currencies))
            : value
        }` || "-"}
      </span>
    </span>
  );
};

export const ProductNameCellContent = ({ value }) => (
  <>
    <br />
    <span className="relative font-medium text-sm text-[#aaaaaa] uppercase">
      {value?.productCode || "-"}
    </span>
  </>
);
export const CustomerNameCellContent = ({ value }) => (
  <>
    <br />
    <span className="relative font-medium text-sm text-[#aaaaaa] uppercase">
      {value?.investmentId || "-"}
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

export const StateCellContent = ({
  value,
  statusType = "",
}: {
  value: any;
  statusType?: string;
}) => (
  <div>
    {statusType === StatusCategoryType.Investments ? (
      <span
        className={`font-medium px-2 py-[4px] rounded capitalize max-h-[26px] relative leading-[24px] ${handleColorState(
          InvestmentBookingStatus[value].toLowerCase()
        )}`}
      >
        {InvestmentBookingStatus[value]}
      </span>
    ) : (
      <span
        className={`font-medium px-2 py-[4px] rounded capitalize max-h-[26px] relative leading-[24px] ${handleColorState(
          value
        )}`}
      >
        {value}
      </span>
    )}
  </div>
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
  Context,
  handleRefresh = () => {},
}) {
  const { role, permissions, userId, isChecker } = useContext(AppContext);
  const {
    specificCategory,
    category,
    selected,
    isDetailOpen,
    setDetailOpen,
    isIndividualDetailOpen,
    setIndividualDetailOpen,
    detail,
    setDetail,
  }: any = useContext(Context);

  const [action, setAction] = useState("");
  const navigate = useNavigate();
  const previousData = useRef({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [liquidationType, setLiquidationType] = useState(null);
  const [isLiquidation, setLiquidationOpen] = useState(false);
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
    // console.log(JSON.stringify({ action, items }));

    actionHandler({
      specificCategory,
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
      setLiquidationOpen,
      setLiquidationType,
      setDetailOpen,
      setIndividualDetailOpen,
      navigate,
      selected,
    });
  };

  const [
    deleteRequest,
    { isSuccess, isError, error, isLoading: deleteLoading },
  ] = useDeleteProductRequestMutation();

  const [
    deleteInvestmentRequest,
    {
      isSuccess: isDeleteInvestmentRequestSuccess,
      isError: isDeleteInvestmentRequestError,
      error: deleteInvestmentRequestError,
      isLoading: isDeleteInvestmentRequestLoading,
    },
  ] = useDeleteInvestmentRequestMutation();
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
      specificCategory,
      action,
      detail,
      permissions,
      selected,
      previousData,
      deleteRequest,
      deleteInvestmentRequest,
      setIsDeactivationOpen,
      activateProduct,
      navigate,
    });

  useEffect(() => {
    statusHandler({
      isDeleteInvestmentRequestSuccess,
      isDeleteInvestmentRequestError,
      deleteInvestmentRequestError,
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
  }, [
    isSuccess,
    isError,
    error,
    activateSuccess,
    activateIsError,
    isDeleteInvestmentRequestSuccess,
    isDeleteInvestmentRequestError,
    deleteInvestmentRequestError,
  ]);

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
                              showMe={
                                (key.toLowerCase() === "created_by" ||
                                  key.toLowerCase() === "approved_by") &&
                                userId
                              }
                              options={options}
                              getOptions={(e: any) => {
                                // console.log('e:' + JSON.stringify(e))
                                getOptionData(e, label);
                              }}
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
                        <div className="relative">
                          {header.key !== "actions" ? (
                            <>
                              {typeof item[header.key] !== "object" &&
                                header.key !== "state" &&
                                header.key !== "principal" &&
                                header.key !== "investmentBookingStatus" &&
                                header.key !== "updated_At" &&
                                header.key !== "requestStatus" && (
                                  <TextCellContent
                                    value={item[header.key] || "-"}
                                  />
                                )}
                              {header.key === "state" && (
                                <StateCellContent value={item[header.key]} />
                              )}
                              {header.key === "investmentBookingStatus" && (
                                <StateCellContent
                                  value={item[header.key]}
                                  statusType={type}
                                />
                              )}
                              {header.key === "principal" && (
                                <TextCellContent
                                  isCurrencyValue={true}
                                  value={item[header.key] || "-"}
                                  currency={item?.currency}
                                />
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
                              {header.key === "customerName" && (
                                <CustomerNameCellContent value={item} />
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
                                          type,
                                          item.state
                                            ? item.state
                                            : item.investmentBookingStatus
                                            ? item.investmentBookingStatus
                                            : null,
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
                                      className="px-[7px] py-[6px] text-sm font-normal roounded bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] text-[#636363]"
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
        specificCategory={specificCategory}
        isConfirmOpen={isConfirmOpen}
        isSuccessOpen={isSuccessOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        isFailed={isFailed}
        isDeactivationOpen={isDeactivationOpen}
        isDetailOpen={isDetailOpen}
        isIndividualDetailOpen={isIndividualDetailOpen}
        deleteLoading={deleteLoading || isDeleteInvestmentRequestLoading}
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
        setIndividualDetailOpen={setIndividualDetailOpen}
        handleAction={handleAction}
        isLiquidation={isLiquidation}
        setLiquidationOpen={setLiquidationOpen}
        liquidationType={liquidationType}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}
