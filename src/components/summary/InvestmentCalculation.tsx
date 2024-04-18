import { useState, useEffect, useContext } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import {
  CustomerCategory,
  Interval,
  liquidities,
  ProductTypes,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { AppContext } from "@app/utils";

export default function InvestmentCalculation({ detail, productDetail }: any) {
  const { currencies } = useContext(AppContext);

  return (
    <div>
      <h3 className="text-[#636363] text-[18px] font-semibold mb-[56px]">
        Investment calculation
      </h3>
      <div className="grid gap-y-[56px]">
        <div className="flex flex-col">
          {/* <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
          Investment calculation
          </h4> */}
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Value at maturity
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {currencyFormatter(
                  detail?.calcDetail?.maturityValue || 0,
                  productDetail?.productInfo?.currencyCode
                )}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Principal
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {currencyFormatter(
                  detail?.calcDetail?.principal || 0,
                  productDetail?.productInfo?.currencyCode
                )}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Maturity date
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="">
                  {detail?.calcDetail?.maturityDate}{" "}
                  {Interval[detail?.facilityDetailsModel?.tenorUnit]}, effective
                  upon approval
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
