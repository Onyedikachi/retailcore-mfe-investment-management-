import { useState, useEffect, useContext } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import {
  AccountStatus,
  CapitalizationOptions,
  CustomerCategory,
  Interval,
  liquidities,
  ProductTypes,
  RollOverOptions,
  StartdateType,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { AppContext } from "@app/utils";
import { CustomerDetail } from "../modals/CustomerDetail";
import {
  useGetCustomerProfileQuery,
  useGetAccountDataByIdQuery,
} from "@app/api";

export default function BookingDetail({
  detail,
  previousData,
  type,
  productDetail,
}: any) {
  const { currencies } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState(null);

  const { data: profileData } = useGetCustomerProfileQuery(
    detail?.customerBookingInfoModel?.customerId,
    {
      skip: !detail?.customerBookingInfoModel?.customerId,
    }
  );

  const { data: accountData } = useGetAccountDataByIdQuery(
    detail?.customerBookingInfoModel?.customerAccount,
    { skip: !detail?.customerBookingInfoModel?.customerAccount }
  );
  return (
    <div>
      {isOpen && profileData && (
        <CustomerDetail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          detail={profileData?.data?.customer_profiles[0]}
          id={detail?.customerBookingInfoModel?.customerAccount}
        />
      )}
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
                Customer Id
              </div>
              <div className="w-full text-base font-normal text-[#636363] capitalize flex gap-x-4 items-center">
                {" "}
                <span>
                  {detail?.customerBookingInfoModel?.customerAccount}{" "}
                </span>{" "}
                <button
                  className="px-[7px] py-[4px] text-sm font-normal bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] text-[#636363]"
                  onClick={() => setIsOpen(true)}
                >
                  View
                </button>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Customer type
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="flex itmes-center capitalize"> {type} </span>
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Account number
              </div>
              <div className="w-full text-base font-normal text-[#636363] capitalize">
                {" "}
                {detail?.customerBookingInfoModel?.customerAccount}{" "}
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Account status
              </div>
              <div className="w-full text-base font-normal text-[#636363] capitalize">
                {AccountStatus[accountData?.value?.accountStatus]}{" "}
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
                {Interval[detail?.facilityDetailsModel?.tenorUnit]}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Principal
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {currencyFormatter(
                  detail?.facilityDetailsModel?.principal,
                  productDetail?.productInfo?.currencyCode
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
                  )?.text
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
                Customer account for principal liquidation
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.transactionSettingModel?.accountForLiquidation}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Customer account for interest payment
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.transactionSettingModel?.accountForInterest}
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
                        detail?.transactionSettingModel?.rollOverOption
                    )?.text
                  : "No"}
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Investment effective start date
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {detail?.transactionSettingModel?.startDateOption == 0
                  ? StartdateType[
                      detail?.transactionSettingModel?.startDateOption
                    ]
                  : moment(detail?.transactionSettingModel?.startDate).format(
                      "DD MMM YYYY"
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
