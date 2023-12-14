import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDown from "@app/components/DropDown";
import { MultiSelect, DateSelect } from "@app/components/forms";
import moment from "moment";
import { BsFunnel } from "react-icons/bs";
import { onChange } from "../forms/DateSelect";
import BottomBarLoader from "../BottomBarLoader";
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
  permissions: string[] = []
): any => {
  // if (locked)
  //   return DropDownOptions[status]?.filter(
  //     (i: any) => i.text.toLowerCase() === "view"
  //   );

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
    if (!permissions?.includes("CREATE_INVESTMENT_PRODUCT")) {
      options = options?.filter(
        (i: any) =>
          i.text.toLowerCase() !== "modify" && i.text.toLowerCase() !== "clone"
      );
    }
    return options;
  }
};

export const TextCellContent = ({ value }) => (
  <span className="relative">
    <span className="relative">{value || "-"}</span>
    <span className="absolute block bg-[#CF2A2A] h-[6px] w-[6px] rounded-full -right-[6px] top-0"></span>
  </span>
);

export const ProductNameCellContent = ({ value }) => (
  <>
    <span className="relative block font-medium text-sm text-[#aaaaaa] uppercase">
      {value?.productCode || "-"}
    </span>
  </>
);

export const UpdatedOnCellContent = ({ value }) => (
  <span className="relative">
    <span className=" relative">
      {moment(value).format("DD MMM YYYY, hh:mm A")}
    </span>
    <span className="absolute block bg-[#CF2A2A] h-[6px] w-[6px] rounded-full -right-[6px] top-0"></span>
  </span>
);

