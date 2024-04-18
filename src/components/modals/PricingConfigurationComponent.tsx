import { Interval } from "@app/constants";
import { AppContext } from "@app/utils";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { Fragment, useContext } from "react";

export default ({ productData }) => {
  const { currencies } = useContext(AppContext);
  return (
    <Fragment>
      {productData?.data?.pricingConfiguration.interestRateRangeType == 0 && (
        <div className="flex flex-col">
          {productData?.data?.pricingConfiguration.interestRateConfigModels?.map(
            (configModel, index) => (
              <p
                key={index}
                data-testid="principal"
                className="block  mb-2 text-[#636363]"
              >
                {" "}
                {`${configModel.min} - ${configModel.max}%`} for principal
                between{" "}
                {`${currencyFormatter(
                  configModel.principalMin,
                  productData?.data?.productInfo?.currencyCode
                )} - ${currencyFormatter(
                  configModel.principalMax,
                  productData?.data?.productInfo?.currencyCode
                )}`}{" "}
              </p>
            )
          )}
        </div>
      )}

      {productData?.data?.pricingConfiguration.interestRateRangeType == 1 && (
        <div className="flex flex-col">
          {productData?.data?.pricingConfiguration.interestRateConfigModels?.map(
            (configModel, index) => (
              <p key={index} className="block  mb-2 text-[#636363]">
                {" "}
                {`${configModel.min} - ${configModel.max}%`} for tenor between{" "}
                {`${configModel.tenorMin} ${
                  Interval[configModel.tenorMinUnit]
                } - ${configModel.tenorMax} ${
                  Interval[configModel.tenorMaxUnit]
                }`}{" "}
              </p>
            )
          )}
        </div>
      )}
      {productData?.data?.pricingConfiguration.interestRateRangeType == 2 && (
        <div className="flex flex-col">
          <p className="block  mb-2 text-[#636363]">
            {" "}
            {`${productData?.data?.pricingConfiguration.interestRateMin} - ${productData?.data?.pricingConfiguration.interestRateMax}%`}
          </p>
        </div>
      )}
    </Fragment>
  );
};
