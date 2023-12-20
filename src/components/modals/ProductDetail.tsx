import React, { useContext, useEffect, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaBan, FaEdit, FaPlayCircle, FaTimes } from "react-icons/fa";
import moment from "moment";
import ModalLayout from "./Layout";
import BottomBarLoader from "../BottomBarLoader";
import {
  CustomerCategory,
  Interval,
  ProductTypes,
  liquidities,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { useGetProductDetailQuery } from "@app/api";
import { AppContext } from "@app/utils";
import PricingConfigurationComponent from "./PricingConfigurationComponent";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCancel?: () => void;
  handleClick?: (e: any, detail: any) => void;
  detail: any;
}

export default function ProductDetail({
  isOpen,
  setIsOpen,
  handleClick,
  detail,
}: Props) {

  const {
    data: productData,
    isLoading,
    isSuccess,
  } = useGetProductDetailQuery({
    id: detail?.id,
  });

  const [open, setOpen] = useState(false);
  const { permissions } = useContext(AppContext);

  React.useEffect(() => {

  }, [isSuccess]);
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        data-testid="product-view"
        className="relative  w-[1218px]  rounded-lg bg-white"
      >
        {!isLoading && (
          <div>
            <div className="flex justify-between items-center pb-6 pt-8 px-16 border-b border-[#CCCCCC] w-full">
              <div className="flex gap-x-5 items-center">
                <h1 className="text-[#636363] font-bold text-2xl uppercase">
                  {productData?.data?.productInfo?.productName || "-"}
                </h1>
                <span
                  className={`${
                    productData?.data?.state === 2
                      ? "text-[#15692A] bg-[#D4F7DC]"
                      : "text-[#1E0A3C] bg-[#E5E5EA]"
                  } px-2 py-[1px] rounded font-medium capitalize`}
                >
                  {productData?.data?.state === 2 ? "Active" : "Inactive"}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 outline-none bg-transparent absolute right-6 top-6"
                data-testid="close-btn"
              >
                <FaTimes className="text-[#002266] opacity-60 hover:opacity-50 text-xl" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-5 text-left px-10 py-11">
              <div className="flex flex-col justify-between gap-y-3">
                <div className="p-6 flex flex-col gap-y-[35px] max-h-[463px] overflow-y-auto">
                  {/* {detail?.status === "R" && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Reason for Deactivation
                      </span>
                      <span className="font-normal block">
                        {detail?.reason}
                      </span>
                    </div>
                  )} */}
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Type
                    </span>
                    <span className="font-normal block uppercase">
                      {ProductTypes.find(
                        (i) => i.id == productData?.data?.productType
                      )?.name || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Code
                    </span>
                    <span className="font-normal block uppercase">
                      {productData?.data?.productCode || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Slogan
                    </span>
                    <span className="font-normal block">
                      {productData?.data?.productInfo?.slogan || "-"}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Description
                    </span>
                    <span className="font-normal block">
                      {productData?.data?.productInfo?.description || "-"}{" "}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Life Cycle
                    </span>
                    <span className="font-normal block">
                      {moment(productData?.data?.productInfo?.startDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                      -{" "}
                      {productData?.data?.productInfo?.endDate
                        ? moment(
                            productData?.data?.productInfo?.endDate
                          ).format("DD MMM YYYY")
                        : "Unspecified"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">Currency</span>
                    <span className="font-normal block">
                      {productData?.data?.productInfo?.currency}{" "}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Customer Category
                    </span>
                    <span className="font-normal block">
                      {
                        CustomerCategory[
                          productData?.data?.customerEligibility
                            ?.customerCategory
                        ]
                      }{" "}
                    </span>
                  </div>
                </div>
                <div className="border border-[#E5E9EB] rounded-lg py-[35px] px-[30px] flex justify-between items-center">
                  <div className="flex gap-x-6 items-center">
                    {permissions?.includes("CREATE_INVESTMENT_PRODUCT") && (
                      <button
                        data-testid="modify"
                        onClick={() => handleClick("modify", productData?.data)}
                        className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3`}
                      >
                        <FaEdit className="text-[#D4A62F]" /> Modify
                      </button>
                    )}
                    {permissions?.includes(
                      "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
                    ) && (
                      <>
                        {productData?.data?.state === 1 ? (
                          <button
                            type="button"
                            data-testid="activate-btn"
                            onClick={() => handleClick("activate", productData?.data)}
                            className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3 outline-none`}
                          >
                            <FaPlayCircle className="text-[#2FB755]" /> Activate
                          </button>
                        ) : (
                          <button
                            data-testid="deactivate-btn"
                            onClick={() => handleClick("deactivate", productData?.data)}
                            className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3 outline-none`}
                          >
                            <FaBan className="text-sterling-red-800" />{" "}
                            Deactivate
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <a
                    href={`/product-factory/investment/${encodeURIComponent(
                      "term deposit"
                    )}/process-summary/preview/${productData?.data.id}?category=product`}
                  >
                    <button
                      className={`group flex items-center whitespace-nowrap py-[1px] text-base text-[#636363] gap-x-3 underline outline-none`}
                    >
                      View Activity Log
                    </button>
                  </a>
                </div>
              </div>
              <div className="border border-[#E5E9EB] rounded-lg py-[25px] px-[30px] h-[593px]">
                <div className="pr-[30px] h-full gap-y-[35px] overflow-y-auto flex flex-col">
                  <div className="">
                    <span className="font-bold block mb-[15px]">
                      Applicable Tenor
                    </span>
                    <span className="font-normal block">
                      {`${
                        productData?.data?.pricingConfiguration
                          ?.applicableTenorMin
                      } ${
                        Interval[
                          productData?.data?.pricingConfiguration
                            ?.applicableTenorMinUnit
                        ]
                      }`}{" "}
                      -{" "}
                      {`${
                        productData?.data?.pricingConfiguration
                          ?.applicableTenorMax
                      } ${
                        Interval[
                          productData?.data?.pricingConfiguration
                            ?.applicableTenorMaxUnit
                        ]
                      }`}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Applicable Principal
                    </span>
                    <span className="font-normal block">
                      {currencyFormatter(
                        productData?.data?.pricingConfiguration
                          ?.applicablePrincipalMin,
                        productData?.data?.productInfo.currency
                      )}{" "}
                      {productData?.data?.pricingConfiguration
                        ?.applicablePrincipalMax
                        ? `- ${currencyFormatter(
                            productData?.data?.pricingConfiguration
                              ?.applicablePrincipalMax,
                            productData?.data?.productInfo?.currency
                          )}`
                        : "and above"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Interest Rate
                    </span>
                    {/* <span className="font-normal block">{detail?.slogan}</span> */}
                    <div className="w-full text-base font-normal text-[#636363]">
                      {productData?.data?.pricingConfiguration
                        .interestRateRangeType == 0 && (
                        <div className="flex flex-col">
                          {productData?.data?.pricingConfiguration.interestRateConfigModels?.map(
                            (configModel, index) => (
                              <span
                                key={index}
                                className={`${
                                  index !== 0 && "hidden"
                                } block  mb-2 text-[#636363]`}
                              >
                                {" "}
                                {`${configModel.min} - ${configModel.max}%`} for
                                principal between{" "}
                                {`${currencyFormatter(
                                  configModel.principalMin,
                                  productData?.data?.productInfo?.currency
                                )} - ${currencyFormatter(
                                  configModel.principalMax,
                                  productData?.data?.productInfo?.currency
                                )}`}{" "}
                              </span>
                            )
                          )}
                        </div>
                      )}

                      {productData?.data?.pricingConfiguration
                        .interestRateRangeType == 1 && (
                        <div className="flex flex-col">
                          {productData?.data?.pricingConfiguration.interestRateConfigModels?.map(
                            (configModel, index) => (
                              <span
                                key={index}
                                className={`${
                                  index !== 0 && "hidden"
                                } block  mb-2 text-[#636363]`}
                              >
                                {" "}
                                {`${configModel.min} - ${configModel.max}%`} for
                                tenor between{" "}
                                {`${configModel.tenorMin} ${
                                  Interval[configModel.tenorMinUnit]
                                } - ${configModel.tenorMax} ${
                                  Interval[configModel.tenorMaxUnit]
                                }`}{" "}
                              </span>
                            )
                          )}
                        </div>
                      )}
                      {productData?.data?.pricingConfiguration
                        .interestRateRangeType == 2 && (
                        <div className="flex flex-col">
                          <span className="block  mb-2 text-[#636363]">
                            {" "}
                            {`${productData?.data?.pricingConfiguration.interestRateMin} - ${productData?.data?.pricingConfiguration.interestRateMax}%`}
                          </span>
                        </div>
                      )}
                    </div>
                    {productData?.data?.pricingConfiguration
                      .interestRateRangeType !== 0 ||
                      (productData?.data?.pricingConfiguration
                        .interestRateRangeType !== 1 && (
                        <button
                          data-testid="more"
                          className="text-[#636363]  underline"
                          onClick={() => setOpen(true)}
                        >
                          View more
                        </button>
                      ))}
                  </div>
                  {productData?.data?.liquidation
                    ?.part_AllowPartLiquidation && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Part Liquidation
                      </span>
                      <div className="w-full text-base font-normal text-[#636363]">
                        {productData?.data?.liquidation
                          ?.part_AllowPartLiquidation ? (
                          <span className="font-normal block">
                            {productData?.data?.liquidation
                              ?.part_RequireNoticeBeforeLiquidation && (
                              <span>
                                <span>Require notice of</span>{" "}
                                <span className="font-bold">
                                  {
                                    productData?.data?.liquidation
                                      ?.part_NoticePeriod
                                  }

                                  {
                                    Interval[
                                      productData?.data?.liquidation
                                        ?.part_NoticePeriodUnit
                                    ]
                                  }
                                </span>{" "}
                                <span>before liquidation</span>
                              </span>
                            )}
                            {
                              <p className="font-normal">
                                <span className="font-bold">Penalty:</span>{" "}
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.part_LiquidationPenalty
                                  ] == "none" &&
                                    liquidities[
                                      productData?.data?.liquidation
                                        ?.part_LiquidationPenalty
                                    ]}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.part_LiquidationPenalty
                                  ] == "ForfietAll" &&
                                    "Forfeit all accrued interest"}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.part_LiquidationPenalty
                                  ] == "ForfietPortion" &&
                                    `Forfeit a portion of accrued interest - ${productData?.data?.liquidation?.part_LiquidationPenaltyPercentage}%`}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.part_LiquidationPenalty
                                  ] == "RecalculateInterest" &&
                                    `Recalculate accrued interest of ${productData?.data?.liquidation?.part_LiquidationPenaltyPercentage}%`}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.part_LiquidationPenalty
                                  ] == "TakeCharge" && "Take a charge"}
                                </span>
                              </p>
                            }
                            Maximum of{" "}
                            {
                              productData?.data?.liquidation
                                ?.part_MaxPartLiquidation
                            }
                            % of principal
                          </span>
                        ) : (
                          "Not Applicable"
                        )}
                      </div>
                    </div>
                  )}
                  {productData?.data?.liquidation
                    ?.early_AllowEarlyLiquidation && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Early Liquidation
                      </span>
                      <div className="w-full text-base font-normal text-[#636363]">
                        {productData?.data?.liquidation?.early_AllowEarlyLiquidation ? (
                          <span className="font-normal block">
                            {productData?.data?.liquidation
                              ?.early_RequireNoticeBeforeLiquidation && (
                              <span>
                                <span>Require notice of</span>{" "}
                                <span className="font-bold">
                                  {productData?.data?.liquidation?.early_NoticePeriod}

                                  {
                                    Interval[
                                      productData?.data?.liquidation
                                        ?.early_NoticePeriodUnit
                                    ]
                                  }
                                </span>{" "}
                                <span>before liquidation</span>
                              </span>
                            )}
                            {
                              <p className="font-normal">
                                <span className="font-bold">Penalty:</span>{" "}
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.early_LiquidationPenalty
                                  ] == "none" &&
                                    liquidities[
                                      productData?.data?.liquidation
                                        ?.early_LiquidationPenalty
                                    ]}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.early_LiquidationPenalty
                                  ] == "ForfietAll" &&
                                    "Forfeit all accrued interest"}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.early_LiquidationPenalty
                                  ] == "ForfietPortion" &&
                                    `Forfeit a portion of accrued interest - ${productData?.data?.liquidation?.early_LiquidationPenaltyPercentage}%`}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.early_LiquidationPenalty
                                  ] == "RecalculateInterest" &&
                                    `Recalculate accrued interest of ${productData?.data?.liquidation?.early_LiquidationPenaltyPercentage}%`}
                                </span>
                                <span>
                                  {liquidities[
                                    productData?.data?.liquidation
                                      ?.early_LiquidationPenalty
                                  ] == "TakeCharge" && "Take a charge"}
                                </span>
                              </p>
                            }
                          </span>
                        ) : (
                          "Not Applicable"
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Principal Deposit Charge & Tax
                    </span>
                    <div className="flex items-center flex-wrap gap-x-1">
                      <span className="font-normal block">Charges :</span>
                      <span className="font-normal block">
                        Maintenance , Auction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="h-[500px] flex items-center justify-center" data-testid="loading-spinner">
            <div className="spinner-border h-11 w-11 border-t border-danger-500 rounded-full animate-spin"></div>
          </div>
        )}
        <ModalLayout isOpen={open} setIsOpen={setOpen}>
          <div className="px-[30px] pt-[64px] pb-[20px] bg-white w-[400px] rounded-lg relative">
            <ul className="max-h-[345px] overflow-y-auto flex flex-col gap-y-5">
              <PricingConfigurationComponent {...productData}/>
            </ul>
            <button
              onClick={() => setOpen(false)}
              className="p-2 outline-none bg-transparent absolute right-6 top-6"
              data-testid="close-btn"
            >
              <FaTimes className="text-[#002266] opacity-60 hover:opacity-50 text-xl" />
            </button>
          </div>
        </ModalLayout>
      </div>
    </ModalLayout>
  );
}
