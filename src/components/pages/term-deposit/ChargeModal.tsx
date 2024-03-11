import { FaCaretDown, FaCaretUp, FaTimes } from "react-icons/fa";
import ModalLayout from "../../modals/Layout";
import { useGetChargeQuery } from "@app/api";
import { Fragment, useEffect } from "react";
import { date } from "yup";
import ChargeInformationAndValue from "./ChargeInformationAndValue";
import { currencyFormatter } from "@app/utils/formatCurrency";
import moment from "moment";

export default ({ id, closeModal }) => {
  const {
    data: chargeData,
    loading,
    isSuccess,
  } = useGetChargeQuery({ id: id });

  return (
    <ModalLayout isOpen={id && id !== "null"} setIsOpen={() => {}}>
      <div
        data-testid="product-view"
        className="relative  w-[1218px]  rounded-lg bg-white max-h-[75vh] overflow-x-auto"
      >
        {loading && (
          <div
            className="h-[500px] flex items-center justify-center"
            data-testid="loading-spinner"
          >
            <div className="spinner-border h-11 w-11 border-t border-danger-500 rounded-full animate-spin"></div>
          </div>
        )}
        {!loading && (
          <div>
            <div className="flex justify-between items-center pb-6 pt-8 px-16 border-b border-[#CCCCCC] w-full">
              <div className="flex gap-x-5 items-center">
                <h1 className="text-[#636363] font-bold text-2xl uppercase">
                  {" "}
                  {chargeData?.data?.name || " - "}{" "}
                </h1>
              </div>
              <button
                onClick={() => closeModal()}
                className="p-2 outline-none bg-transparent absolute right-6 top-6"
                data-testid="close-btn"
              >
                <FaTimes className="text-[#002266] opacity-60 hover:opacity-50 text-xl" />
              </button>
            </div>
            <div className="w-full flex flex-col items-center pt-12">
              <div className="w-[90%] flex-col items-start mb-12">
                <span>Charge Information</span>
                <div className="flex flex-row justify-center w-full h-[90px] items-center rounded-md mt-4 mb-8 border-2">
                  <div className="w-[80%] h-[60px]  flex flex-row justify-between">
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Description
                      </span>
                      <span className="text-gray-500 text-[14px]">
                        {chargeData?.data?.description || "-"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Currency
                      </span>
                      <span className="text-gray-500 text-[14px]">
                        {chargeData?.data?.currency || "-"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Charge Effective Date
                      </span>
                      <span className="text-gray-500 text-[14px]">
                      {moment(chargeData?.data?.created_at).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
                <span>Charge Value</span>
                <div className="flex flex-row justify-center w-full h-[90px] items-center rounded-md mt-4 mb-8 border-2">
                  <div className="w-[80%] h-[60px]  flex flex-row justify-between">
                    {chargeData?.data?.charge_value?.map((item) => (
                      <div className="flex flex-col justify-around items-start w-[33%]">
                        <span className="text-gray-500 text-[12px] capitalize">
                          {item.charge_type}
                        </span>
                        <span className="text-gray-500 text-[14px]">
                          {item.charge_amount_type?.toLowerCase() === "percent"
                            ? `${item.charge_amount}%`
                            : `${currencyFormatter(
                                item.charge_amount,
                                chargeData?.data?.currency
                              )}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/*  */}
                <span>Taxes & Accounting Entries</span>
                <div className="flex flex-col justify-start w-full items-center rounded-md mt-4 mb-8 border-2">
                  <div className="w-[80%] flex flex-col justify-start mt-6">
                    {chargeData?.data?.charge_applicable_tax.length > 0 && (
                      <Fragment>
                        <div className="flex flex-col justify-around items-start w-[33%]">
                          <span className="text-gray-500 text-[12px]">
                            Applicable Taxes
                          </span>
                        </div>
                        <div className="flex flex-col w-full mt-2 mb-6">
                          <div className="flex flex-row justify-start">
                            <div className="p-4 pl-0 w-[50%]">
                              <span className="border-l-2 font-bold pl-4">
                                Tax
                              </span>
                            </div>
                            <div className="p-4 pl-0">
                              <span className="border-l-2 font-bold pl-4">
                                Value
                              </span>
                            </div>
                          </div>
                          {chargeData?.data?.charge_applicable_tax?.map(
                            (item) => {
                              return (
                                <div
                                  key={item.tax_id}
                                  className="flex flex-row w-full justify-start p-4 bg-[#DB353905] bg-opacity-[02]"
                                >
                                  <div className="p-4 pl-0 w-[50%]">
                                    <span className="pl-4">
                                      {item.tax_name}
                                    </span>
                                  </div>
                                  <div className="p-4 pl-0 w-[50%]">
                                    <span className="pl-4">
                                      {item?.tax_values?.[0]?.tax_amount}
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </Fragment>
                    )}
                  </div>

                  <div className="w-[80%] flex flex-col justify-start mt-6">
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Impacted Ledger
                      </span>
                    </div>
                    <div className="flex flex-col w-full mt-2 mb-6">
                      <div className="flex flex-row justify-start">
                        <div className="p-4 pl-0 w-[36%]">
                          <span className="border-l-2 font-bold pl-4">
                            LEDGER
                          </span>
                        </div>
                        <div className="p-4 pl-0 w-[32%]">
                          <span className="border-l-2 font-bold pl-4">
                            Balance Impact
                          </span>
                        </div>
                        <div className="p-4 pl-0 w-[32%]">
                          <span className="border-l-2 font-bold pl-4">
                            Allocation(%)
                          </span>
                        </div>
                      </div>
                      {chargeData?.data?.charge_impacted_ledgers?.map(
                        (item) => {
                          return (
                            <div
                              key={item.tax_id}
                              className="flex flex-row w-full justify-start h-[60px] bg-[#DB353905] bg-opacity-[02]"
                            >
                              <div className="pl-4 w-[36%] flex flex-col">
                                <span className="text-black">
                                  {item.ledger_name}
                                </span>
                                <span>{item.ledger_code}</span>
                              </div>
                              <div className="pl-4 w-[32%] flex justify-start items-center">
                                <span>
                                  {item?.balance_impact.toLowerCase() ===
                                  "low" ? (
                                    <FaCaretDown className="h-[60px] w-[50px] text-red-500" />
                                  ) : (
                                    <FaCaretUp className="h-[60px] w-[50px] text-green-500" />
                                  )}
                                </span>
                              </div>
                              <div className="pl-4 w-[32%] flex flex-rowx justify-start items-center">
                                <span className="text-xl">
                                  {item?.allocation}%
                                </span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalLayout>
  );
};
