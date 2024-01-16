import { useState, useEffect, useContext } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import {
  CapitalizationOptions,
  CustomerCategory,
  Interval,
  liquidities,
  ProductTypes,
  RollOverOptions,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { AppContext } from "@app/utils";

export default function BookingDetail({
  detail,
  previousData,
  type,
  productDetail,
}: any) {
  const { currencies } = useContext(AppContext);

  return (
    <div>
      <h3 className="text-[#636363] text-[18px] font-semibold capitalize mb-[56px]">
        {type} Investment Detail
      </h3>
      <div className="grid gap-y-[56px]">
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Customer information
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Customer type
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="flex itmes-center"> {type} </span>
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Account number
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {" "}
                {detail?.customerBookingInfoModel.customerAccount}{" "}
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Account status
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
              {detail?.customerBookingInfoModel.accountStatus}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Facility Details
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Investment product
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {productDetail?.productInfo?.productName}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product category
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {
                  ProductTypes.find((n) => n.id === productDetail?.productType)
                    ?.name
                }
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Investment purpose
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.facilityDetailsModel?.investmentPurpose}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Tenor
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.facilityDetailsModel?.tenor}{" "}
                {
                  Interval[
                    productDetail?.pricingConfiguration?.applicableTenorMaxUnit
                  ]
                }
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Principal
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {currencyFormatter(
                  detail?.facilityDetailsModel?.principal,
                  handleCurrencyName(
                    productDetail?.productInfo?.currency,
                    currencies
                  )
                )}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Interest rate
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.facilityDetailsModel?.interestRate}%
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Interest Capitalization method
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {
                  CapitalizationOptions.find(
                    (i) =>
                      i.value ===
                      detail?.facilityDetailsModel?.capitalizationMethod
                  ).text
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Transaction Settings
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Account for liquidation
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.transactionSettingModel?.accountForLiquidation}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Notify customer when maturity is due
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.transactionSettingModel?.notifyCustomerOnMaturity
                  ? "Yes"
                  : "No"}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Rollover after maturity
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.transactionSettingModel?.rollOverAtMaturity
                  ? RollOverOptions.find(
                      (i) =>
                        i.value ===
                        detail?.transactionSettingModel?.capitalizationMethod
                    ).text
                  : "No"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
