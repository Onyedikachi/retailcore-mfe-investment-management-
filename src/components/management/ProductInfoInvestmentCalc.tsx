import { Interval } from "@app/constants";
import { AppContext } from "@app/utils";
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

export default function ProductInfoInvestmentCalc({ productDetail }) {
  const { currencies } = useContext(AppContext);
  const [productDetailMap, setProductDetailMap] = useState(null);
  const [active, setActive] = useState([]);

  const toggleTab = (val) => {
    setActive((prevActive) => {
      if (prevActive.includes(val)) {
        return prevActive.filter((i) => i !== val);
      } else {
        return [...prevActive, val];
      }
    });
  };
  console.log("🚀 ~ ProductInfoInvestmentCalc ~ productDetail:", productDetail);
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
          },
        ],
        isOpen: false,
      },
      {
        name: "Customer Eligibility Criteria",
        data: productDetail?.customerEligibility?.requireDocument,
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
          },
        ],
        isOpen: false,
      },
      {
        name: "Early & Part Liquidation Configuration",
        data: [],
        isOpen: false,
      },
      {
        name: "Charges & Taxes Configuration",
        data: [],
        isOpen: false,
      },
    ]);
  }, [productDetail]);

  return (
    <div className="flex flex-col max-w-[377px] w-full gap-[17px]">
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
                    {item.name !== "Customer Eligibility Criteria" ? (
                      <div className="grid grid-cols-1 gap-y-1">
                        {item?.data?.map((k) => (
                          <div
                            key={k?.name}
                            className="grid grid-cols-2 gap-x-3  text-sm pl-5"
                          >
                            <span>{k?.name}</span>
                            <span>{k?.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-y-1">
                        {item?.data?.map((k) => (
                          <div
                            key={k?.name}
                            className="grid grid-cols-1 gap-y-1  text-sm pl-5"
                          >
                            <span>{k?.name}</span>
                          </div>
                        ))}
                      </div>
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

        <div className="flex flex-col gap-6 px-6 py-[36px]">
          <div className="flex flex-col ">
            <span className="text-[#636363] font-medium text-base">
              Value at Maturity
            </span>
            <span className="">-</span>
          </div>
          <div className="flex flex-col ">
            <span className="text-[#636363] font-medium text-base">
              Maturity Date
            </span>
            <span className="">-</span>
          </div>
        </div>
      </div>
    </div>
  );
}
