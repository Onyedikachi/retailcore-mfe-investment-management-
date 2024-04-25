import { useState, useEffect, useContext } from "react";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import {
  CustomerCategory,
  Interval,
  liquidities,
  ProductTypes,
  MoneyMarketGlType,
} from "@app/constants";
import { useGetInvestmentDetailQuery } from "@app/api";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { AppContext } from "@app/utils";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PreviewChargesAndTaxes from "./PreviewChargesAndTaxes";
import { InterestComputationMethod } from "@app/constants";
export function DebitCreditTable({ dataTab }) {
  const location = useLocation();
  const headers = [
    {
      title: "S|N",
      key: "S|N",
    },
    {
      title: "event",
      key: "event",
    },

    {
      title: "specified ledger",
      key: "specified ledger",
    },
  ];

  const accountTypes = location.pathname.split("/").includes("treasury-bill")
    ? [
        "Term deposit account",
        "Interest income",
        "Interest expense",
        "Prepaid asset ledger",
      ]
    : [
        "Term deposit account",
        "Interest accural account",
        "Interest expense account",
        "Prepaid asset ledger",
      ];

  return (
    <table className="w-full">
      <thead>
        <tr>
          {headers?.map((i) => (
            <th
              className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] text-left after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
              key={i.key}
            >
              {i.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dataTab?.map((i, index) => (
          <tr
            key={i?.accountId}
            className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
          >
            <td
              data-testid="table-data"
              className="text-sm font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative text-left"
            >
              <span>
                <span className="text-[#aaa] capitalize">{index + 1}</span>
              </span>
            </td>
            <td className="text-sm font-medium text-[#AAAAAA] px-4 py-5 capitalize max-w-[290px] truncate relative text-left">
              <span>
                <span className="text-[#aaa] capitalize">
                  {accountTypes[i.glAccountType]}
                </span>
              </span>
            </td>
            <td className="text-sm font-medium text-[#AAAAAA] px-4 py-5 capitalize max-w-[290px] truncate relative text-left">
              <span>
                <span className="text-[#aaa]">{i.accountName}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export function MoneyDebitCreditTable({ dataTab }) {
  const location = useLocation();
  const headers = [
    {
      title: "debit ledger",
      key: "debit ledger",
    },
    {
      title: "credit ledger",
      key: "credit ledger",
    },
  ];

  const accountTypes = ["Issue to customers", "Upfront interest", "Redemption"];
  const dataObj = [
    {
      label: "Issue to customers",
      moneyMarketGlType: 0,
      ledgerEntryMappings: [
        {
          ledgerEntries: [
            {
              ledgerType: 0,
              ledgerCode: "ASTRAI1002S012",
              glClass: "ASSETS",
            },
          ],
          errors: null,
        },
      ],
    },
    {
      label: "Upfront interest payment",
      moneyMarketGlType: 1,
      ledgerEntryMappings: [
        {
          ledgerEntries: [
            {
              ledgerType: 0,
              ledgerCode: "ASTRAI1002S012",
              glClass: "ASSETS",
            },
          ],
          errors: null,
        },
      ],
    },
    {
      label: "Redemption at maturity",
      moneyMarketGlType: 2,
      ledgerEntryMappings: [
        {
          ledgerEntries: [
            {
              ledgerType: 0,
              ledgerCode: "EQUVFR1004S012",
              glClass: "EQUITY",
            },
          ],
          errors: null,
        },
      ],
    },
  ];
  return (
    <div>
      {dataTab.map((d) => (
        <div
          key={d?.moneyMarketGlType}
          className="border border-gray-100 rounded-lg flex gap-x-8"
        >
          <div className="pl-4 py-5 w-[240px] font-medium">
            {" "}
            {MoneyMarketGlType[d?.moneyMarketGlType]}
          </div>
          <table className="flex-1">
            <thead>
              <tr>
                {headers?.map((i) => (
                  <th
                    className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] text-left after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
                    key={i.key}
                  >
                    {i.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {d?.ledgerEntryMappings?.map((i, index) => (
                <tr
                  key={`${index}+index`}
                  className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
                >
                  <td className="text-sm font-medium text-[#AAAAAA] px-4 py-5 capitalize max-w-[290px] truncate relative text-left">
                    <span>
                      {i?.ledgerEntries.filter((i) => i.ledgerType === 0).length
                        ? i?.ledgerEntries
                            ?.filter((i) => i.ledgerType === 0)
                            .map((dt) => (
                              <span className="text-[#aaa] capitalize block text-left">
                                {dt.ledgerCode}
                              </span>
                            ))
                        : "-"}
                    </span>
                  </td>
                  <td className="text-sm font-medium text-[#AAAAAA] px-4 py-5 capitalize max-w-[290px] truncate relative text-left">
                    <span>
                      <span>
                        {i?.ledgerEntries.filter((i) => i.ledgerType === 1)
                          .length
                          ? i?.ledgerEntries
                              ?.filter((i) => i.ledgerType === 1)
                              .map((dt) => (
                                <span className="text-[#aaa] capitalize block text-left">
                                  {dt.ledgerCode}
                                </span>
                              ))
                          : "-"}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
export default function ProductDetail({ detail, previousData }: any) {
  console.log("🚀 ~ ProductDetail ~ detail:", detail);
  const { type } = useParams();

  const { data, isLoading } = useGetInvestmentDetailQuery(
    {
      id: detail?.productInfo?.securitPurchaseId,
      investmentType: "security-purchase",
    },
    { skip: !detail?.productInfo?.securitPurchaseId }
  );

  return (
    <div>
      <h3 className="text-[#636363] text-[18px] font-semibold mb-[56px] capitalize">
        {type.replace("-", " ")} Product Details
      </h3>
      <div className="grid gap-y-[56px]">
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Product Information
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            {type !== "term-deposit" && (
              <>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363] capitalize">
                    {type.replace("-", " ")} Investment Id
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    {previousData &&
                      previousData?.investmentId !==
                        detail?.productInfo?.investmentId && (
                        <span className="block  line-through mb-2 text-[#aaa]">
                          {" "}
                          {previousData?.code}
                        </span>
                      )}
                    <span className="flex itmes-center capitalize">
                      {" "}
                      {detail?.productInfo?.code}{" "}
                    </span>
                  </div>
                </div>
                <div className=" flex gap-[54px]">
                  <div className="w-[300px]   text-base font-medium text-[#636363]">
                    Issuer
                  </div>
                  <div className="w-full text-base font-normal text-[#636363]">
                    {previousData &&
                      previousData?.issuer !== detail?.productInfo?.issuer && (
                        <span className="block  line-through mb-2 text-[#aaa]">
                          {" "}
                          {previousData?.issuer}
                        </span>
                      )}
                    <span className="flex itmes-center">
                      {" "}
                      {detail?.productInfo?.issuer}{" "}
                      {previousData &&
                        previousData?.issuer &&
                        previousData?.issuer !==
                          detail?.productInfo?.issuer && (
                          <span className="block text-success-500 pl-[2px]">
                            {" "}
                            New
                          </span>
                        )}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product Name
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousData &&
                  previousData?.productName !==
                    detail?.productInfo?.productName && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousData?.productName}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.productInfo?.productName}{" "}
                  {previousData &&
                    previousData?.productName &&
                    previousData?.productName !==
                      detail?.productInfo?.productName && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Slogan
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousData &&
                  previousData?.slogan &&
                  previousData?.slogan !== detail?.productInfo?.slogan && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousData?.slogan}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.productInfo?.slogan}{" "}
                  {previousData &&
                    previousData?.slogan &&
                    previousData?.slogan !== detail?.productInfo?.slogan && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product Description
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousData &&
                  previousData?.description &&
                  previousData?.description !==
                    detail?.productInfo?.description && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousData?.description}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.productInfo?.description}{" "}
                  {previousData &&
                    previousData?.description &&
                    previousData?.description !==
                      detail?.productInfo?.description && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product Currency
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousData &&
                  previousData?.currencyCode &&
                  previousData?.currencyCode !==
                    detail?.productInfo?.currencyCode && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousData?.currencyCode}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.productInfo?.currencyCode}{" "}
                  {previousData &&
                    previousData?.currencyCode &&
                    previousData?.currencyCode !==
                      detail?.productInfo?.currencyCode && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>

            {type === "term-deposit" && (
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Product life cycle
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="flex itmes-center">
                    {" "}
                    <span className="font-normal block">
                      {moment(detail?.productInfo?.startDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                      -{" "}
                      {detail?.productInfo?.endDate
                        ? moment(detail?.productInfo?.endDate).format(
                            "DD MMM YYYY"
                          )
                        : "Unspecified"}
                    </span>
                  </span>
                </div>
              </div>
            )}
            {type !== "term-deposit" && (
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Deal date
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="flex itmes-center">
                    {" "}
                    <span className="font-normal block">
                      {moment(detail?.productInfo?.startDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                    </span>
                  </span>
                </div>
              </div>
            )}
            {type !== "term-deposit" && (
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Maturity date
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="flex itmes-center">
                    {" "}
                    <span className="font-normal block">
                      {moment(detail?.productInfo?.endDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {type === "term-deposit" && (
          <div className="flex flex-col">
            <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
              Customer Information Requirement
            </h4>
            <div className="grid grid-cols-1 gap-[25px] px-12">
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Customer group category
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  {previousData &&
                    previousData?.customerCategory &&
                    previousData?.customerCategory !==
                      detail.customerEligibility?.customerCategory && (
                      <span className="block  line-through mb-2 text-[#aaa]">
                        {" "}
                        {CustomerCategory[previousData?.customerCategory]}
                      </span>
                    )}
                  <span className="flex itmes-center">
                    {" "}
                    {
                      CustomerCategory[
                        detail?.customerEligibility?.customerCategory
                      ]
                    }{" "}
                    {previousData &&
                      previousData?.customerCategory &&
                      previousData?.customerCategory !==
                        detail?.customerEligibility?.customerCategory && (
                        <span className="block text-success-500 pl-[2px]">
                          {" "}
                          New
                        </span>
                      )}
                  </span>
                </div>
              </div>

              {detail?.productInfo?.customerCategory == 0 ||
                (detail?.customerEligibility?.customerCategory == 0 && (
                  <div className=" flex gap-[54px]">
                    <div className="w-[300px]   text-base font-medium text-[#636363]">
                      Age group eligibility
                    </div>
                    <div className="w-full text-base font-normal text-[#636363]">
                      <span className="flex itmes-center">
                        {" "}
                        {detail?.customerEligibility?.ageGroupMin}
                        {" - "}{" "}
                        {detail?.customerEligibility?.ageGroupMax
                          ? detail?.customerEligibility?.ageGroupMax
                          : "Unspecified"}
                      </span>
                    </div>
                  </div>
                ))}

              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Documentation required
                </div>
                <div className="w-full text-base font-normal text-[#636363] flex flex-wrap gap-x-1 gap-y-1">
                  {detail?.customerEligibility?.requireDocument?.map((i) => (
                    <span className="flex items-center font-medium text-[#16252A] bg-[#E0E0E0] px-[15px] py-[9px] rounded-full text-xs">
                      {" "}
                      {i?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Pricing Configuration
          </h4>
          {type === "term-deposit" ? (
            <div className="grid grid-cols-1 gap-[25px] px-12">
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Applicable Tenor
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    <span className="font-normal block">
                      {`${
                        detail?.pricingConfiguration?.applicableTenorMin || 0
                      } ${
                        Interval[
                          detail?.pricingConfiguration?.applicableTenorMinUnit
                        ]
                      }`}{" "}
                      -{" "}
                      {`${
                        detail?.pricingConfiguration?.applicableTenorMax || 0
                      } ${
                        Interval[
                          detail?.pricingConfiguration?.applicableTenorMaxUnit
                        ]
                      }`}
                    </span>
                  </span>
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Applicable Principal
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    {currencyFormatter(
                      detail?.pricingConfiguration?.applicablePrincipalMin,
                      detail?.productInfo?.currencyCode
                    )}{" "}
                    {detail?.pricingConfiguration?.applicablePrincipalMax
                      ? `- ${currencyFormatter(
                          detail?.pricingConfiguration?.applicablePrincipalMax,
                          detail?.productInfo?.currencyCode
                        )}`
                      : "and above"}
                  </span>
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Applicable Interest Rate Range
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  {detail?.pricingConfiguration?.interestRateRangeType == 0 && (
                    <div className="flex flex-col">
                      {detail?.pricingConfiguration?.interestRateConfigModels?.map(
                        (configModel, index) => (
                          <span
                            key={index}
                            className="block  mb-2 text-[#636363]"
                          >
                            {" "}
                            {`${configModel?.min} - ${configModel?.max}%`} for
                            principal between{" "}
                            {`${currencyFormatter(
                              configModel?.principalMin,
                              detail?.productInfo?.currencyCode
                            )} - ${currencyFormatter(
                              configModel?.principalMax,
                              detail?.productInfo?.currencyCode
                            )}`}{" "}
                            {/* {detail?.productInfo?.currency} */}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {detail?.pricingConfiguration?.interestRateRangeType == 1 && (
                    <div className="flex flex-col">
                      {detail?.pricingConfiguration?.interestRateConfigModels?.map(
                        (configModel, index) => (
                          <span
                            key={index}
                            className="block  mb-2 text-[#636363]"
                          >
                            {" "}
                            {`${configModel?.min} - ${configModel?.max}%`} for
                            tenor between{" "}
                            {`${configModel?.tenorMin} ${
                              Interval[configModel?.tenorMinUnit]
                            } - ${configModel?.tenorMax} ${
                              Interval[configModel?.tenorMaxUnit]
                            }`}{" "}
                          </span>
                        )
                      )}
                    </div>
                  )}
                  {detail?.pricingConfiguration?.interestRateRangeType == 2 && (
                    <div className="flex flex-col">
                      <span className="block  mb-2 text-[#636363]">
                        {" "}
                        {`${detail?.pricingConfiguration?.interestRateMin} - ${detail?.pricingConfiguration?.interestRateMax}%`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-[25px] px-12">
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Applicable Face value
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    <span className="font-normal block">
                      {currencyFormatter(
                        data?.data?.faceValue,
                        data?.data?.currencyCode
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Consideration
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    <span className="font-normal block">
                      {currencyFormatter(
                        data?.data?.totalConsideration,
                        data?.data?.currencyCode
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Discount rate
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    <span className="font-normal block">
                      {data?.data?.discountRate}%
                    </span>
                  </span>
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Per Amount
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    <span className="font-normal block">
                      {currencyFormatter(
                        data?.data?.perAmount,
                        data?.data?.currencyCode
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Interest Computation
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  mb-2 text-[#636363]">
                    <span className="font-normal block">
                      {
                        InterestComputationMethod[
                          data?.data?.interestComputationMethod
                        ]
                      }
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {type === "term-deposit" && (
          <div className="flex flex-col">
            <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
              Early & Part Liquidation Setup
            </h4>
            <div className="grid grid-cols-1 gap-[25px] px-12">
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Part Liquidation
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  {detail?.liquidation?.part_AllowPartLiquidation ? (
                    <span className="font-normal block">
                      {detail?.liquidation
                        ?.part_RequireNoticeBeforeLiquidation && (
                        <span>
                          <span>Require notice of</span>{" "}
                          <span className="font-bold">
                            {detail?.liquidation?.part_NoticePeriod}{" "}
                            {
                              Interval[
                                detail?.liquidation?.part_NoticePeriodUnit
                              ]
                            }
                          </span>{" "}
                          <span>before liquidation</span>
                        </span>
                      )}
                      {
                        <div className="font-normal">
                          <div className="flex gap-x-1">
                            <span className="font-bold">Penalty:</span>{" "}
                            <span>
                              {liquidities[
                                detail?.liquidation?.part_LiquidationPenalty
                              ] == "none" &&
                                liquidities[
                                  detail?.liquidation?.part_LiquidationPenalty
                                ]}
                            </span>
                            <span>
                              {liquidities[
                                detail?.liquidation?.part_LiquidationPenalty
                              ] == "ForfietAll" &&
                                "Forfeit all accrued interest"}
                            </span>
                            <span>
                              {liquidities[
                                detail?.liquidation?.part_LiquidationPenalty
                              ] == "ForfietPortion" &&
                                `Forfeit a portion of accrued interest - ${detail?.liquidation?.part_LiquidationPenaltyPercentage}%`}
                            </span>
                            <span>
                              {liquidities[
                                detail?.liquidation?.part_LiquidationPenalty
                              ] == "RecalculateInterest" &&
                                `Recalculate accrued interest of ${detail?.liquidation?.part_SpecialInterestRate}%`}
                            </span>
                            <span className="flex flex-wrap gap-x-1 my-1">
                              {liquidities[
                                detail?.liquidation?.part_LiquidationPenalty
                              ] == "TakeCharge" && (
                                <span>
                                  {" "}
                                  <span>
                                    {" "}
                                    Take a charge{" "}
                                    <span className="flex flex-wrap">
                                      {detail?.liquidation?.part_SpecificCharges?.map(
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
                      Maximum of {detail?.liquidation?.part_MaxPartLiquidation}%
                      of principal
                    </span>
                  ) : (
                    "Not Applicable"
                  )}
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Early Liquidation
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  {detail?.liquidation?.early_AllowEarlyLiquidation ? (
                    <span className="font-normal block">
                      {detail?.liquidation
                        ?.early_RequireNoticeBeforeLiquidation && (
                        <span>
                          <span>Require notice of</span>{" "}
                          <span className="font-bold">
                            {detail?.liquidation?.early_NoticePeriod}{" "}
                            {
                              Interval[
                                detail?.liquidation?.early_NoticePeriodUnit
                              ]
                            }
                          </span>{" "}
                          <span>before liquidation</span>
                        </span>
                      )}
                      {
                        <div className="font-normal flex gap-x-1">
                          <span className="font-bold">Penalty:</span>{" "}
                          <span>
                            {liquidities[
                              detail?.liquidation?.early_LiquidationPenalty
                            ] == "none" &&
                              liquidities[
                                detail?.liquidation?.early_LiquidationPenalty
                              ]}
                          </span>
                          <span>
                            {liquidities[
                              detail?.liquidation?.early_LiquidationPenalty
                            ] == "ForfietAll" && "Forfeit all accrued interest"}
                          </span>
                          <span>
                            {liquidities[
                              detail?.liquidation?.early_LiquidationPenalty
                            ] == "ForfietPortion" &&
                              `Forfeit a portion of accrued interest - ${detail?.liquidation?.early_LiquidationPenaltyPercentage}%`}
                          </span>
                          <span>
                            {liquidities[
                              detail?.liquidation?.early_LiquidationPenalty
                            ] == "RecalculateInterest" &&
                              `Recalculate accrued interest of ${detail?.liquidation?.eary_SpecialInterestRate}%`}
                          </span>
                          <span className="flex flex-wrap gap-x-1 my-1">
                            {liquidities[
                              detail?.liquidation?.early_LiquidationPenalty
                            ] == "TakeCharge" && (
                              <span>
                                {" "}
                                <span>
                                  {" "}
                                  Take a charge{" "}
                                  <span className="flex flex-wrap">
                                    {detail?.liquidation?.part_SpecificCharges?.map(
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
                      }
                    </span>
                  ) : (
                    "Not Applicable"
                  )}
                </div>
              </div>
              <div className=" flex gap-[54px]">
                <div className="w-[300px]   text-base font-medium text-[#636363]">
                  Principal withdrawal
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  {detail?.liquidation?.allowPrincipalWithdrawal ? (
                    <span className="font-normal block">Allow</span>
                  ) : (
                    "Not Applicable"
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <PreviewChargesAndTaxes detail={detail} type={type} />
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            {type === "term-deposit"
              ? "Account Entries"
              : "Product GL Mappings"}
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              {/* <div className="w-[300px]   text-base font-medium text-[#636363]">
                Principal Deposit
              </div> */}
              <div className="w-full text-base font-normal">
                {type === "term-deposit" ? (
                  <DebitCreditTable dataTab={detail?.productGlMappings} />
                ) : (
                  <MoneyDebitCreditTable
                    dataTab={detail?.moneyMarketProductGlMapping}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Generated Product Code
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363] uppercase">
                {detail?.productCode || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
