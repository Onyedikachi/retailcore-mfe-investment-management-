import { useBookingCalcMutation } from "@app/api";
import { GlAccountTypes, Interval, liquidities } from "@app/constants";
import { AppContext, capitalizeFirstLetter } from "@app/utils";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  useGetApplicableChargesQuery,
  useGetApplicableTaxesQuery,
} from "@app/api";
// interface ILogProps {
//   isFetching: boolean;
//   isLoading: boolean;
//   activities: Array<any>;
// }

const taxChargeDataOptions = [
  {
    header: "Principal Deposit",
    key: "principalDepositChargesAndTaxes",
  },
  {
    header: "Part Liquidation",
    key: "partLiquidationChargesAndTaxes",
  },
  {
    header: "Early Liquidation",
    key: "earlyLiquidationChargesAndTaxes",
  },
  {
    header: "Maturity Liquidation",
    key: "investmentLiquidationChargesAndTaxes",
  },
];
export function ChargesAndTaxes({ taxData, chargeData, productDetail }) {

  return (
    <div>
      {" "}
      <div className="grid gap-y-2">
        {taxChargeDataOptions?.map((i) => (
          <div key={i.header} className="text-sm">
            <span className="font-semibold text-sm block mb-[5px]">
              {i.header} Charge & Tax
            </span>
            {productDetail[i.key]?.applicableCharges?.length > 0 && (
              <div className="flex items-center flex-wrap gap-x-1 mb-2">
                <span className="font-normal block">Charges :</span>
                <span className="flex items-center flex-wrap gap-1">
                {productDetail[i.key]?.applicableCharges?.map((item, index) => (
                  <span key={item} className="font-normal block">
                   
                    <span className="rounded-full px-[10px] py-[2px] text-xs bg-[#E0E0E0] flex gap-x-6 items-center text-[#16252A] capitalize">
                        {" "}
                        {chargeData?.find((it) => it.charge_id === item)?.name}
                      </span>
                    {index + 1 !==
                      productDetail[i.key]?.applicableCharges.length && (
                      <span>,</span>
                    )}
                  </span>
                ))}
                </span>
              </div>
            )}
            {productDetail[i.key]?.applicableTaxes?.length > 0 ? (
              <div className="flex items-center gap-x-1 mb-2">
                <span className="font-normal block">Taxes :</span>
                <span className="flex items-center flex-wrap gap-1">
                  {productDetail[i.key]?.applicableTaxes?.map((item, index) => (
                    <span key={item} className="font-normal block">
                      <span className="rounded-full px-[10px] py-[2px] text-xs bg-[#E0E0E0] flex gap-x-6 items-center text-[#16252A] capitalize">
                        {" "}
                        {taxData?.find((it) => it.tax_id === item)?.name}
                      </span>
                      {index + 1 !==
                        productDetail[i.key]?.applicableTaxes?.length && (
                        <span>,</span>
                      )}
                    </span>
                  ))}
                </span>
              </div>
            ) : (
              "-"
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductInfoInvestmentCalc({
  productDetail,
  formData,
  calcDetail,
  loading,
}) {
  const { currencies } = useContext(AppContext);
  const [productDetailMap, setProductDetailMap] = useState(null);
  const [active, setActive] = useState([]);
  const [chargeData, setChargeData] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const { data: charges, isSuccess: chargeSuccess } =
    useGetApplicableChargesQuery();
  const { data: taxes, isSuccess: taxSuccess } = useGetApplicableTaxesQuery();

  const toggleTab = (val) => {
    setActive((prevActive) => {
      if (prevActive.includes(val)) {
        return prevActive.filter((i) => i !== val);
      } else {
        return [...prevActive, val];
      }
    });
  };

  useEffect(() => {
    setProductDetailMap([
      {
        name: "Product Information",
        data: [
          {
            name: "Currency",
            text: handleCurrencyName(
              productDetail?.productInfo?.currency,
              currencies
            ),
            isOpen: true,
          },
          {
            name: "Life cycle",
            text: `${moment(productDetail?.productInfo?.startDate).format(
              "yyyy-MM-DD"
            )} - ${
              moment(productDetail?.productInfo?.endDate).isValid()
                ? moment(productDetail?.productInfo?.endDate).format(
                    "yyyy-MM-DD"
                  )
                : "Unlimited"
            }`,
            isOpen: true,
          },
        ],
        isOpen: false,
        isItemArray: true,
      },
      {
        name: "Customer Eligibility Criteria",
        data: [
          {
            name: "age range",
            text: (
              <span className="capitalize">
                {" "}
                {productDetail?.customerEligibility?.ageGroupMin} -{" "}
                {productDetail?.customerEligibility?.ageGroupMax
                  ? productDetail?.customerEligibility?.ageGroupMax
                  : "Unimited"}{" "}
                years
              </span>
            ),
            isOpen: productDetail?.customerEligibility?.customerCategory === 0,
          },
          {
            name: "documents",
            text: productDetail?.customerEligibility?.requireDocument
              ?.map((i) => capitalizeFirstLetter(i.name))
              ?.join(", "),
            isOpen: productDetail?.customerEligibility?.requireDocument.length,
          },
        ],
        isOpen: false,
        isItemArray: true,
      },
      {
        name: "Pricing Configuration",
        data: [
          {
            name: "Allowable principal",
            text: ` ${currencyFormatter(
              productDetail?.pricingConfiguration?.applicablePrincipalMin,
              handleCurrencyName(
                productDetail?.productInfo?.currency,
                currencies
              )
            )}
            -
            ${currencyFormatter(
              productDetail?.pricingConfiguration?.applicablePrincipalMax,

              handleCurrencyName(
                productDetail?.productInfo?.currency,
                currencies
              )
            )}`,
            isOpen: true,
          },
          {
            name: "Allowable tenor",
            text: (
              <span>
                {productDetail?.pricingConfiguration?.applicableTenorMin} -{" "}
                {productDetail?.pricingConfiguration?.applicableTenorMax}{" "}
                {
                  Interval[
                    productDetail?.pricingConfiguration?.applicableTenorMaxUnit
                  ]
                }
              </span>
            ),
            isOpen: true,
          },
          {
            name: "Interest rate",
            text: (
              <span>
                {" "}
                {productDetail?.pricingConfiguration?.interestRateMin} -{" "}
                {productDetail?.pricingConfiguration?.interestRateMax}% per
                annum
              </span>
            ),
            isOpen:
              productDetail?.pricingConfiguration?.interestRateRangeType === 2,
          },
          {
            name: "Interest rates",
            text: productDetail?.pricingConfiguration?.interestRateConfigModels?.map(
              (i, idx) => (
                <div key={idx}>
                  {productDetail?.pricingConfiguration
                    ?.interestRateRangeType === 0 ? (
                    <span>
                      {" "}
                      {i?.min} - {i?.max}% for{" "}
                      {currencyFormatter(
                        i?.principalMin,
                        handleCurrencyName(
                          productDetail?.productInfo?.currency,
                          currencies
                        )
                      )}{" "}
                      -
                      {currencyFormatter(
                        i?.principalMax,
                        handleCurrencyName(
                          productDetail?.productInfo?.currency,
                          currencies
                        )
                      )}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      {i?.min} - {i?.max}% for {i?.tenorMin} - {i?.tenorMax}{" "}
                      {Interval[i?.tenorMaxUnit]}
                    </span>
                  )}
                </div>
              )
            ),
            isOpen:
              productDetail?.pricingConfiguration?.interestRateRangeType !== 2,
          },
        ],
        isOpen: false,
        isItemArray: true,
      },
      {
        name: "Liquidation Configuration",
        data: [
          {
            name: "",
            text: (
              <div className="w-full text-sm font-normal text-[#636363]">
                {productDetail?.liquidation?.part_AllowPartLiquidation && (
                  <div className="mb-3">
                    <span className="font-semibold block mb-1">
                      Part Liquidation Configuration
                    </span>
                    <span className="font-normal block">
                      {productDetail?.liquidation
                        ?.part_RequireNoticeBeforeLiquidation && (
                        <span>
                          <span>Require notice of</span>{" "}
                          <span className="">
                            {productDetail?.liquidation?.part_NoticePeriod}{" "}
                            {
                              Interval[
                                productDetail?.liquidation
                                  ?.part_NoticePeriodUnit
                              ]
                            }
                          </span>{" "}
                          <span>before part liquidation.</span>
                        </span>
                      )}
                      {
                        <div className="font-normal">
                          <div className="flex gap-x-[2px]">
                            <span className="">Penalty: </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.part_LiquidationPenalty
                              ] == "none" &&
                                liquidities[
                                  productDetail?.liquidation
                                    ?.part_LiquidationPenalty
                                ]}
                            </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.part_LiquidationPenalty
                              ] == "ForfietAll" &&
                                "Forfeit all accrued interest"}
                            </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.part_LiquidationPenalty
                              ] == "ForfietPortion" &&
                                `Forfeit ${productDetail?.liquidation?.part_LiquidationPenaltyPercentage}% of accrued interest.`}
                            </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.part_LiquidationPenalty
                              ] == "RecalculateInterest" &&
                                `Recalculate accrued interest of ${productDetail?.liquidation?.part_SpecialInterestRate}%.`}
                            </span>
                            <span className="flex flex-wrap gap-x-1 my-1">
                              {liquidities[
                                productDetail?.liquidation
                                  ?.part_LiquidationPenalty
                              ] == "TakeCharge" && (
                                <span>
                                  {" "}
                                  <span>
                                    {" "}
                                    Take a charge{" "}
                                    <span className="flex flex-wrap">
                                      {productDetail?.liquidation?.part_SpecificCharges?.map(
                                        (charge) => (
                                          <span className="flex items-center font-medium text-[#16252A] bg-[#E0E0E0] px-[15px] py-[9px] rounded-full text-xs">
                                            {" "}
                                            {charge?.name} {charge?.amount}
                                          </span>
                                        )
                                      )}
                                    </span>
                                  </span>
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      }
                      Part Liquidate Maximum of{" "}
                      {productDetail?.liquidation?.part_MaxPartLiquidation}% of
                      principal
                    </span>
                  </div>
                )}

                {productDetail?.liquidation?.early_AllowEarlyLiquidation && (
                  <div>
                    <span className="font-semibold block mb-1">
                      Early Liquidation Configuration
                    </span>
                    <span className="font-normal block">
                      {productDetail?.liquidation
                        ?.early_RequireNoticeBeforeLiquidation && (
                        <span>
                          <span>Require notice of</span>{" "}
                          <span className="">
                            {productDetail?.liquidation?.early_NoticePeriod}{" "}
                            {
                              Interval[
                                productDetail?.liquidation
                                  ?.early_NoticePeriodUnit
                              ]
                            }
                          </span>{" "}
                          <span>before liquidation.</span>
                        </span>
                      )}
                      {
                        <div className="font-normal">
                          <div className="flex gap-x-[2px]">
                            <span className="">Penalty: </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.early_LiquidationPenalty
                              ] == "none" &&
                                liquidities[
                                  productDetail?.liquidation
                                    ?.early_LiquidationPenalty
                                ]}
                            </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.early_LiquidationPenalty
                              ] == "ForfietAll" &&
                                "Forfeit all accrued interest"}
                            </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.early_LiquidationPenalty
                              ] == "ForfietPortion" &&
                                `Forfeit ${productDetail?.liquidation?.early_LiquidationPenaltyPercentage}% of accrued interest.`}
                            </span>
                            <span>
                              {liquidities[
                                productDetail?.liquidation
                                  ?.early_LiquidationPenalty
                              ] == "RecalculateInterest" &&
                                `Recalculate accrued interest of ${productDetail?.liquidation?.eary_SpecialInterestRate}%.`}
                            </span>
                            <span className="flex flex-wrap gap-x-1 my-1">
                              {liquidities[
                                productDetail?.liquidation
                                  ?.early_LiquidationPenalty
                              ] == "TakeCharge" && (
                                <span>
                                  {" "}
                                  <span>
                                    {" "}
                                    Take a charge{" "}
                                    <span className="flex flex-wrap">
                                      {productDetail?.liquidation?.early_SpecificCharges?.map(
                                        (charge) => (
                                          <span className="flex items-center font-medium text-[#16252A] bg-[#E0E0E0] px-[15px] py-[9px] rounded-full text-xs">
                                            {" "}
                                            {charge?.name} {charge?.amount}
                                          </span>
                                        )
                                      )}
                                    </span>
                                  </span>
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      }
                    </span>
                  </div>
                )}
                {!productDetail?.liquidation?.early_AllowEarlyLiquidation &&
                  !productDetail?.liquidation?.part_AllowEarlyLiquidation && (
                    <span className="text-sm text-[#a3a3a3">
                      Not applicable
                    </span>
                  )}
              </div>
            ),
            isOpen: true,
          },
        ],
        isOpen: true,
        isItemArray: true,
      },
      {
        name: "Charges & Taxes Configuration",
        data: (
          <ChargesAndTaxes
            taxData={taxData}
            chargeData={chargeData}
            productDetail={productDetail}
          />
        ),
        isOpen: false,
        isItemArray: false,
      },
    ]);
  }, [productDetail, taxData, chargeData]);

  useEffect(() => {
    if (chargeSuccess) {
      setChargeData(charges?.data?.records);
    }

    if (taxSuccess) {
      setTaxData(taxes?.data?.records);
    }
  }, [chargeSuccess, taxSuccess]);

  return (
    <div className="flex flex-col w-full gap-[17px]">
      <div
        data-testid="product-info"
        className="border border-[#E5E9EB]  w-full rounded-lg bg-[#ffffff]"
      >
        <div className="pt-[30px] pb-[19px] border-b border-[#cccccc] px-6 ">
          <span className="text-[#636363] font-medium text-[20px] uppercase">
            Product Information
          </span>
        </div>

        <div className="flex flex-col gap-6 px-6 py-[36px]">
          <div className="flex flex-col rounded-[6px] bg-[#F9F2F2] gap-[13px] px-[21px] py-[16px]">
            <span className="text-base text-[#636363] font-medium capitalize">
              {productDetail?.productInfo?.productName}
            </span>
            <span className="text-sm font-normal text-[#636363]">
              {productDetail?.productInfo?.description}
            </span>
          </div>

          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
            {productDetailMap?.map((item, index) => (
              <div key={index} className="">
                <div
                 role="button" tabIndex={0}
                  onClick={() => toggleTab(item?.name)}
                  className="flex items-center gap-x-1 mb-1"
                >
                  {active.includes(item?.name) ? (
                    <FaCaretDown className="text-[#555555]" />
                  ) : (
                    <FaCaretRight className="text-[#555555]" />
                  )}

                  <span className="text-[#636363] text-base font-medium">
                    {item?.name}
                  </span>
                </div>

                {active.includes(item?.name) && (
                  <div>
                    {item.isItemArray ? (
                      <div className="grid grid-cols-1 gap-y-1">
                        {item?.data?.map((k) => (
                          <div key={k?.name}>
                            {k.isOpen && (
                              <div className="flex flex-col  text-sm pl-5">
                                {k?.name && (
                                  <span className="capitalize w-[150px] font-semibold">
                                    {k?.name}
                                  </span>
                                )}
                                <span className="flex-1">
                                  <span>{k?.text}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pl-5">{item.data}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      <div
        data-testid="product-info"
        className="border border-[#E5E9EB]  w-full rounded-lg bg-[#ffffff]"
      >
        <div className="pt-[30px] pb-[19px] border-b border-[#cccccc] px-6 ">
          <span className="text-[#636363] font-medium text-[20px] uppercase">
            Investment Calculation
          </span>
        </div>

        {!loading ? (
          <>
            {calcDetail && (
              <div className="flex flex-col gap-6 px-6 py-[36px]">
                <div className="flex flex-col ">
                  <span className="text-[#636363] font-medium text-base">
                    Value at Maturity
                  </span>
                  <span className="">
                    {currencyFormatter(
                      calcDetail?.maturityValue || 0,
                      handleCurrencyName(
                        productDetail?.productInfo?.currency,
                        currencies
                      )
                    )}
                  </span>
                </div>
                <div className="flex flex-col ">
                  <span className="text-[#636363] font-medium text-base">
                    Principal
                  </span>
                  <span className="">
                    {currencyFormatter(
                      calcDetail?.principal || 0,
                      handleCurrencyName(
                        productDetail?.productInfo?.currency,
                        currencies
                      )
                    )}
                  </span>
                </div>
                <div className="flex flex-col ">
                  <span className="text-[#636363] font-medium text-base">
                    Maturity Date
                  </span>
                  <span className="">
                    {calcDetail?.maturityDate}{" "}
                    {Interval[formData?.facilityDetailsModel?.tenorUnit]},
                    effective after approval
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-xs text-center py-10 text-gray-500 relative flex itemx-center justify-center gap-x-1">
            Calculating data...
            <span className="spinner-border h-4 w-4 border-t border-gray-500 rounded-full animate-spin"></span>
          </div>
        )}
      </div>
    </div>
  );
}
