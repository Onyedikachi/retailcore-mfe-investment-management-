import { FaCaretDown, FaCaretUp, FaTimes } from "react-icons/fa";
import ModalLayout from "../../modals/Layout";
import { useGetChargeQuery, useGetTaxQuery } from "@app/api";
import { Fragment, useEffect } from "react";
import { date } from "yup";
import ChargeInformationAndValue from "./ChargeInformationAndValue";
import { currencyFormatter } from "@app/utils/formatCurrency";
import moment from "moment";

export default ({ id, closeModal }) => {
  const { data: taxData, loading, isSuccess } = useGetTaxQuery({ id: id });


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
                  {taxData?.data?.name || " - "}{" "}
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
                <span>Tax Information</span>
                <div className="flex flex-row justify-center w-full h-[90px] items-center rounded-md mt-4 mb-8 border-2">
                  <div className="w-[80%] h-[60px]  flex flex-row justify-between">
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Description
                      </span>
                      <span className="text-gray-500 text-[14px]">
                        {taxData?.data?.description || "-"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Currency
                      </span>
                      <span className="text-gray-500 text-[14px]">
                        {taxData?.data?.currency || "-"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-around items-start w-[33%]">
                      <span className="text-gray-500 text-[12px]">
                        Tax Effective Date
                      </span>
                      <span className="text-gray-500 text-[14px]">
                        {moment(taxData?.data?.created_at).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
                <span>Tax Value</span>
                <div className="flex flex-row justify-center w-full h-[90px] items-center rounded-md mt-4 mb-8 border-2">
                  <div className="w-[80%] h-[60px]  flex flex-row justify-between">
                    {taxData?.data?.tax_values?.map((item) => (
                      <div className="flex flex-col justify-around items-start w-[33%]">
                        <span className="text-gray-500 text-[12px] capitalize">
                          {item.tax_type}
                        </span>
                        <span className="text-gray-500 text-[14px]">
                          {item.tax_amount_type?.toLowerCase() === "percent"
                            ? `${item.tax_amount}%`
                            : `${currencyFormatter(
                                item.tax_amount,
                                taxData?.data?.currency
                              )}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/*  */}
                <span>Accounting Entries</span>
                <div className="flex flex-col justify-start w-full items-center rounded-md mt-4 mb-8 border-2">
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
                      {taxData?.data?.tax_impacted_ledgers?.map((item) => {
                        return (
                          <div
                            key={item.tax_id}
                            className="flex flex-row w-full justify-start h-min-[60px] bg-[#DB353905] bg-opacity-[02]"
                          >
                            <div className="pl-4 w-[36%] flex flex-col">
                              <span className="text-black">
                                {item.ledger_name}
                              </span>
                              <span>{item.ledger_code}</span>
                            </div>
                            <div className="pl-4 w-[32%] flex justify-center items-center">
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
                      })}
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
