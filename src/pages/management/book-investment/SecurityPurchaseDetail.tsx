import React, { useContext, useEffect, useState } from "react";
import {
  ProcessingStatusSlider,
  ActivityLog,
  Actions,
  MiniTermDepositDetail,
  BookingDetail,
  ReviewStatus,
  InvestmentCalculation,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useModifyInvestmentMutation,
  useModifyInvestmentRequestMutation,
  useCreateInvestmentMutation,
  useGetGlClassQuery,
  useGetAccountsQuery,
  useGetSecurityPurchaseRequestActivityLogQuery,
  useGetSecurityPurchaseActivityLogQuery,
} from "@app/api";
import { Confirm, Failed, Success } from "@app/components/modals";
import {
  intervalOptions,
  CapitalizationOptions,
  productCategoryOptions,
} from "@app/constants";
import { Messages, Prompts } from "@app/constants/enums";
import { AppContext } from "@app/utils";
import { summaryLinks } from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import moment from "moment";

export function Container({ children }) {
  return (
    <div className="rounded-[10px] border border-[#EEE] px-12 py-10">
      {children}
    </div>
  );
}

export default function ({
  formData,
  productDetail,
  previousData = null,
}: any) {
  return (
    <div>
      <Container>
        <div>
          <h3 className="text-[#636363] text-[18px] font-semibold mb-[56px]">
            Security Purchase Details
          </h3>
          <div className="grid gap-y-[56px]">
            <div className="flex flex-col">
              <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
                Facility Details
              </h4>
              <div className="grid grid-cols-1 gap-[25px] px-12">
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Money Market Category
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    {
                      productCategoryOptions.find(
                        (i) => i.value === productDetail?.moneyMarketCategory
                      )?.text
                    }
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Issuer
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    {productDetail?.issuer || " - "}
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Description
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {productDetail?.description || " - "}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Deal Date
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {moment(productDetail?.dealDate).format("DD MMM YYYY")}{" "}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Maturity Date
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {moment(productDetail?.maturityDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Currency
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">{productDetail?.currencyCode}</span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Discount Rate
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {productDetail?.discountRate || "-"}
                      {productDetail?.discountRate && "%"}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Face Value
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {currencyFormatter(
                        productDetail?.faceValue || 0,
                        productDetail?.currencyCode
                      )}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Total Consideration
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {currencyFormatter(
                        productDetail?.totalConsideration,
                        productDetail?.currencyCode
                      )}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Interest Capitalization Method
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    <span className="">
                      {
                        CapitalizationOptions.find(
                          (i) => i.value === productDetail?.capitalizationMethod
                        )?.text
                      }
                    </span>
                  </div>
                </div>
                {productDetail?.securityPurchaseIntervals && (
                  <div className=" flex gap-[54px]">
                    <div className="w-[300px]   text-base font-medium text-[#636363]">
                      Specify Interval
                    </div>
                    <div className="w-full text-base font-normal text-[#636363]">
                      <span className="">
                        {productDetail?.securityPurchaseIntervals}
                        {
                          intervalOptions.find(
                            (i) =>
                              i.id === productDetail?.securityPurchaseIntervals
                          )?.text
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-y-[56px] mt-[56px]">
            <div className="flex flex-col">
              <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
                Account Entries
              </h4>
              <div className="grid grid-cols-1 gap-[25px] px-12">
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Credit Ledger
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    {productDetail?.creditLedger || " - "}
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    DebitLedger
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    {productDetail?.debitLedger || " - "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
