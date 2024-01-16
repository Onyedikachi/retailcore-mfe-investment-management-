import { useBookingCalcMutation } from "@app/api";
import { GlAccountTypes, Interval, liquidities } from "@app/constants";
import { AppContext, capitalizeFirstLetter } from "@app/utils";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
// interface ILogProps {
//   isFetching: boolean;
//   isLoading: boolean;
//   activities: Array<any>;
// }

export default function ProductInfoInvestmentCalc({
  productDetail,
  formData,
}) {
  const { currencies } = useContext(AppContext);
  const [productDetailMap, setProductDetailMap] = useState(null);
  const [active, setActive] = useState([]);
  const [calcDetail, setCalcDetail] = useState(null);

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
      },
      {
        name: "Early & Part Liquidation Configuration",
        data: [
          {
            name: "",
            text: (
              <div className="w-full text-sm font-normal text-[#636363]">
                {productDetail?.liquidation?.part_AllowPartLiquidation ? (
                  <span className="font-normal block">
                    {productDetail?.liquidation
                      ?.part_RequireNoticeBeforeLiquidation && (
                      <span>
                        <span>Require notice of</span>{" "}
                        <span className="">
                          {productDetail?.liquidation?.part_NoticePeriod}{" "}
                          {
                            Interval[
                              productDetail?.liquidation?.part_NoticePeriodUnit
                            ]
                          }
                        </span>{" "}
                        <span>before liquidation</span>
                      </span>
                    )}
                    {
                      <div className="font-normal">
                        <div className="flex gap-x-1">
                          <span className="">Penalty:</span>{" "}
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
                            ] == "ForfietAll" && "Forfeit all accrued interest"}
                          </span>
                          <span>
                            {liquidities[
                              productDetail?.liquidation
                                ?.part_LiquidationPenalty
                            ] == "ForfietPortion" &&
                              `Forfeit a portion of accrued interest - ${productDetail?.liquidation?.part_LiquidationPenaltyPercentage}%`}
                          </span>
                          <span>
                            {liquidities[
                              productDetail?.liquidation
                                ?.part_LiquidationPenalty
                            ] == "RecalculateInterest" &&
                              `Recalculate accrued interest of ${productDetail?.liquidation?.part_LiquidationPenaltyPercentage}%`}
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
                    Maximum of{" "}
                    {productDetail?.liquidation?.part_MaxPartLiquidation}% of
                    principal
                  </span>
                ) : (
                  "Not Applicable"
                )}
              </div>
            ),
            isOpen: true,
          },
        ],
        isOpen: true,
      },
      {
        name: "Charges & Taxes Configuration",
        data: [],
        isOpen: true,
      },
    ]);
  }, [productDetail]);
  const [
    bookingCalc,
    {
      data: calcData,
      isSuccess: calcIsSuccess,
      isError: calcIsError,
      error: calcError,
      isLoading: calcLoading,
    },
  ] = useBookingCalcMutation();

  const fetchRate = () => {
    bookingCalc({
      principal: formData?.facilityDetailsModel?.principal,
      rate: formData?.facilityDetailsModel?.interestRate,
      tenor: formData?.facilityDetailsModel?.tenor,
      tenorUnit: productDetail?.pricingConfiguration?.applicableTenorMaxUnit,
      method: formData?.facilityDetailsModel?.capitalizationMethod,
    });
  };

  useEffect(() => {
    if (
      productDetail &&
      formData?.facilityDetailsModel?.tenor &&
      formData?.facilityDetailsModel?.principal &&
      formData?.facilityDetailsModel?.interestRate
    ) {
      fetchRate();
    }
  }, [
    formData?.facilityDetailsModel?.tenor,
    formData?.facilityDetailsModel?.principal,
    formData?.facilityDetailsModel?.interestRate,
    formData?.facilityDetailsModel?.capitalizationMethod,
  ]);

  useEffect(() => {
    setCalcDetail(calcData?.data);
  }, [calcData, calcIsSuccess]);

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
                <div className="flex items-center gap-x-1 mb-1">
                  {active.includes(item?.name) ? (
                    <FaCaretDown className="text-[#555555]" />
                  ) : (
                    <FaCaretRight className="text-[#555555]" />
                  )}

                  <span
                    onClick={() => toggleTab(item?.name)}
                    className="text-[#636363] text-base font-medium"
                  >
                    {item?.name}
                  </span>
                </div>

                {active.includes(item?.name) && (
                  <div>
                    <div className="grid grid-cols-1 gap-y-1">
                      {item?.data?.map((k) => (
                        <div key={k?.name}>
                          {k.isOpen && (
                            <div className="flex gap-x-4  text-sm pl-5">
                              {k?.name && (
                                <span className="capitalize w-[150px]">
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      <div
        data-testid="investment-calculation"
        className="border border-[#E5E9EB]  w-full rounded-lg bg-[#ffffff]"
      >
        <div className="pt-[30px] pb-[19px] border-b border-[#cccccc] px-6 ">
          <span className="text-[#636363] font-medium text-[20px] uppercase">
            Investment Calculation
          </span>
        </div>

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
                {
                  Interval[
                    productDetail?.pricingConfiguration?.applicableTenorMaxUnit
                  ]
                }
                , effective after approval
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
