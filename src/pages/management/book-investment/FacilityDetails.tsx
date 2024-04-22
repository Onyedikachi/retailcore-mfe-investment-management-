import { useCalcTotalConsiderationMutation } from "@app/api";
import { DropDown } from "@app/components";
import {
  BorderlessSelect,
  FormDate,
  MinMaxInput,
  RedDot,
} from "@app/components/forms";
import { InputDivs } from "@app/components/forms/SideLabelSearchSelect";
import { InputDiv } from "@app/components/pages/term-deposit/forms/product-information";
import {
  FacilityDetailsModelSchema,
  FacilityDetailsModelSchema2,
  categoryOptions,
  CapitalizationOptions,
  interestComputationDaysOptions,
  intervalOptions,
} from "@app/constants";
import { AppContext } from "@app/utils";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const onProceed = (
  data,
  proceed,
  formData,
  setFormData,
  preModifyRequest
) => {
  preModifyRequest({
    ...formData,
    facilityDetailsModel: { ...formData.facilityDetailsModel, ...data },
    isDraft: true,
  });
  setFormData({
    ...formData,
    facilityDetailsModel: { ...formData.facilityDetailsModel, ...data },
  });
  proceed();
};

export default ({
  formData,
  setFormData,
  proceed,
  setDisabled,
  isSavingDraft,
  productDetail,
  setProductDetail,
  detailLoading,
  preModifyRequest,
}) => {
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
    resolver: yupResolver(FacilityDetailsModelSchema2),
    defaultValues: formData.facilityDetailsModel,
    mode: "all",
  });

  const { currencies, defaultCurrency } = useContext(AppContext);
  console.log("🚀 ~ errors:", errors);
  useEffect(() => {
    setValue("currencyCode", defaultCurrency?.abbreviation);
  }, [defaultCurrency]);
  const values = getValues();
  console.log("🚀 ~ values:", values);
  const [calcTotal, { data, isSuccess, isLoading }] =
    useCalcTotalConsiderationMutation();

  const productCategoryOptions = [
    {
      id: 1,
      text: "Bonds",
      value: 3,
    },

    {
      id: 2,
      text: "Commercial Paper",
      value: 2,
    },
    {
      id: 3,
      text: "Treasury Bills",
      value: 1,
    },
  ];

  useEffect(() => {
    setDisabled(!isValid);
    if (isValid) {
      setFormData({
        ...formData,
        facilityDetailsModel: values,
      });
    }
  }, [isValid, () => values]);

  useEffect(() => {
    if (!values.faceValue || !values.discountRate) return;
    let data = {
      discountRate: values.discountRate,
      faceValue: values.faceValue,
    };
    setTimeout(() => {
      calcTotal(data);
    }, 1200);
  }, [values.discountRate, values.faceValue]);

  useEffect(() => {
    if (isSuccess) {
      setValue("totalConsideration", data.data);
    }
  }, [isSuccess, data, isLoading]);
  return (
    <form
      id="facilityDetails"
      data-testid="submit-button"
      onSubmit={handleSubmit((d) => {
        onProceed(d, proceed, formData, setFormData, preModifyRequest);
      })}
    >
      <div
        data-testid="facility-details"
        className="flex flex-col gap-4 px-[30px] py-5"
      >
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs label={"Investment product"}>
            <div className="flex gap-[15px]">
              <BorderlessSelect
                inputError={errors?.moneyMarketCategory}
                register={register}
                errors={errors}
                setValue={setValue}
                inputName={"moneyMarketCategory"}
                labelName={""}
                defaultValue={values?.moneyMarketCategory}
                placeholder="Select Category"
                clearErrors={clearErrors}
                options={productCategoryOptions}
                trigger={trigger}
              />
            </div>
          </InputDivs>
          {values?.moneyMarketCategory && (
            <Fragment>
              <InputDivs label={"issuer"}>
                <div className="relative flex items-center max-w-full">
                  <input
                    id="issuer"
                    data-testid="issuer"
                    onChange={(e) => setValue("issuer", e.target.value)}
                    {...register("issuer")}
                    className={`placeholder-[#BCBBBB] ring-0 outline-none min-w-[300px] w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] placeholder:text-[#BCBBBB]`}
                    placeholder="Enter Name"
                    defaultValue={values.issuer}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Description"}>
                <InputDiv>
                  <div className="relative w-full min-w-[300px]">
                    <textarea
                      id="description"
                      data-testid="product-description"
                      placeholder="Enter description"
                      maxLength={250}
                      {...register("description", {
                        maxLength: 250,
                      })}
                      defaultValue={values?.description}
                      className={`min-h-[150px] w-full rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none ${
                        errors?.description
                          ? "border-red-500 ring-1 ring-red-500"
                          : ""
                      }`}
                    />

                    <span className="absolute bottom-4 right-2 text-xs text-[#8F8F8F] flex items-center gap-x-1">
                      <span>{watch("description")?.length || 0}</span>/
                      <span>250</span>
                    </span>
                  </div>
                  {errors?.description && (
                    <span className="text-sm text-danger-500">
                      {errors?.description?.message}
                    </span>
                  )}
                </InputDiv>
              </InputDivs>
              <InputDivs label={"Deal Date"}>
                <InputDiv>
                  <FormDate
                    id="dealDate"
                    className="w-full min-w-[300px]"
                    register={register}
                    inputName={"dealDate"}
                    errors={errors}
                    handleChange={(value) => {
                      setValue("dealDate", value);
                    }}
                    defaultValue={values?.dealDate}
                    minDate={new Date()}
                    trigger={trigger}
                    clearErrors={clearErrors}
                  />
                </InputDiv>
              </InputDivs>
              <InputDivs label={"Maturity Date"}>
                <InputDiv>
                  <FormDate
                    id="maturityDate"
                    className="w-full min-w-[300px]"
                    register={register}
                    inputName={"maturityDate"}
                    errors={errors}
                    handleChange={(value) => {
                      setValue("maturityDate", value);
                    }}
                    defaultValue={values?.maturityDate}
                    minDate={values?.dealDate}
                    trigger={trigger}
                    clearErrors={clearErrors}
                  />
                </InputDiv>
              </InputDivs>

              <InputDivs label={"Currency"}>
                <div className="w-[300px]">
                  <BorderlessSelect
                    inputError={errors?.currencyCode}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputName={"currencyCode"}
                    defaultValue={values?.currencyCode}
                    placeholder="Select currency"
                    clearErrors={clearErrors}
                    options={currencies.map((i) => ({ ...i, value: i.text }))}
                    trigger={trigger}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Discount Rate"}>
                <InputDiv customClass="w-full min-w-[300px] ">
                  <MinMaxInput
                    className="w-[300px]"
                    label={""}
                    // currency={values?.currencyCode}
                    register={register}
                    inputName={"discountRate"}
                    placeholder="Enter Rate"
                    defaultValue={values?.discountRate}
                    errors={errors}
                    setValue={setValue}
                    trigger={trigger}
                    clearErrors={clearErrors}
                    isPercent
                    isCurrency
                    max={100}
                  />
                </InputDiv>
              </InputDivs>
              <InputDivs label="Per Amount">
                <InputDiv customClass="w-full min-w-[300px]">
                  <MinMaxInput
                    className="w-[300px]"
                    label={""}
                    currency={values?.currencyCode}
                    register={register}
                    inputName={"perAmount"}
                    placeholder="Enter Rate"
                    defaultValue={values?.perAmount}
                    errors={errors}
                    setValue={setValue}
                    trigger={trigger}
                    clearErrors={clearErrors}
                    isCurrency
                  />
                </InputDiv>
              </InputDivs>
              <InputDivs label="Face Value">
                <InputDiv customClass="w-full min-w-[300px]">
                  <MinMaxInput
                    className="w-[300px]"
                    label={""}
                    currency={values?.currencyCode}
                    register={register}
                    inputName={"faceValue"}
                    placeholder="Enter Rate"
                    defaultValue={values?.faceValue}
                    errors={errors}
                    setValue={setValue}
                    trigger={trigger}
                    clearErrors={clearErrors}
                    isCurrency
                  />
                </InputDiv>
              </InputDivs>
              <InputDivs label="Total Consideration">
                <InputDiv customClass="w-full min-w-[300px]">
                  <MinMaxInput
                    className="w-[300px]"
                    label={""}
                    currency={values?.currencyCode}
                    register={register}
                    inputName={"totalConsideration"}
                    placeholder={
                      isLoading ? "Calculating value ..." : "Enter Rate"
                    }
                    defaultValue={values?.totalConsideration}
                    errors={errors}
                    setValue={setValue}
                    trigger={trigger}
                    clearErrors={clearErrors}
                    isCurrency
                    disabled
                  />
                </InputDiv>
              </InputDivs>
              <InputDivs
                label={`Interest Computation  Days in Years Method`}
                customClass="max-w-[250px]"
              >
                <div className="w-[300px]">
                  <BorderlessSelect
                    inputError={errors?.interestComputationMethod}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputName={"interestComputationMethod"}
                    defaultValue={values?.interestComputationMethod}
                    placeholder="Select"
                    clearErrors={clearErrors}
                    options={interestComputationDaysOptions}
                    trigger={trigger}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Interest Capitalization Method"}>
                <div className="w-[300px]">
                  <BorderlessSelect
                    inputError={errors?.capitalizationMethod}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputName={"capitalizationMethod"}
                    defaultValue={values?.capitalizationMethod}
                    placeholder="Select"
                    clearErrors={clearErrors}
                    options={CapitalizationOptions}
                    trigger={trigger}
                  />
                </div>
              </InputDivs>
              {values.capitalizationMethod === 1 && (
                <InputDivs label={"Specify Interval"}>
                  <div className="w-[300px]">
                    <BorderlessSelect
                      inputError={errors?.securityPurchaseIntervals}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      inputName={"securityPurchaseIntervals"}
                      defaultValue={values?.securityPurchaseIntervals}
                      placeholder="Select"
                      clearErrors={clearErrors}
                      requiredField={false}
                      required={false}
                      options={intervalOptions}
                      trigger={trigger}
                    />
                  </div>
                </InputDivs>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </form>
  );
};
