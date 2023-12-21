import { Interval } from "@app/constants"
import { currencyFormatter } from "@app/utils/formatCurrency"
import { getCurrencyName } from "@app/utils/getCurrencyName"
import { Fragment } from "react"

export default ({productData}) => {
    return (
        <Fragment>
            {productData?.data?.pricingConfiguration.interestRateRangeType ==
                0 && (
                    <div className="flex flex-col">
                        {productData?.data?.pricingConfiguration.interestRateConfigModels?.map(
                            (configModel, index) => (
                                <span key={index} className="block  mb-2 text-[#636363]">
                                    {" "}
                                    {`${configModel.min} - ${configModel.max}%`} for
                                    principal between{" "}
                                    {`${currencyFormatter(
                                        configModel.principalMin,
                                        getCurrencyName(productData?.data?.productInfo?.currency)
                                    )} - ${currencyFormatter(
                                        configModel.principalMax,
                                        getCurrencyName(productData?.data?.productInfo?.currency)
                                    )}`}{" "}
                                </span>
                            )
                        )}
                    </div>
                )}

            {productData?.data?.pricingConfiguration.interestRateRangeType ==
                1 && (
                    <div className="flex flex-col">
                        {productData?.data?.pricingConfiguration.interestRateConfigModels?.map(
                            (configModel, index) => (
                                <span key={index} className="block  mb-2 text-[#636363]">
                                    {" "}
                                    {`${configModel.min} - ${configModel.max}%`} for tenor
                                    between{" "}
                                    {`${configModel.tenorMin} ${Interval[configModel.tenorMinUnit]
                                        } - ${configModel.tenorMax} ${Interval[configModel.tenorMaxUnit]
                                        }`}{" "}
                                </span>
                            )
                        )}
                    </div>
                )}
            {productData?.data?.pricingConfiguration.interestRateRangeType ==
                2 && (
                    <div className="flex flex-col">
                        <span className="block  mb-2 text-[#636363]">
                            {" "}
                            {`${productData?.data?.pricingConfiguration.interestRateMin} - ${productData?.data?.pricingConfiguration.interestRateMax}%`}
                        </span>
                    </div>
                )}
        </Fragment>
    )
}