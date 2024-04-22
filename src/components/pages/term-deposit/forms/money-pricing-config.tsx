import React, { useContext, useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { IoMdAddCircle } from "react-icons/io";
import { MinMaxInput } from "@app/components/forms";
import { BorderlessSelect } from "@app/components/forms";
import {
  IntervalOptions,
  interestComputationDaysOptions,
  VaryOptions,
} from "@app/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pricingConfigSchema } from "@app/constants";
import { FormToolTip } from "@app/components";
import { toolTips } from "@app/constants";
import { RedDot } from "@app/components/forms";
import { useParams } from "react-router-dom";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { AppContext } from "@app/utils";

const labels = [
  "Applicable Tenor",
  "Applicable Principal",
  "Applicable Interest Rate Range (Per Annum)",
];

export function validateSlab(values, type, principalMax, tenorMax) {
  const lastSlab =
    values.interestRateConfigModels[values.interestRateConfigModels.length - 1];

  if (parseInt(type, 10) === 0) {
    return lastSlab?.principalMax === principalMax;
  }
  if (parseInt(type, 10) === 1) {
    return lastSlab?.tenorMax === tenorMax;
  }
  if (parseInt(type, 10) === 2) {
    return true;
  }
  return false;
}
export function InputDivs({ children, label, requiredField = true }) {
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="flex  gap-2 min-w-[360px]">
        {" "}
        <label className=" flex text-base font-medium text-[#636363]">
          {label}
          <span className="flex"> {requiredField && <RedDot />}</span>
        </label>
        {label == labels[0] && <FormToolTip tip={toolTips.applicableTenor} />}
        {label == labels[1] && (
          <FormToolTip tip={toolTips.applicablePrincipal} />
        )}
        {label == labels[2] && (
          <FormToolTip tip={toolTips.applicableInterestRange} />
        )}
      </div>

      <div className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-6 py-5 flex flex-col gap-5 ">
        {children}
      </div>
    </div>
  );
}
export default function MoneyPricingConfig({
  proceed,
  formData,
  setFormData,
  setDisabled,
  productData,
  initiateDraft,
}) {
  const { currencies } = useContext(AppContext);
  const { process } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    control,
    setError,
    getValues,
    trigger,
    resetField,
    formState: { errors, isValid, touchedFields, dirtyFields },
  } = useForm({
    resolver: yupResolver(pricingConfigSchema),
    defaultValues: formData,
  });

  const {
    fields: interestRateConfigModels,
    append,
    remove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "interestRateConfigModels", // unique name for your Field Array
  });

  const addField = () => {
    append({
      index: interestRateConfigModels.length,
      min: 0,
      max: null,
      principalMin: 0,
      principalMax: null,
      tenorMin: 0,
      tenorMinUnit: 1,
      tenorMax: null,
      tenorMaxUnit: 1,
    });
  };

  const removeField = (index) => {
    remove(index);
  };

  // Watch tenor
  const watchinterestRateRangeType = watch("interestRateRangeType");

  const watchApplicableTenorMin = watch("applicableTenorMin");
  const watchApplicableTenorMinUnit = watch("applicableTenorMinUnit");
  const watchApplicableTenorMax = watch("applicableTenorMax");
  const watchApplicableTenorMaxUnit = watch("applicableTenorMaxUnit");

  function onProceed(d: any) {
    setFormData({ ...d });
    proceed();
  }

  useEffect(() => {
    if (watchApplicableTenorMax > 0) {
      trigger("applicableTenorMin");
      trigger("applicableTenorMax");
    }
  }, [
    watchApplicableTenorMin,
    watchApplicableTenorMinUnit,
    watchApplicableTenorMax,
    watchApplicableTenorMaxUnit,
  ]);

  // watch principal
  const watchApplicablePrincipalMin = watch("applicablePrincipalMin");
  const watchApplicablePrincipalMax = watch("applicablePrincipalMax");

  useEffect(() => {
    if (watchApplicablePrincipalMax > 0) {
      trigger("applicablePrincipalMin");
      trigger("applicablePrincipalMax");
    }
  }, [watchApplicablePrincipalMax, watchApplicablePrincipalMin]);

  // watch interest rate
  const watchInterestRateMin = watch("interestRateMin");
  const watchInterestRateMax = watch("interestRateMax");
  useEffect(() => {
    if (
      watchInterestRateMin > 0 &&
      parseInt(watchinterestRateRangeType, 10) === 2
    ) {
      trigger("interestRateMax");
      trigger("interestRateMin");
    }
  }, [watchInterestRateMax, watchInterestRateMin]);

  useEffect(() => {
    register("interestRateMax");
    register("interestRateMin");
    resetField("interestRateMax", { keepError: false });
    resetField("interestRateMin", { keepError: false });
  }, [watchinterestRateRangeType]);

  const values = getValues();

  useEffect(() => {
    if (
      validateSlab(
        values,
        watchinterestRateRangeType,
        watchApplicablePrincipalMax,
        watchApplicableTenorMax
      )
    ) {
      setDisabled(!isValid);
    } else {
      setDisabled(true);
    }
  }, [values]);

  useEffect(() => {
    if (formData) {
      Object.entries(formData).forEach(([name, value]) =>
        setValue(name, value)
      );
      if (
        process === "continue" ||
        process === "modify" ||
        process === "withdraw_modify" ||
        process === "clone"
      ) {
        trigger();
      }
    }
  }, [setValue, formData]);
  useEffect(() => {
    if (initiateDraft) {
      setFormData({ ...values });
    }
  }, [initiateDraft]);
  return (
    <form id="customereligibilitycriteria" onSubmit={handleSubmit(onProceed)}>
      <div className="flex flex-col gap-10 max-w-[860px]">
        <div className="grid grid-cols-2 gap-x-[48px] gap-y-[36px] ">
          <div className="">
            <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
              <span>
                {" "}
                Applicable Face Value <RedDot />
              </span>
              <FormToolTip tip={toolTips.interestComputation} />
            </div>
            <MinMaxInput
              className="w-[360px]"
              label={""}
              currency={productData?.productInfo?.currencyCode}
              register={register}
              inputName={"applicablePrincipalMin"}
              defaultValue={formData?.applicablePrincipalMin}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              isCurrency
            />
          </div>{" "}
          <div className="">
            <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
              <span>
                {" "}
                Consideration <RedDot />
              </span>
              <FormToolTip tip={toolTips.interestComputation} />
            </div>
            <MinMaxInput
              className="w-[360px]"
              label={""}
              currency={productData?.productInfo?.currencyCode}
              register={register}
              inputName={"applicablePrincipalMax"}
              defaultValue={formData?.applicablePrincipalMax}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              isCurrency
            />
          </div>
          <div className="">
            <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
              <span>
                {" "}
                Discount rate <RedDot />
              </span>
              <FormToolTip tip={toolTips.interestComputation} />
            </div>
            <MinMaxInput
              className="w-[360px]"
              label={""}
              register={register}
              inputName={`interestRateMin`}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              defaultValue={formData?.interestRateMin}
              clearErrors={clearErrors}
              max={100}
              isPercent
              isCurrency
              disablegroupseparators

              // defaultValue={range.min}
            />
          </div>{" "}
          <div className="">
            <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
              <span>
                {" "}
                Per amount <RedDot />
              </span>
              <FormToolTip tip={toolTips.interestComputation} />
            </div>
            <MinMaxInput
              className="w-[360px]"
              label={""}
              currency={productData?.productInfo?.currencyCode}
              register={register}
              inputName={"applicablePrincipalMax"}
              defaultValue={formData?.applicablePrincipalMax}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              isCurrency
            />
          </div>
        </div>

        <div className="">
          <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
            <span>
              {" "}
              Interest Computation Days in Year Method <RedDot />
            </span>
            {/* <FormToolTip tip={toolTips.interestComputation} /> */}
            <Tooltip
              theme="light"
              distance={20}
              size="small"
              arrow
              className="bg-white max-w-[320px]"
              html={
                <div className="text-left text-xs  max-w-[320px]">
                  <p>
                    <span className="font-semibold">30E/360:</span> Counts the
                    days from the calendar, but also introduces some changes on
                    the months with 31 and 28 days.
                  </p>
                  <p>
                    <span className="font-semibold"> Actual/360:</span> Computes
                    the interest daily by counting the number of days in the
                    calendar, but using a fixed 360-day year length.
                  </p>
                  <p>
                    <span className="font-semibold"> Actual/365:</span>{" "}
                    Calculates the interest daily by counting the number of days
                    in the calendar and using a fixed 365-day year length
                  </p>
                </div>
              }
            >
              <div className="w-[18px] h-[18px] text-[#636363]">
                <ImInfo />
              </div>
            </Tooltip>
          </div>

          <div className="w-[360px]">
            <BorderlessSelect
              inputError={errors?.interestComputationMethod}
              inputName={"interestComputationMethod"}
              options={interestComputationDaysOptions}
              defaultValue={formData?.interestComputationMethod}
              errors={errors}
              trigger={trigger}
              clearErrors={clearErrors}
              setValue={() => {}}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