export const StateCellContent = ({ value }) => (
  <span
    className={`font-medium px-2 py-[4px] rounded capitalize max-h-[26px] relative leading-[24px] ${handleColorState(
      value
    )}`}
  >
    {value}

    <span className="absolute block bg-[#CF2A2A] h-[6px] w-[6px] rounded-full -right-[6px] top-0"></span>
  </span>
);
export const StatusCellContent = ({ value, isChecker }) => (
  <span
    className={`font-medium px-2 py-[3px] flex gap-x-[7px] max-h-[26px]  max-w-max items-center rounded capitalize relative leading-[24px] ${handleColorState(
      value
    )}`}
  >
    {handleUserView(value, isChecker)} <FaEye />
    <span className="absolute bg-[#CF2A2A] h-[6px] w-[6px] rounded-full -right-[6px] top-0"></span>
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
  const { role, permissions } = useContext(AppContext);
  const {
    isChecker,
    category,
    selected,
    isDetailOpen,
    setDetailOpen,
    detail,
    setDetail,
  } = useContext(InvestmentContext);
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [subText, setSubText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");

  const notify = (toastMessage) => toast.error(toastMessage);
  // function getdata(item, key) {}
  const handleAction = (action, items) => {
    console.log("🚀 ~ file: index.tsx:171 ~ handleAction ~ action:", action);
    setAction(action);
    setDetail(items);
    dropDownClick(action, items);
    setSubText("");

    if (action.toLowerCase() === Actions.DEACTIVATE) {
      setConfirmText(Prompts.PRODUCT_DEACTIVATE);
      setSubText(Prompts.PRODUCT_DEACTIVATE_SUBTEXT);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.ACTIVATE) {
      setConfirmText(Prompts.PRODUCT_ACTIVATE);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.WITHDRAW_DELETE) {
      setConfirmText(Prompts.PRODUCT_WITHDRAW_DELETE);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.DELETE_REQUESTS) {
      setConfirmText(Prompts.PRODUCT_DELETE);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.WITHDARW_MODIFY) {
      setConfirmText(Prompts.PRODUCT_WITHDRAW_MODIFY);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.MODIFY) {
      setConfirmText(Prompts.PRODUCT_MODIFY);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.DELETE_DRAFT) {
      setConfirmText(Prompts.PRODUCT_DELETE);
      setIsConfirmOpen(true);
      return;
    }
    if (action.toLowerCase() === Actions.CONTINUE_REQUEST) {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term deposit"
        )}/continue/?id=${items.id}&type=draft&filter=${selected.value}`
      );
      return;
    }

    if (action.toLowerCase() === Actions.VIEW) {
      category === StatusCategoryType.AllProducts
        ? setDetailOpen(true)
        : navigate(
            `/product-factory/investment/${encodeURIComponent(
              "term deposit"
            )}/process-summary/preview/${items.id}?category=request&filter=${
              selected.value
            }`
          );
      return;
    }
    if (action.toLowerCase() === "review") {
      category === StatusCategoryType.AllProducts
        ? setDetailOpen(true)
        : navigate(
            `/product-factory/investment/${encodeURIComponent(
              "term deposit"
            )}/process-summary/verdict/${items.id}?category=request&filter=${
              selected.value
            }`
          );
      return;
    }
  };

  const [
    deleteRequest,
    { isSuccess, isError, error, isLoading: deleteLoading },
  ] = useDeleteProductRequestMutation();
  useEffect(
    () => console.log(deleteLoading, isLoading),
    [deleteLoading, isLoading]
  );
  const [
    activateProduct,
    {
      isSuccess: activateSuccess,
      isError: activateIsError,
      error: activateError,
      isLoading: activateIsLoading,
    },
  ] = useActivateProductMutation();

  const handleConfirm = () => {
    if (action.toLowerCase().includes("delete")) {
      deleteRequest(detail.id);
    }
    if (action.toLowerCase() === Actions.DEACTIVATE) {
      setIsDeactivationOpen(true);
    }
    if (action.toLowerCase() === Actions.ACTIVATE) {
      activateProduct({ id: detail?.id });
    }
    if (
      action.toLowerCase() === Actions.MODIFY
    ) {
      if (!permissions?.includes("CREATE_INVESTMENT_PRODUCT")) {
        notify("You do not have permission to make changes!");
      } else {
        navigate(
          `/product-factory/investment/${encodeURIComponent(
            "term deposit"
          )}/modify/?id=${detail.id}&filter=${selected.value}`
        );
      }
    }

    if (
    
      action.toLowerCase() === Actions.WITHDARW_MODIFY
    ) {
      if (!permissions?.includes("CREATE_INVESTMENT_PRODUCT")) {
        notify("You do not have permission to make changes!");
      } else {
        navigate(
          `/product-factory/investment/${encodeURIComponent(
            "term deposit"
          )}/withdraw_modify/?id=${detail.id}&filter=${selected.value}`
        );
      }
    }
  };

  useEffect(() => {
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
      setFailedSubtext(error?.message?.message);
      setFailed(true);
    }

    if (activateIsError) {
      setFailedText(Messages.PRODUCT_ACTIVATE_FAILED);
      setFailedSubtext(activateError?.message?.message);
      setFailed(true);
    }
  }, [isSuccess, isError, error, activateSuccess, activateIsError]);

  return (
    <div>
      {" "}
      <ToastContainer />{" "}
      <InfiniteScroll
        dataLength={tableRows?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={""}
      >
        <div className="relative min-h-[400px] max-h-[70vh] overflow-y-auto">
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
                          {key === "updated_At" && (
                            <span className="absolute block bg-[#CF2A2A] h-[6px] w-[6px] rounded-full -right-[6px] top-[1px]"></span>
                          )}
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
            {tableRows?.length > 0 && !isLoading && (
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
                        <span className="relative">
                          {header.key !== "actions" ? (
                            <>
                              {typeof item[header.key] !== "object" &&
                                header.key !== "state" &&
                                header.key !== "updated_At" &&
                                header.key !== "requestStatus" && (
                                  <TextCellContent value={item[header.key]} />
                                )}
                              {header.key === "state" && (
                                <StateCellContent value={item[header.key]} />
                              )}
                              {header.key === "requestStatus" && (
                                <StatusCellContent
                                  value={item[header.key]}
                                  isChecker={isChecker}
                                />
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
                                    type === "all products"
                                      ? handleProductsDropdown(
                                          item.state,
                                          isChecker,
                                          dropDownOptions,
                                          item.islocked,
                                          permissions
                                        )
                                      : handleDropdown(
                                          item.requestStatus,
                                          item.requestType,
                                          permissions
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
                        </span>
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
        </div>
        {isLoading && <BottomBarLoader />}
      </InfiniteScroll>{" "}
      {isConfirmOpen && (
        <Confirm
          text={confirmText}
          subtext={subText}
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          onConfirm={() => {
            setIsConfirmOpen(false);
            handleConfirm();
          }}
          onCancel={() => {
            setIsConfirmOpen(false);
          }}
        />
      )}
      {isSuccessOpen && (
        <Success
          text={successText}
          isOpen={isSuccessOpen}
          setIsOpen={setIsSuccessOpen}
        />
      )}
      {isFailed && (
        <Failed
          text={failedText}
          subtext={failedSubText}
          isOpen={isFailed}
          setIsOpen={setFailed}
        />
      )}
      {isDeactivationOpen && (
        <RequestDeactivation
          isOpen={isDeactivationOpen}
          setIsOpen={setIsDeactivationOpen}
          onConfirm={() => {}}
          detail={detail}
          // setReason={() => {}}
        />
      )}
      {isDetailOpen && (
        <ProductDetail
          isOpen={isDetailOpen}
          setIsOpen={setDetailOpen}
          handleClick={handleAction}
          detail={detail}
          // setReason={() => {}}
        />
      )}
      {(deleteLoading || activateIsLoading) && (
        <Loader
          isOpen={deleteLoading || activateIsLoading}
          text={"Submitting"}
        />
      )}
    </div>
  );
}
