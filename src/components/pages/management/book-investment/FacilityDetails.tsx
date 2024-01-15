import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputDivs } from "@app/components/pages/term-deposit/forms/accounting-entries-and-events";
import AccountSearch from "@app/components/AccountSearch";
import MinMaxInput from "@app/components/forms/MinMaxInput";
import {
  CapitalizationOptions,
  CustomerCategory,
  FacilityDetailsModelSchema,
  Interval,
  ProductTypes,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import SearchInput from "@app/components/SearchInput";
import {
  useBookingCalcMutation,
  useGetPostProductsMutation,
  useGetProductDetailQuery,
} from "@app/api";
import BottomBarLoader from "@app/components/BottomBarLoader";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { BorderlessSelect } from "@app/components/forms";
import { AppContext } from "@app/utils";
export const onProceed = (data, proceed, formData, setFormData) => {
  setFormData({
    ...formData,
    facilityDetailsModel: data,
  });
  proceed();
};

type FacilityDetailsProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
  setDisabled?: any;
  isSavingDraft?: boolean;
  setProductDetail?: (e) => void;
  setCalcDetail?: (e) => void;
};

export const handleSearch = (
  value,
  data,
  setValue,
  setProductName,
  trigger
) => {
  if (data) {
    setValue("investmentProductId", data?.value);
    setValue("investmentProductName", data?.name);
    trigger("investmentProductId");
  }

  setProductName(value);
};
export default function FacilityDetails({
  formData,
  setFormData,
  proceed,
  setDisabled,
  isSavingDraft,
  setProductDetail,
  setCalcDetail,
}: FacilityDetailsProps) {
  const { currencies } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    setError,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(FacilityDetailsModelSchema),
    defaultValues: formData.facilityDetailsModel,
    mode: "all",
  });
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const values = getValues();

  const [
    getProduct,
    { data, isSuccess, isError, error, isLoading: searchLoading },
  ] = useGetPostProductsMutation();

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

  useEffect(() => {
    setCalcDetail(calcData?.data);
  }, [calcData, calcIsSuccess]);

  const {
    data: detail,
    isSuccess: detailIsSuccess,
    isError: detailIsError,
    error: detailError,
    isLoading: detailLoading,
  } = useGetProductDetailQuery(
    { id: values.investmentProductId },
    {
      skip: !values.investmentProductId,
    }
  );
  // Search product
  useEffect(() => {
    if (query.length) {
      getProduct({
        filter_by: "created_by_anyone",
        search: query,
        page_Size: 10000,
        status_In: [2],
      });
    }
  }, [query]);

  useEffect(() => {
    if (isSuccess) {
      setProductsData(
        data.results.map((i) => {
          return {
            id: i.id,
            name: i.productName,
            value: i.id,
          };
        })
      );
    }

    return () => {
      setProductsData([]);
    };
  }, [isError, isSuccess, searchLoading, data]);

  // Set product detail
  useEffect(() => {
    if (detailIsSuccess) {
      setProductDetail(detail?.data);
      setValue(
        "tenorMin",
        detail?.data?.pricingConfiguration?.applicableTenorMin
      );
      setValue(
        "tenorMax",
        detail?.data?.pricingConfiguration?.applicableTenorMax
      );
      setValue(
        "prinMin",
        detail?.data?.pricingConfiguration?.applicablePrincipalMin
      );
      setValue(
        "prinMax",
        detail?.data?.pricingConfiguration?.applicablePrincipalMax
      );

      const rangeArr =
        detail?.data?.pricingConfiguration?.interestRateConfigModels[0];
      if (rangeArr.length) {
        if (detail?.data?.pricingConfiguration?.interestRateRangeType === 0) {
          if (
            values.principal >= rangeArr.principalMin &&
            values.principal <= rangeArr.principalMax
          ) {
            setValue("intMin", rangeArr.min);
            setValue("intMax", rangeArr.max);
          }
        }

        if (detail?.data?.pricingConfiguration?.interestRateRangeType === 1) {
          if (
            values.tenor >= rangeArr.tenorMin &&
            values.tenor <= rangeArr.tenorMax
          ) {
            setValue("intMin", rangeArr.min);
            setValue("intMax", rangeArr.max);
          }
        }
      }

      if (detail?.data?.pricingConfiguration?.interestRateRangeType === 2) {
        setValue("intMin", detail?.data?.pricingConfiguration?.interestRateMin);
        setValue("intMax", detail?.data?.pricingConfiguration?.interestRateMax);
      }
    }

    return () => {
      setProductDetail([]);
    };
  }, [detailIsSuccess, detail]);

  useEffect(() => {
    if (!values.investmentProductId) {
      setProductDetail(null);
    }

    setDisabled(!isValid);
  }, [isValid, values]);

  useEffect(() => {
    if (detail?.data?.pricingConfiguration?.interestRateRangeType === 0) {
      detail?.data?.pricingConfiguration?.interestRateConfigModels?.forEach(
        (i) => {
          if (
            values.principal >= i.principalMin &&
            values.principal <= i.principalMax
          ) {
            setValue("intMin", i.min);
            setValue("intMax", i.max);
          }
        }
      );
    }
    if (detail?.data?.pricingConfiguration?.interestRateRangeType === 1) {
      detail?.data?.pricingConfiguration?.interestRateConfigModels?.forEach(
        (i) => {
          if (values.tenor >= i.tenorMin && values.tenor <= i.tenorMax) {
            setValue("intMin", i.min);
            setValue("intMax", i.max);
          }
        }
      );
    }
    if (detail?.data?.pricingConfiguration?.interestRateRangeType === 2) {
      setValue("intMin", detail?.data?.pricingConfiguration?.interestRateMin);
      setValue("intMax", detail?.data?.pricingConfiguration?.interestRateMax);
    }
    if ((values.tenor || values.principal) && values.interestRate) {
      trigger("interestRate");
    }

    if (
      detail?.data &&
      values.tenor &&
      values.principal &&
      values.interestRate
    ) {
      fetchRate()
    }
  }, [values.tenor, values.principal, values.interestRate, detail]);

  useEffect(() => {
    setFormData({
      ...formData,
      facilityDetailsModel: values,
    });
  }, [isSavingDraft]);

  useEffect(() => {
    if (
      detail?.data &&
      values.tenor &&
      values.principal &&
      values.interestRate
    ) {
      fetchRate();
    }
  }, [
    values.tenor,
    values.principal,
    values.interestRate,
    values?.capitalizationMethod,
  ]);

  const fetchRate = () => {
    bookingCalc({
      principal: values.principal,
      rate: values.interestRate,
      tenor: values.tenor,
      tenorUnit: detail?.data?.pricingConfiguration?.applicableTenorMaxUnit,
      method: values.capitalizationMethod,
    });
  };
  return (
    <form
      id="facilityDetails"
      data-testid="submit-button"
      onSubmit={handleSubmit((d) =>
        onProceed(d, proceed, formData, setFormData)
      )}
    >
      {" "}
      <div
        data-testid="facility-details"
        className="flex flex-col gap-4 px-[30px] py-5"
      >
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs
            label={"Investment product"}
            errors={errors}
            name="investmentProductId"
          >
            <div className="flex gap-[15px]">
              <div className=" w-[360px]">
                <SearchInput
                  setSearchTerm={(e) => {
                    setQuery(e);
                  }}
                  searchResults={productsData}
                  setSearchResults={() => {}}
                  searchLoading={searchLoading}
                  handleSearch={(value, data) =>
                    handleSearch(value, data, setValue, setProductName, trigger)
                  }
                  placeholder={"Search Investment Product"}
                  customClass="shadow-none"
                  hideBorder
                  defaultValue={
                    formData.facilityDetailsModel.investmentProductName
                  }
                />
              </div>
            </div>
          </InputDivs>

          {detailLoading && (
            <div className="p-7 flex justify-center items-center w-full">
              <BottomBarLoader />
            </div>
          )}
          {!detailLoading && values.investmentProductId && (
            <div className="flex flex-col items-start gap-y-5">
              <InputDivs
                label={"Investment product category"}
                isCompulsory={false}
              >
                <div className="flex gap-[15px]">
                  <div className=" ">
                    <span className="text-base font-normal text-[#636363] capitalize">
                      {
                        // CustomerCategory[
                        //   detail?.data?.customerEligibility?.customerCategory
                        // ]
                        ProductTypes.find(
                          (n) => n.id === detail?.data?.productType
                        )?.name
                      }
                    </span>
                  </div>
                </div>
              </InputDivs>
              <InputDivs
                label={"Investment purpose"}
                isCompulsory={false}
                errors={errors}
                name="investmentPurpose"
                divClass={"!items-start"}
              >
                <div className="relative w-full">
                  <textarea
                    {...register("investmentPurpose", {
                      maxLength: 360,
                    })}
                    defaultValue={
                      formData?.facilityDetailsModel.investmentPurpose
                    }
                    id="investmentPurpose"
                    data-testid="investmentPurpose"
                    placeholder="Enter Investment Purpose"
                    maxLength={250}
                    className={`w-[360px]  min-h-[150px] rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none `}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Tenor"}>
                <div className="flex gap-[15px]">
                  <div className=" w-[360px]">
                    <div className="flex items-center w-full gap-[15px] justify-between">
                      <MinMaxInput
                        inputName="tenor"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        trigger={trigger}
                        clearErrors={clearErrors}
                        defaultValue={formData?.facilityDetailsModel.tenor}
                        type="number"
                      />
                      <span className="text-base font-normal text-[#636363] capitalize">
                        {
                          Interval[
                            detail?.data?.pricingConfiguration
                              ?.applicableTenorMaxUnit
                          ]
                        }
                      </span>
                    </div>
                    <div className="text-sm text-[#AAAAAA] mt-1">
                      {detail?.data?.pricingConfiguration
                        ?.interestRateRangeType === 2 && (
                        <span>
                          {
                            detail?.data?.pricingConfiguration
                              ?.applicableTenorMin
                          }{" "}
                          -{" "}
                          {
                            detail?.data?.pricingConfiguration
                              ?.applicableTenorMax
                          }{" "}
                          {
                            Interval[
                              detail?.data?.pricingConfiguration
                                ?.applicableTenorMaxUnit
                            ]
                          }
                        </span>
                      )}
                      {detail?.data?.pricingConfiguration
                        ?.interestRateRangeType !== 2 && (
                        <span>
                          {
                            detail?.data?.pricingConfiguration
                              ?.applicableTenorMin
                          }{" "}
                          -{" "}
                          {
                            detail?.data?.pricingConfiguration
                              ?.applicableTenorMax
                          }{" "}
                          {
                            Interval[
                              detail?.data?.pricingConfiguration
                                ?.applicableTenorMaxUnit
                            ]
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </InputDivs>
              <InputDivs label={"Principal"}>
                <div className="flex gap-[15px]">
                  <div className=" w-[360px]">
                    <MinMaxInput
                      currency={handleCurrencyName(
                        detail?.data?.productInfo?.currency,
                        currencies
                      )}
                      isCurrency
                      inputName="principal"
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      trigger={trigger}
                      clearErrors={clearErrors}
                      defaultValue={formData?.facilityDetailsModel.principal}
                    />
                    <div className="text-sm text-[#AAAAAA] mt-1">
                      <span>
                        {currencyFormatter(
                          detail?.data?.pricingConfiguration
                            ?.applicablePrincipalMin,
                          handleCurrencyName(
                            detail?.data?.productInfo?.currency,
                            currencies
                          )
                        )}{" "}
                        -{" "}
                        {currencyFormatter(
                          detail?.data?.pricingConfiguration
                            ?.applicablePrincipalMax,

                          handleCurrencyName(
                            detail?.data?.productInfo?.currency,
                            currencies
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </InputDivs>
              <InputDivs label={"Interest rate"}>
                <div className="flex gap-[15px]">
                  <div className=" w-[360px]">
                    <MinMaxInput
                      isCurrency
                      disablegroupseparators
                      isPercent
                      max={100}
                      inputName="interestRate"
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      trigger={trigger}
                      clearErrors={clearErrors}
                      defaultValue={formData?.facilityDetailsModel.interestRate}
                    />
                    <div className="text-sm text-[#AAAAAA] mt-1">
                      {detail?.data?.pricingConfiguration
                        ?.interestRateRangeType === 2 ? (
                        <span>
                          {detail?.data?.pricingConfiguration?.interestRateMin}{" "}
                          -{" "}
                          {detail?.data?.pricingConfiguration?.interestRateMax}%{" "}
                          per annum
                        </span>
                      ) : (
                        <span>
                          {detail?.data?.pricingConfiguration?.interestRateConfigModels?.map(
                            (i, idx) => (
                              <div key={idx}>
                                {detail?.data?.pricingConfiguration
                                  ?.interestRateRangeType === 0 ? (
                                  <span>
                                    {" "}
                                    {i?.min} - {i?.max}%{" "}
                                    {"for principal between "}
                                    {currencyFormatter(
                                      i?.principalMin,
                                      handleCurrencyName(
                                        detail?.data?.productInfo?.currency,
                                        currencies
                                      )
                                    )}{" "}
                                    -
                                    {currencyFormatter(
                                      i?.principalMax,
                                      handleCurrencyName(
                                        detail?.data?.productInfo?.currency,
                                        currencies
                                      )
                                    )}
                                  </span>
                                ) : (
                                  <span>
                                    {" "}
                                    {i?.min} - {i?.max}% {"for tenor betweeen"}{" "}
                                    {i?.tenorMin} - {i?.tenorMax}{" "}
                                    {Interval[i?.tenorMaxUnit]}
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </InputDivs>
              <InputDivs label={"Interest Capitalization Method"}>
                <div className="flex gap-[15px]">
                  <div className="w-[300px]">
                    <BorderlessSelect
                      inputError={errors?.capitalizationMethod}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      inputName={"capitalizationMethod"}
                      labelName={""}
                      defaultValue={
                        formData?.facilityDetailsModel?.capitalizationMethod
                      }
                      placeholder="Select currency"
                      clearErrors={clearErrors}
                      options={CapitalizationOptions}
                      trigger={trigger}
                    />
                  </div>
                </div>
              </InputDivs>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
