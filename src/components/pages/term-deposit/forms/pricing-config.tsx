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
      <div className="flex  gap-2 min-w-[300px]">
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
export default function PricingConfig({
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

  // watch principal
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
    <form id="pricingconfig" onSubmit={handleSubmit(onProceed)}>
      <div className="flex flex-col gap-10">
        <InputDivs label={labels[0]}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <div className="w-[200px]">
                <MinMaxInput
                  label={"Min"}
                  register={register}
                  inputName={"applicableTenorMin"}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  defaultValue={formData?.applicableTenorMin}
                  type="number"
                />
              </div>
              <div className="w-[200px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMinUnit}
                  register={register}
                  inputName={"applicableTenorMinUnit"}
                  defaultValue={formData?.applicableTenorMinUnit}
                  options={IntervalOptions}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  placeholder="Select duration"
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <div className="w-[180px]">
                <MinMaxInput
                  label={"Max"}
                  register={register}
                  inputName={"applicableTenorMax"}
                  defaultValue={formData?.applicableTenorMax}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  type="number"
                />
              </div>

              <div className="w-[180px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxUnit}
                  register={register}
                  inputName={"applicableTenorMaxUnit"}
                  defaultValue={formData?.applicableTenorMaxUnit}
                  options={IntervalOptions}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  placeholder="Select duration"
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={labels[1]}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[300px]"
                label={"Min"}
                currency={handleCurrencyName(
                  productData?.productInfo?.currency,
                  currencies
                )}
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
            -
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[300px]"
                label={"Max"}
                currency={handleCurrencyName(
                  productData?.productInfo?.currency,
                  currencies
                )}
                register={register}
                inputName={"applicablePrincipalMax"}
                defaultValue={formData?.applicablePrincipalMax}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
                isCurrency
              />
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={labels[2]}>
          <div className="flex gap-[51px] mb-[10px]">
            {/* <span>RangeEnum: {interestRateRangeType}</span> */}
            {VaryOptions.map(
              (varyOption: { id: string; value: number; title: string }) => (
                <div key={varyOption.id} className="flex items-center">
                  <input
                    id={varyOption.id}
                    name="interestRateRangeType"
                    type="radio"
                    value={Number(varyOption.value)}
                    onChange={(e) =>
                      setValue("interestRateRangeType", Number(e.target.value))
                    }
                    checked={
                      getValues("interestRateRangeType") === varyOption.value
                    }
                    className="h-4 w-4 border-gray-300 accent-sterling-red-800"
                  />
                  <label
                    htmlFor={varyOption.id}
                    className="ml-3 block text-base font-medium leading-6 text-[#636363]"
                  >
                    {varyOption.title}
                  </label>
                </div>
              )
            )}
          </div>
          {parseInt(watchinterestRateRangeType, 10) !== 2 && (
            <div>
              {interestRateConfigModels.map((range, index) => (
                <div
                  className="flex items-center gap-6 mt-[14px]"
                  key={range.id}
                >
                  {/* <span>{JSON.stringify(range)}</span> */}
                  <div className="flex items-center gap-[25px] ">
                    <div className="flex items-center gap-[25px] ">
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[200px]"
                          label={"Min"}
                          register={register}
                          inputName={`interestRateConfigModels.${index}.min`}
                          errors={errors}
                          error={
                            errors?.interestRateConfigModels?.[index]?.min
                              ?.message
                          }
                          setValue={setValue}
                          trigger={trigger}
                          defaultValue={
                            formData?.interestRateConfigModels?.[index]?.min
                          }
                          clearErrors={clearErrors}
                          isPercent
                          isCurrency
                          disablegroupseparators

                          // defaultValue={range.min}
                        />
                      </div>{" "}
                      -
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[200px]"
                          label={"Max"}
                          register={register}
                          inputName={`interestRateConfigModels.${index}.max`}
                          errors={errors}
                          error={
                            errors?.interestRateConfigModels?.[index]?.max
                              ?.message
                          }
                          defaultValue={
                            formData?.interestRateConfigModels?.[index]?.max
                          }
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          isPercent
                          isCurrency
                          disablegroupseparators
                        />
                      </div>{" "}
                    </div>
                    {/* principal starts here  */}
                    {parseInt(watchinterestRateRangeType, 10) === 0 && (
                      <>
                        <span>for principal between:</span>
                        <div className="flex gap-[25px] ">
                          <MinMaxInput
                            label={handleCurrencyName(
                              productData?.productInfo?.currency,
                              currencies
                            )}
                            className="w-[180px]"
                            register={register}
                            inputName={`interestRateConfigModels.${index}.principalMin`}
                            errors={errors}
                            error={
                              errors?.interestRateConfigModels?.[index]
                                ?.principalMin?.message
                            }
                            defaultValue={
                              formData?.interestRateConfigModels?.[index]
                                ?.principalMin
                            }
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            isCurrency
                          />
                        </div>{" "}
                        -
                        <div className="flex gap-[25px] ">
                          <MinMaxInput
                            label={handleCurrencyName(
                              productData?.productInfo?.currency,
                              currencies
                            )}
                            className="w-[180px]"
                            register={register}
                            inputName={`interestRateConfigModels.${index}.principalMax`}
                            errors={errors}
                            error={
                              errors?.interestRateConfigModels?.[index]
                                ?.principalMax?.message
                            }
                            defaultValue={
                              formData?.interestRateConfigModels?.[index]
                                ?.principalMax
                            }
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            isCurrency
                          />
                        </div>{" "}
                      </>
                    )}

                    {/* principal ends here  */}
                    {/* tenor starts here  */}
                    {parseInt(watchinterestRateRangeType, 10) === 1 && (
                      <>
                        <span>for tenor between:</span>
                        <div className="flex gap-[25px]">
                          <MinMaxInput
                            className="w-[90px]"
                            register={register}
                            inputName={`interestRateConfigModels.${index}.tenorMin`}
                            errors={errors}
                            error={
                              errors?.interestRateConfigModels?.[index]
                                ?.tenorMin?.message
                            }
                            defaultValue={
                              formData?.interestRateConfigModels?.[index]
                                ?.tenorMin
                            }
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            type="number"
                          />
                          <div className="w-[90px]">
                            <BorderlessSelect
                              inputError={errors?.tenorMinUnit}
                              register={register}
                              inputName={`interestRateConfigModels.${index}.tenorMinUnit`}
                              errors={errors}
                              error={
                                errors?.interestRateConfigModels?.[index]
                                  ?.tenorMinUnit?.message
                              }
                              defaultValue={
                                formData?.interestRateConfigModels[0]
                                  ?.tenorMinUnit
                              }
                              setValue={setValue}
                              trigger={trigger}
                              clearErrors={clearErrors}
                              options={IntervalOptions}
                            />
                          </div>
                        </div>{" "}
                        -
                        <div className="flex gap-[25px]">
                          <MinMaxInput
                            className="w-[90px]"
                            register={register}
                            inputName={`interestRateConfigModels.${index}.tenorMax`}
                            errors={errors}
                            error={
                              errors?.interestRateConfigModels?.[index]
                                ?.tenorMax?.message
                            }
                            defaultValue={
                              formData?.interestRateConfigModels?.[index]
                                ?.tenorMax
                            }
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            type="number"
                          />
                          <div className="w-[90px]">
                            <BorderlessSelect
                              inputError={errors?.tenorMaxUnit}
                              register={register}
                              inputName={`interestRateConfigModels.${index}.tenorMaxUnit`}
                              errors={errors}
                              error={
                                errors?.interestRateConfigModels?.[index]
                                  ?.tenorMaxUnit?.message
                              }
                              defaultValue={
                                formData?.interestRateConfigModels?.[0]
                                  ?.tenorMaxUnit
                              }
                              setValue={setValue}
                              trigger={trigger}
                              clearErrors={clearErrors}
                              options={IntervalOptions}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* tenor ends here  */}
                  </div>
                  {interestRateConfigModels.length > 1 && (
                    <div className="h-4 w-4" onClick={() => removeField(index)}>
                      <svg
                        width="11"
                        height="10"
                        viewBox="0 0 11 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_49301_99370)">
                          <path
                            d="M0.160156 2.207L2.95316 5L0.160156 7.793L2.36716 10L5.16016 7.207L7.95316 10L10.1602 7.793L7.36716 5L10.1602 2.207L7.95316 0L5.16016 2.793L2.36716 0L0.160156 2.207Z"
                            fill="#CF2A2A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_49301_99370">
                            <rect
                              width="10"
                              height="10"
                              fill="white"
                              transform="translate(0.160156)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end mt-1">
                <button
                  disabled={validateSlab(
                    values,
                    watchinterestRateRangeType,
                    watchApplicablePrincipalMax,
                    watchApplicableTenorMax
                  )}
                  type="button"
                  className="flex items-center gap-4 cursor-pointer text-[##636363] ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={addField}
                >
                  <span className="text-[20px]">
                    {" "}
                    <IoMdAddCircle />
                  </span>{" "}
                  <span>Add slab</span>
                </button>
              </div>
            </div>
          )}
          {parseInt(watchinterestRateRangeType, 10) === 2 && (
            <div className="flex items-center gap-[25px] ">
              <div className="flex gap-[25px]">
                <MinMaxInput
                  className="w-[200px]"
                  label={"Min"}
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
              -
              <div className="flex gap-[25px]">
                <MinMaxInput
                  className="w-[200px]"
                  label={"Max"}
                  register={register}
                  inputName={`interestRateMax`}
                  errors={errors}
                  defaultValue={formData?.interestRateMax}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  max={100}
                  isPercent
                  isCurrency
                  disablegroupseparators
                />
              </div>{" "}
            </div>
          )}
        </InputDivs>
        <div className="flex flex-col gap-[25px] ">
          <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
            Interest Computation Days in Year Method
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
          </span>

          <div className="w-[300px]">
            <BorderlessSelect
              inputError={errors?.interestComputationMethod}
              inputName={"interestComputationMethod"}
              options={interestComputationDaysOptions}
              defaultValue={formData?.interestComputationMethod}
              errors={errors}
              trigger={trigger}
              clearErrors={clearErrors}
              setValue={() => {}}
              disabled
            />
          </div>
        </div>
      </div>
    </form>
  );
}
