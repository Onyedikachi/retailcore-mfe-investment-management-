import { currencyFormatter } from "@app/utils/formatCurrency"
import { handleCurrencyName } from "@app/utils/handleCurrencyName"
import { Fragment, useContext } from "react"
import {
    CustomerCategory,
    Interval,
    ProductTypes,
    liquidities,
} from "@app/constants";
import { AppContext } from "@app/utils";

export default ({ productData, setOpen }) => {
    const { currencies } = useContext(AppContext);
    return (
        <div className="border border-[#E5E9EB] rounded-lg py-[25px] px-[30px] h-[593px]">
            <div className="pr-[30px] h-full gap-y-[35px] overflow-y-auto flex flex-col">
                <div className="">
                    <span className="font-bold block mb-[15px]">
                        Applicable Tenor
                    </span>
                    <span className="font-normal block">
                        {`${productData?.data?.pricingConfiguration
                            ?.applicableTenorMin
                            } ${Interval[
                            productData?.data?.pricingConfiguration
                                ?.applicableTenorMinUnit
                            ]
                            }`}{" "}
                        -{" "}
                        {`${productData?.data?.pricingConfiguration
                            ?.applicableTenorMax
                            } ${Interval[
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
                            handleCurrencyName(productData?.data?.productInfo.currency,currencies)
                        )}{" "}
                        {productData?.data?.pricingConfiguration
                            ?.applicablePrincipalMax
                            ? `- ${currencyFormatter(
                                productData?.data?.pricingConfiguration
                                    ?.applicablePrincipalMax,
                                handleCurrencyName(productData?.data?.productInfo?.currency,currencies)
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
                                                className={`${index !== 0 && "hidden"
                                                    } block  mb-2 text-[#636363]`}
                                            >
                                                {" "}
                                                {`${configModel.min} - ${configModel.max}%`} for
                                                principal between{" "}
                                                {`${currencyFormatter(
                                                    configModel.principalMin,
                                                    handleCurrencyName(productData?.data?.productInfo?.currency,currencies)
                                                )} - ${currencyFormatter(
                                                    configModel.principalMax,
                                                    handleCurrencyName(productData?.data?.productInfo?.currency,currencies)
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
                                                data-testid={"interest-rate-config-model"}
                                                className={`${index !== 0 && "hidden"
                                                    } block  mb-2 text-[#636363]`}
                                            >
                                                {" "}
                                                {`${configModel.min} - ${configModel.max}%`} for
                                                tenor between{" "}
                                                {`${configModel.tenorMin} ${Interval[configModel.tenorMinUnit]
                                                    } - ${configModel.tenorMax} ${Interval[configModel.tenorMaxUnit]
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
    )
}